import type { Page } from "@payload-types";
import { getPayload } from "payload";
import config from "../payload.config";

type LexicalNode = { type: string; version: number } & { [key: string]: unknown };

function textNode(value: string): LexicalNode {
  return {
    type: "text",
    detail: 0,
    format: 0,
    mode: "normal",
    style: "",
    text: value,
    version: 1,
  };
}

function paragraph(value: string): LexicalNode {
  return {
    type: "paragraph",
    format: "",
    indent: 0,
    version: 1,
    direction: "ltr",
    textFormat: 0,
    children: [textNode(value)],
  };
}

function heading(value: string, tag: "h2" | "h3" = "h2"): LexicalNode {
  return {
    type: "heading",
    tag,
    format: "",
    indent: 0,
    version: 1,
    direction: "ltr",
    children: [textNode(value)],
  };
}

function bulletList(items: string[]): LexicalNode {
  return {
    type: "list",
    listType: "bullet",
    tag: "ul",
    start: 1,
    format: "",
    indent: 0,
    version: 1,
    direction: "ltr",
    children: items.map((item, index) => ({
      type: "listitem",
      value: index + 1,
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr",
      children: [textNode(item)],
    })),
  };
}

function content(children: LexicalNode[]): Page["content"] {
  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr",
      children,
    },
  };
}

const note =
  "Borrador — revisar y completar este contenido antes de publicar la página.";

type SeedPage = {
  title: string;
  slug: string;
  excerpt: string;
  body: LexicalNode[];
};

const pages: SeedPage[] = [
  {
    title: "Política de Privacidad",
    slug: "politica-de-privacidad",
    excerpt:
      "Cómo DecoXpert recopila, usa y protege los datos personales de sus clientes.",
    body: [
      paragraph(note),
      heading("1. Información que recopilamos"),
      paragraph(
        "Completá con los datos que recolectás: nombre, número de WhatsApp, correo, dirección de instalación y datos del vehículo. Indicá también si usás cookies o herramientas de analítica.",
      ),
      heading("2. Uso de la información"),
      bulletList([
        "Gestionar pedidos y coordinar las instalaciones a domicilio.",
        "Enviar cotizaciones y responder consultas.",
        "Cumplir obligaciones legales y de garantía.",
      ]),
      heading("3. Compartir con terceros"),
      paragraph(
        "Detallá si compartís datos con terceros (por ejemplo, transportistas) y con qué finalidad.",
      ),
      heading("4. Seguridad y conservación"),
      paragraph(
        "Explicá cómo protegés los datos y por cuánto tiempo los conservás.",
      ),
      heading("5. Tus derechos"),
      paragraph(
        "Indicá cómo el cliente puede solicitar acceso, corrección o eliminación de sus datos.",
      ),
      heading("6. Contacto"),
      paragraph(
        "Escribinos por WhatsApp para cualquier consulta sobre el tratamiento de tus datos.",
      ),
    ],
  },
  {
    title: "Políticas de Instalación",
    slug: "politicas-de-instalacion",
    excerpt:
      "Alcance, requisitos, tiempos y garantía del servicio de instalación a domicilio.",
    body: [
      paragraph(note),
      heading("1. Alcance del servicio"),
      paragraph(
        "La instalación a domicilio está incluida dentro del Gran Área Metropolitana (GAM). Fuera del GAM se aplica un recargo por desplazamiento que se cotiza antes de agendar.",
      ),
      heading("2. Requisitos"),
      bulletList([
        "Vehículo en condiciones para realizar la instalación.",
        "Espacio de trabajo accesible en el domicilio u oficina.",
        "Confirmación de dirección y franja horaria acordada.",
      ]),
      heading("3. Tiempos de instalación"),
      paragraph(
        "Los tiempos varían según el equipo: alarmas y GPS entre 45 y 90 minutos; pantallas multimedia entre 1 y 2 horas. El tiempo estimado se confirma al agendar.",
      ),
      heading("4. Garantía de la instalación"),
      paragraph(
        "Toda instalación incluye garantía escrita sobre la mano de obra y el equipo. El plazo y la cobertura dependen del proveedor del producto y del tipo de instalación.",
      ),
      heading("5. Cancelaciones y reprogramaciones"),
      paragraph(
        "Detallá la política de cancelación y cómo reprogramar una visita.",
      ),
    ],
  },
  {
    title: "Términos y Condiciones",
    slug: "terminos-y-condiciones",
    excerpt:
      "Condiciones generales de compra, pago, envío e instalación de los productos de DecoXpert.",
    body: [
      paragraph(note),
      heading("1. Aceptación de los términos"),
      paragraph(
        "Al realizar un pedido, el cliente acepta los términos y condiciones aquí descritos.",
      ),
      heading("2. Productos y precios"),
      paragraph(
        "Los precios se expresan en colones (CRC) e incluyen impuestos. Nos reservamos el derecho de actualizarlos.",
      ),
      heading("3. Pedidos y pagos"),
      paragraph(
        "Detallá los métodos de pago aceptados (SINPE Móvil, efectivo) y las condiciones para pagar al finalizar la instalación.",
      ),
      heading("4. Envíos e instalación"),
      paragraph(
        "Indicá los tiempos de envío a nivel nacional y las condiciones del servicio de instalación a domicilio.",
      ),
      heading("5. Garantía"),
      paragraph(
        "Hacé referencia a los Términos de Garantía para el detalle de cobertura.",
      ),
      heading("6. Responsabilidad"),
      paragraph("Definí el alcance de la responsabilidad de la empresa."),
      heading("7. Legislación aplicable"),
      paragraph(
        "Indicá la legislación de Costa Rica aplicable y la vía para resolver controversias.",
      ),
    ],
  },
  {
    title: "Términos de Garantía",
    slug: "terminos-de-garantia",
    excerpt:
      "Qué cubre la garantía escrita, qué no cubre y cómo hacerla válida.",
    body: [
      paragraph(note),
      heading("1. Cobertura de la garantía"),
      paragraph(
        "Nuestros productos e instalaciones cuentan con garantía escrita que cubre el equipo y la mano de obra. El plazo y la cobertura dependen del proveedor del producto y del tipo de instalación.",
      ),
      heading("2. Qué no cubre"),
      bulletList([
        "Daños por mal uso, golpes o instalación por terceros.",
        "Modificaciones o reparaciones realizadas fuera de DecoXpert.",
        "Desgaste normal de piezas consumibles.",
      ]),
      heading("3. Cómo hacer válida la garantía"),
      paragraph(
        "Contactanos por WhatsApp con el comprobante de compra y una descripción del problema. Coordinamos la revisión.",
      ),
      heading("4. Vigencia"),
      paragraph(
        "La garantía rige a partir de la fecha de entrega o instalación, según corresponda.",
      ),
    ],
  },
];

const payload = await getPayload({ config });

let created = 0;

for (const page of pages) {
  const existing = await payload.find({
    collection: "pages",
    where: { slug: { equals: page.slug } },
    limit: 1,
    draft: true,
    overrideAccess: true,
  });

  if (existing.totalDocs > 0) {
    console.log(`· ya existe, se omite: ${page.slug}`);
    continue;
  }

  await payload.create({
    collection: "pages",
    draft: true,
    overrideAccess: true,
    data: {
      title: page.title,
      slug: page.slug,
      excerpt: page.excerpt,
      content: content(page.body),
      _status: "draft",
    },
  });

  created += 1;
  console.log(`✓ borrador creado: ${page.slug}`);
}

console.log(`\nListo. ${created} página(s) creada(s) como borrador.`);

await payload.destroy();
process.exit(0);
