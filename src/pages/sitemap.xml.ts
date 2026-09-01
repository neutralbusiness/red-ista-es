import type { APIRoute } from "astro";
import { NETWORK } from "../lib/network.ts";

export const GET: APIRoute = () => {
  const base = `https://www.${NETWORK.domain}`;
  const urls = [
    { loc: `${base}/`, changefreq: "weekly", priority: "1.0" },
    { loc: `${base}/averias-bmw-por-motor/`, changefreq: "monthly", priority: "0.6" },
    { loc: `${base}/aviso-legal/`, changefreq: "yearly", priority: "0.3" },
    { loc: `${base}/contacto/`, changefreq: "monthly", priority: "0.6" },
    { loc: `${base}/glosario/`, changefreq: "monthly", priority: "0.6" },
    { loc: `${base}/guia-comprar-bmw-segunda-mano/`, changefreq: "monthly", priority: "0.6" },
    { loc: `${base}/politica-de-cookies/`, changefreq: "yearly", priority: "0.3" },
    { loc: `${base}/politica-de-privacidad/`, changefreq: "yearly", priority: "0.3" },
    { loc: `${base}/que-es-ista/`, changefreq: "monthly", priority: "0.6" },
    { loc: `${base}/servicios/`, changefreq: "weekly", priority: "0.9" },
    { loc: `${base}/sobre-nosotros/`, changefreq: "monthly", priority: "0.6" },
    { loc: `${base}/talleres-dasercars/`, changefreq: "weekly", priority: "0.9" },
    { loc: `${base}/talleres/`, changefreq: "weekly", priority: "0.9" },
    { loc: `${base}/talleres/andalucia/`, changefreq: "weekly", priority: "0.8" },
    { loc: `${base}/talleres/aragon/`, changefreq: "weekly", priority: "0.8" },
    { loc: `${base}/talleres/asturias/`, changefreq: "weekly", priority: "0.8" },
    { loc: `${base}/talleres/canarias/`, changefreq: "weekly", priority: "0.8" },
    { loc: `${base}/talleres/cantabria/`, changefreq: "weekly", priority: "0.8" },
    { loc: `${base}/talleres/castilla-la-mancha/`, changefreq: "weekly", priority: "0.8" },
    { loc: `${base}/talleres/castilla-y-leon/`, changefreq: "weekly", priority: "0.8" },
    { loc: `${base}/talleres/cataluna/`, changefreq: "weekly", priority: "0.8" },
    { loc: `${base}/talleres/comunidad-de-madrid/`, changefreq: "weekly", priority: "0.8" },
    { loc: `${base}/talleres/comunidad-valenciana/`, changefreq: "weekly", priority: "0.8" },
    { loc: `${base}/talleres/extremadura/`, changefreq: "weekly", priority: "0.8" },
    { loc: `${base}/talleres/galicia/`, changefreq: "weekly", priority: "0.8" },
    { loc: `${base}/talleres/islas-baleares/`, changefreq: "weekly", priority: "0.8" },
    { loc: `${base}/talleres/la-rioja/`, changefreq: "weekly", priority: "0.8" },
    { loc: `${base}/talleres/navarra/`, changefreq: "weekly", priority: "0.8" },
    { loc: `${base}/talleres/pais-vasco/`, changefreq: "weekly", priority: "0.8" },
    { loc: `${base}/talleres/region-de-murcia/`, changefreq: "weekly", priority: "0.8" },
    { loc: `${base}/unete-a-la-red/`, changefreq: "monthly", priority: "0.6" },
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    u => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join("\n")}
  <url>
    <loc>${base}/llms.txt</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
`;
  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
};
