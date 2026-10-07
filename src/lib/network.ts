/**
 * Configuración estática de la red Red ISTA.
 * Talleres de mecánica general autorizados por BMW y MINI,
 * adheridos y homologados por https://redista.com/
 *
 * Se importa desde layouts y pages.
 * El contenido IA por ciudad vive en src/content/cities/<slug>.json y se
 * carga vía import.meta.glob en [city].astro.
 */
export const NETWORK = {
  slug: "red-ista",
  domain: "red-ista.es",
  brand: "Red ISTA",
  sector: "ista",
  tagline:
    "Talleres autorizados BMW y MINI con equipo de diagnóstico oficial conectado a los servidores centrales de BMW AG en Alemania. Más de 100 centros en toda España.",
  phone: "+34622552992",
  phoneDisplay: "622 552 992",
  whatsapp: "34622552992",
  email: "info@red-ista.es",
  heroImage: "/img/hero.webp", // se sube vía panel /webs/redes/red-ista
} as const;

// Servicios del taller (cards en #servicios). Texto base — el copy de cada
// ciudad puede sobreescribir vía content/cities/<slug>.json.
export const SERVICES = [
  {
    id: "revision",
    title: "Revisiones y mantenimiento BMW/MINI",
    icon: "🛠️",
    summary:
      "Revisiones según plan CBS de BMW: aceite LL-01/LL-04, filtros originales, pastillas, líquido de frenos y 30 puntos de control. Misma calidad que el concesionario oficial, sin su precio.",
  },
  {
    id: "mecanica",
    title: "Mecánica especializada BMW y MINI",
    icon: "⚙️",
    summary:
      "Distribución, embrague bimasa, turbo, suspensión neumática, caja de transferencia y diferencial. Técnicos formados en motores BMW (N47, B47, N20, B48, N55, B58, N57) y MINI (B38, B48).",
  },
  {
    id: "diagnostico",
    title: "Diagnóstico oficial BMW ISTA",
    icon: "💻",
    summary:
      "Equipo de diagnóstico, programación y codificación BMW conectado en tiempo real a los servidores centrales de BMW AG en Alemania. Leemos y resolvemos lo mismo que un concesionario oficial.",
  },
  {
    id: "electronica",
    title: "Electrónica y codificación",
    icon: "🔌",
    summary:
      "Codificación de módulos, actualización de software, programación de llaves, adaptación de funciones ocultas y diagnóstico de centralitas (DME/DDE, EGS, DSC, ICM, NBT/EVO).",
  },
  {
    id: "neumaticos",
    title: "Neumáticos y geometría",
    icon: "🛞",
    summary:
      "Neumáticos RSC run-flat y convencionales, montaje con máquina sin palancas, equilibrado de precisión y alineación 3D según especificaciones BMW.",
  },
  {
    id: "preitv",
    title: "Pre-ITV BMW y MINI",
    icon: "✅",
    summary:
      "Revisión previa completa para pasar la ITV a la primera: emisiones, luces, suspensión, dirección y frenos. Si haces mantenimiento o reparación con nosotros, la pre-ITV es gratuita.",
  },
] as const;

export const FAQ_BASE = [
  {
    q: "¿Pierdo la garantía BMW si llevo mi coche a un taller Red ISTA en lugar del concesionario oficial?",
    a: "No. Según la normativa europea de libre competencia (Reglamento CE 461/2010), cualquier taller autorizado puede realizar el mantenimiento de tu BMW o MINI sin afectar a la garantía del fabricante, siempre que se utilicen recambios de calidad equivalente o superior y se sigan los protocolos del fabricante. En Red ISTA trabajamos con equipo oficial BMW y recambios originales o de calidad OE certificada.",
  },
  {
    q: "¿Qué diferencia hay entre Red ISTA y un concesionario oficial BMW?",
    a: "Somos talleres independientes especializados exclusivamente en BMW y MINI, homologados por redista.com. Usamos el mismo equipo de diagnóstico oficial (ISTA/Rheingold) conectado a los servidores de BMW AG en Alemania. La diferencia principal es el precio: al no tener los costes de una franquicia oficial, nuestras tarifas son significativamente más competitivas manteniendo la misma calidad de servicio.",
  },
  {
    q: "¿Qué modelos de BMW y MINI reparáis?",
    a: "Todos los modelos BMW (Serie 1, 2, 3, 4, 5, 6, 7, 8, X1 a X7, Z4, i3, i4, iX, iX1, iX3) y MINI (Hatch, Clubman, Countryman, Cabrio, MINI Eléctrico). Tanto gasolina como diésel, híbridos y eléctricos. Nuestro equipo ISTA cubre desde los modelos clásicos E46/E90 hasta las últimas plataformas G20/G80/U11.",
  },
  {
    q: "¿Usáis recambios originales BMW?",
    a: "Sí, trabajamos con recambios originales BMW y también con piezas de calidad OE (fabricadas por los mismos proveedores de BMW — Bosch, Mahle, Mann, Sachs, Lemförder — pero sin el embalaje de marca). Te explicamos las opciones y tú decides. El presupuesto siempre es cerrado y por escrito.",
  },
  {
    q: "¿Cuánto se tarda en una revisión BMW?",
    a: "Una revisión estándar CBS (aceite + filtros + inspección 30 puntos) se completa en 2-3 horas. Si se detecta algo adicional, te llamamos antes de hacer nada. Las reparaciones mecánicas más complejas (distribución, turbo, caja de cambios) suelen ser 1-2 días según disponibilidad de pieza.",
  },
  {
    q: "¿Ofrecéis coche de cortesía?",
    a: "Sí, disponemos de vehículos de cortesía cuando la reparación se prolonga más de un día. Sujeto a disponibilidad — consúltanos al pedir cita y lo reservamos para ti.",
  },
] as const;


/**
 * Fijo de LLAMADA que acompaña a un móvil (07-oct-2026). El WhatsApp sigue siendo
 * el móvil: aquí solo se decide qué se marca y qué se muestra al llamar.
 * Clave = móvil en E.164. Vale para el NETWORK y para cualquier tenant de ciudad.
 */
export const PHONE_LANDLINE: Record<string, { phone: string; phoneDisplay: string }> = {
  "+34622552992": { phone: "+34930454510", phoneDisplay: "930 454 510" }, // Barcelona
  "+34665245143": { phone: "+34919583601", phoneDisplay: "919 583 601" }, // Madrid
};

/**
 * El 622 552 992 es el teléfono de Barcelona y no se usa como LLAMADA fuera de
 * Cataluña. En la Comunidad de Madrid se llama al de Madrid. El WhatsApp no se toca.
 */
const CALL_PHONE_BY_CCAA: Record<string, Record<string, string>> = {
  "Comunidad de Madrid": { "+34622552992": "+34665245143" },
};

/** Misma agrupación que `display` ("622 552 992" / "622 55 29 92") con los dígitos de `e164`. */
function sameFormat(display: string, e164: string): string {
  const dd = display.replace(/\D/g, "");
  const nd = e164.replace(/\D/g, "");
  const src = nd.slice(Math.max(0, nd.length - dd.length));
  let i = 0;
  return display.replace(/\d/g, () => src[i++] ?? "");
}

/** Datos de llamada: fijo + móvil si el móvil tiene fijo asociado; si no, el móvil tal cual. */
export function callPhones(phone: string, phoneDisplay: string, ccaa?: string) {
  let mobile = { phone, phoneDisplay };
  const norm = (phone || "").replace(/[^\d+]/g, "");
  const otro = ccaa ? CALL_PHONE_BY_CCAA[ccaa]?.[norm] : undefined;
  if (otro) mobile = { phone: otro, phoneDisplay: sameFormat(phoneDisplay, otro) };
  const fijo = PHONE_LANDLINE[mobile.phone.replace(/[^\d+]/g, "")];
  if (!fijo) {
    return { tel: mobile.phone, display: mobile.phoneDisplay, mobile, landline: null as null | { phone: string; phoneDisplay: string }, telephone: mobile.phone as string | string[] };
  }
  const landline = { phone: fijo.phone, phoneDisplay: sameFormat(mobile.phoneDisplay, fijo.phone) };
  return {
    tel: fijo.phone,
    display: `${landline.phoneDisplay} - ${mobile.phoneDisplay}`,
    mobile,
    landline,
    telephone: [fijo.phone, mobile.phone] as string | string[],
  };
}
