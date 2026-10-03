/**
 * Cloudflare Pages middleware.
 *
 * El repo construye:
 *   - /        → master directorio (todas las ciudades agrupadas por CCAA)
 *   - /<slug>/ → one-page de la ciudad <slug>
 *
 * El dominio sirve:
 *   - red-ista.es / www.red-ista.es  → master directorio
 *   - <slug>.red-ista.es             → reescribe a /<slug>/ vía env.ASSETS
 *
 * Importante: usamos `env.ASSETS.fetch()` (binding inyectado por CF Pages) en
 * lugar de `fetch()` global. El fetch global mantiene el hostname público y
 * CF detecta loop → 403. ASSETS sirve directamente los archivos estáticos
 * construidos por el build.
 */
/**
 * Ciudades retiradas (03-oct-2026): más de 28 días con 0 impresiones en
 * Google, sin ningún lead y sin socio ni teléfono propio. Su página ya no se
 * construye (se borró su src/content/cities/<slug>.json) y el subdominio
 * entero responde 301 a la www, conservando la ruta solo si existe allí
 * (RETIRED_KEEP_PATHS); si no, a la portada. Reduce la huella de páginas de
 * ciudad casi idénticas (doorway pages).
 * Para reactivar una ciudad hay que quitarla también de esta lista.
 */
const RETIRED_CITIES = new Set([
  "ajalvir",
  "badalona",
  "barakaldo",
  "begues",
  "castellbisbal",
  "castellvi-de-rosanes",
  "corbera-de-llobregat",
  "daganzo-de-arriba",
  "el-goloso",
  "el-papiol",
  "el-prat-de-llobregat",
  "gava",
  "l-hospitalet-de-llobregat",
  "la-palma-de-cervello",
  "madrid",
  "molins-de-rei",
  "olesa-de-bonesvalls",
  "reus",
  "sant-boi-de-llobregat",
  "sant-feliu-de-llobregat",
  "tres-cantos",
  "valdeolmos-alalpardo",
  "vallirana",
  "viladecans",
]);
const RETIRED_KEEP_PATHS = new Set(["/", "/blog/", "/llms.txt", "/robots.txt", "/sitemap.xml"]);

export async function onRequest(context) {
  const { request, next, env } = context;
  const url = new URL(request.url);
  const hostname = (request.headers.get("x-forwarded-host") || url.hostname).toLowerCase();

  // Dominio principal sin subdominio relevante → master directorio
  const isApex = hostname === "red-ista.es";
  const isWww = hostname === "www.red-ista.es";

  if (isApex) {
    // Redirige apex a www para consolidar señales SEO
    const target = new URL(url);
    target.hostname = "www.red-ista.es";
    return Response.redirect(target.toString(), 301);
  }

  if (isWww) {
    return next();
  }

  // Subdominio de ciudad: <slug>.red-ista.es
  if (hostname.endsWith(".red-ista.es")) {
    const subdomain = hostname.replace(/\.red-ista\.es$/, "");
    if (subdomain && !subdomain.includes(".") && subdomain !== "www") {
      // Ciudad retirada → 301 a la www (ver RETIRED_CITIES arriba).
      if (RETIRED_CITIES.has(subdomain)) {
        let p = url.pathname || "/";
        if (!p.endsWith("/") && !/\.\w+$/.test(p)) p += "/";
        const dest = RETIRED_KEEP_PATHS.has(p) ? p : "/";
        return Response.redirect(`https://www.red-ista.es${dest}`, 301);
      }

      // Assets puros (.css/.webp/.js/.svg/etc) → servir tal cual.
      // NO incluimos .txt/.xml aquí porque /llms.txt, /robots.txt, /sitemap.xml
      // deben reescribirse a /<slug>/* para servir contenido específico de ciudad.
      if (/\.(css|js|mjs|map|webp|avif|jpe?g|png|svg|gif|ico|woff2?|ttf|otf|eot|webmanifest|json)$/i.test(url.pathname)) {
        return env.ASSETS.fetch(request);
      }

      // Rewrite interno: /<algo> o / → /<slug>/<resto>
      let rewrittenPath = url.pathname === "/" || url.pathname === ""
        ? `/${subdomain}/`
        : `/${subdomain}${url.pathname}`;

      // Asegurar trailing slash en rutas que no son archivos. Sin esto, ASSETS
      // devuelve un 308 redirect a /<slug>/path/ cuyo Location expone el prefijo
      // interno al navegador → el usuario ve /<slug>/<slug>/path/ en la barra.
      if (!rewrittenPath.endsWith("/") && !/\.\w+$/.test(rewrittenPath)) {
        rewrittenPath += "/";
      }

      const rewritten = new URL(url);
      rewritten.pathname = rewrittenPath;
      return env.ASSETS.fetch(new Request(rewritten.toString(), request));
    }
  }

  // pages.dev directo y otros casos → continuar
  return next();
}
