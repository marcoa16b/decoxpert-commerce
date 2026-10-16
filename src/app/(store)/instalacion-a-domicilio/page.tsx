import Breadcrumbs from "@/components/storefront/breadcrumbs";
import Cta from "@/components/storefront/cta";
import Faq from "@/components/storefront/faq";
import HowItWorks from "@/components/storefront/how-it-works";
import CoverageCallout from "@/components/storefront/installation/coverage-callout";
import InstallationHero from "@/components/storefront/installation/installation-hero";
import InstallationIncludes from "@/components/storefront/installation/installation-includes";
import InstallationModalities from "@/components/storefront/installation/installation-modalities";
import { getSettings } from "@/lib/catalog";
import { buildWhatsappHref } from "@/lib/whatsapp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instalación a domicilio | DecoXpert",
  description:
    "Instalamos alarmas, GPS, pantallas Android y car audio en la puerta de tu casa u oficina. Técnicos certificados, cableado aislado y garantía escrita de 12 meses.",
};

export default async function InstallationPage() {
  const settings = await getSettings();
  const whatsappHref = buildWhatsappHref(
    settings?.whatsappNumber,
    "Hola, quiero agendar una instalación a domicilio.",
  );

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Inicio", href: "/" },
            { label: "Instalación a domicilio" },
          ]}
        />
      </div>

      <InstallationHero whatsappHref={whatsappHref} />
      <InstallationIncludes />
      <HowItWorks />
      <InstallationModalities />
      <CoverageCallout />
      <Faq />
      <Cta />
    </>
  );
}
