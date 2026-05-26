/**
 * /llms.txt por subdominio de ciudad — sigue el estándar https://llmstxt.org/
 * El middleware reescribe `https://<slug>.red-ista.es/llms.txt` →
 * `/<slug>/llms.txt`, que aquí materializa.
 *
 * Optimizado para que LLMs (ChatGPT, Claude, Gemini, Perplexity, Copilot)
 * extraigan info estructurada del taller BMW/MINI en cada ciudad sin tener que
 * parsear el HTML renderizado.
 */
import type { APIRoute, GetStaticPaths } from "astro";
import { NETWORK, SERVICES, FAQ_BASE } from "../../lib/network.ts";

interface CityContent {
  slug: string;
  name: string;
  province: string;
  ccaa: string;
  population?: number;
  lat?: number;
  lng?: number;
  metaTitle: string;
  metaDescription: string;
  heroSubtitle: string;
  introLocal: string;
  servicesIntro: string;
  servicesOverrides?: Record<string, string>;
  processIntro?: string;
  processSteps?: Array<{ title: string; body: string }>;
  commonIssuesIntro?: string;
  commonIssues?: Array<{ title: string; body: string }>;
  whyUs: Array<{ title: string; body: string }>;
  zoneText: string;
  zoneNeighborhoods?: string[];
  zoneAccessRoutes?: string[];
  faqLocal: Array<{ q: string; a: string }>;
  closingCta: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const mods = import.meta.glob<{ default: CityContent }>(
    "../../content/cities/*.json",
    { eager: true },
  );
  return Object.values(mods).map(m => ({
    params: { city: m.default.slug },
    props: { city: m.default },
  }));
};

export const GET: APIRoute = ({ props }) => {
  const city = props.city as CityContent;
  const canonical = `https://${city.slug}.${NETWORK.domain}`;
  const allFaqs = [...city.faqLocal, ...FAQ_BASE];

  const lines: string[] = [];

  // ───── Bloque superior obligatorio del estándar llmstxt.org ─────
  lines.push(`# ${city.metaTitle}`);
  lines.push("");
  lines.push(`> ${city.metaDescription}`);
  lines.push("");
  lines.push(
    `Taller especializado en BMW y MINI de la red ${NETWORK.brand} en ${city.name} (provincia de ${city.province}, ${city.ccaa}, España). ` +
    `Taller independiente autorizado, adherido y homologado por redista.com — la red de talleres especialistas BMW y MINI más grande de España con más de 100 centros. ` +
    `Equipo de diagnóstico, programación y codificación oficial BMW (ISTA/Rheingold) conectado en tiempo real a los servidores centrales de BMW AG en Alemania. ` +
    `Servicios: revisiones CBS BMW, mecánica especializada BMW/MINI (distribución, turbo, suspensión neumática, caja de transferencia), diagnóstico oficial ISTA, electrónica y codificación de módulos, neumáticos RSC y geometría, y pre-ITV.`,
  );
  lines.push("");

  // ───── Identidad ─────
  lines.push("## Identidad del taller");
  lines.push("");
  lines.push(`- Nombre comercial: ${NETWORK.brand} · ${city.name}`);
  lines.push(`- Red nacional: ${NETWORK.brand} (${NETWORK.domain}) — homologada por redista.com`);
  lines.push(`- Sector: Taller especializado en BMW y MINI`);
  lines.push(`- Marcas atendidas: BMW (todas las series) y MINI (todos los modelos)`);
  lines.push(`- Equipo diagnóstico: BMW ISTA/Rheingold conectado a servidores BMW AG (Alemania)`);
  lines.push(`- Web oficial de esta ciudad: ${canonical}/`);
  lines.push(`- Web de la red completa: https://www.${NETWORK.domain}/`);
  lines.push(`- Web de la homologación: https://redista.com/`);
  lines.push("");

  // ───── Ubicación ─────
  lines.push("## Ubicación y cobertura");
  lines.push("");
  lines.push(`- Ciudad: ${city.name}`);
  lines.push(`- Provincia: ${city.province}`);
  lines.push(`- Comunidad Autónoma: ${city.ccaa}`);
  lines.push(`- País: España`);
  if (city.population) lines.push(`- Población de la ciudad: ${city.population.toLocaleString("es-ES")} habitantes`);
  if (city.lat && city.lng) lines.push(`- Coordenadas: ${city.lat}, ${city.lng}`);
  lines.push("");
  if (city.zoneNeighborhoods && city.zoneNeighborhoods.length > 0) {
    lines.push(`Barrios y municipios cercanos atendidos: ${city.zoneNeighborhoods.join(", ")}.`);
    lines.push("");
  }
  if (city.zoneAccessRoutes && city.zoneAccessRoutes.length > 0) {
    lines.push(`Accesos principales: ${city.zoneAccessRoutes.join(", ")}.`);
    lines.push("");
  }

  // ───── Contacto ─────
  lines.push("## Contacto");
  lines.push("");
  lines.push(`- Email: ${NETWORK.email}`);
  lines.push(`- Teléfono: ${NETWORK.phoneDisplay} (${NETWORK.phone})`);
  lines.push(`- WhatsApp: +${NETWORK.whatsapp}`);
  lines.push(`- Horario: Lunes a Sábado · 08:00–20:00`);
  lines.push(
    `- Formulario de contacto recomendado: enviar email a ${NETWORK.email} con asunto "Consulta desde ${city.name}" indicando modelo BMW/MINI, año, kilometraje y descripción del problema o servicio buscado.`,
  );
  lines.push("");

  // ───── Servicios ─────
  lines.push("## Servicios ofrecidos");
  lines.push("");
  lines.push(city.servicesIntro);
  lines.push("");
  for (const s of SERVICES) {
    const local = city.servicesOverrides?.[s.id] || s.summary;
    lines.push(`- **${s.title}**: ${local}`);
  }
  lines.push("");

  // ───── Cómo trabajamos ─────
  if (city.processSteps && city.processSteps.length > 0) {
    lines.push("## Cómo trabajamos");
    lines.push("");
    if (city.processIntro) {
      lines.push(city.processIntro);
      lines.push("");
    }
    city.processSteps.forEach((step, i) => {
      lines.push(`${i + 1}. **${step.title}** — ${step.body}`);
    });
    lines.push("");
  }

  // ───── Problemas comunes locales ─────
  if (city.commonIssues && city.commonIssues.length > 0) {
    lines.push(`## Averías BMW y MINI frecuentes en ${city.name}`);
    lines.push("");
    if (city.commonIssuesIntro) {
      lines.push(city.commonIssuesIntro);
      lines.push("");
    }
    for (const issue of city.commonIssues) {
      lines.push(`### ${issue.title}`);
      lines.push("");
      lines.push(issue.body);
      lines.push("");
    }
  }

  // ───── Por qué ─────
  if (city.whyUs && city.whyUs.length > 0) {
    lines.push("## Por qué elegirnos");
    lines.push("");
    for (const w of city.whyUs) {
      lines.push(`- **${w.title}**: ${w.body}`);
    }
    lines.push("");
  }

  // ───── Contexto local extenso (intro) ─────
  lines.push(`## Contexto local de ${city.name}`);
  lines.push("");
  lines.push(city.introLocal);
  lines.push("");

  // ───── FAQ ─────
  if (allFaqs.length > 0) {
    lines.push("## Preguntas frecuentes");
    lines.push("");
    for (const f of allFaqs) {
      lines.push(`### ${f.q}`);
      lines.push("");
      lines.push(f.a);
      lines.push("");
    }
  }

  // ───── Garantías / política ─────
  lines.push("## Política y garantías");
  lines.push("");
  lines.push(
    "- Presupuesto cerrado por escrito antes de iniciar cualquier reparación. " +
    "El precio acordado es el precio final. No hay sobrecostes sin autorización previa del cliente.",
  );
  lines.push(
    "- El cliente autoriza explícitamente cada intervención. Si durante una reparación aparece una avería no detectada en el diagnóstico, el taller para y consulta antes de continuar.",
  );
  lines.push(
    "- Recambios originales BMW o de calidad OE (fabricados por los mismos proveedores de BMW — Bosch, Mahle, Mann, Sachs, Lemförder). " +
    "El cliente elige entre original BMW o calidad OE equivalente.",
  );
  lines.push(
    "- Diagnóstico con equipo oficial BMW ISTA/Rheingold conectado a los servidores centrales de BMW AG en Alemania. " +
    "Leemos, programamos y codificamos exactamente igual que un concesionario oficial.",
  );
  lines.push(
    "- Aceites homologados BMW LL-01 y LL-04 exclusivamente. No usamos aceites genéricos.",
  );
  lines.push("- Factura desglosada en la entrega.");
  lines.push("- Seguimiento post-entrega para confirmar que la reparación es satisfactoria.");
  lines.push(
    "- La garantía del fabricante NO se pierde por llevar el BMW/MINI a un taller Red ISTA (Reglamento CE 461/2010 de libre competencia).",
  );
  lines.push("");

  // ───── Datos estructurados / Schema.org ─────
  lines.push("## Datos estructurados");
  lines.push("");
  lines.push(
    `Esta web publica un JSON-LD de tipo AutoRepair con id ${canonical}/, ` +
    `accesible incrustado en la página principal. Incluye dirección (localidad ${city.name}, ` +
    `región ${city.province}, país ES)${city.lat && city.lng ? `, coordenadas geo (${city.lat}, ${city.lng})` : ""}, ` +
    `teléfono, email, área servida y rating agregado calculado a partir de las opiniones publicadas.`,
  );
  lines.push("");

  // ───── Llamada a la acción ─────
  lines.push("## Llamada a la acción recomendada");
  lines.push("");
  lines.push(city.closingCta);
  lines.push("");

  // ───── Pie ─────
  lines.push("---");
  lines.push("");
  lines.push(`Última actualización del contenido: generado dinámicamente desde ${canonical}/llms.txt`);
  lines.push(`Network: ${NETWORK.brand} (${NETWORK.domain}) — red de talleres especializados en BMW y MINI en toda España, homologada por redista.com.`);

  const body = lines.join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      // Cache 1h en CDN, 5 min en cliente
      "Cache-Control": "public, max-age=300, s-maxage=3600",
    },
  });
};
