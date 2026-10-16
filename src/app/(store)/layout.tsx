import "@/app/globals.css";
import Footer from "@/components/storefront/footer";
import Header from "@/components/storefront/header";
import { CartProvider } from "@/components/storefront/cart/cart-context";
import { getSettings } from "@/lib/catalog";
import { Montserrat, Roboto, Caveat } from "next/font/google";
import type { Metadata } from "next";
import { IconBolt, IconRosetteDiscountCheck } from "@tabler/icons-react";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const revalidate = 60;

export const metadata: Metadata = {
  title: "DecoXpert - Autodecoración Costa Rica",
  description:
    "Equipamiento y autodecoración a domicilio: alarmas, GPS, pantallas Android, car audio e instalación profesional en Costa Rica.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSettings();

  return (
    <html
      lang="es"
      className={`${montserrat.variable} ${roboto.variable} ${caveat.variable} h-full antialiased dark`}
    >
      <body className="flex min-h-full flex-col">
        <CartProvider
          settings={{
            whatsappNumber: settings?.whatsappNumber ?? "",
            whatsappDefaultMessage: settings?.whatsappDefaultMessage ?? null,
            cartHeaderMessage: settings?.cartHeaderMessage ?? null,
            cartFooterMessage: settings?.cartFooterMessage ?? null,
          }}
        >
          {/* BANNER */}
          <div className="hidden flex-wrap items-center justify-center gap-3 px-4 py-1 text-[10px] font-extrabold font-heading uppercase text-nowrap md:flex md:flex-nowrap">
            <div className="flex items-center gap-2 md:w-full">
              <span className="relative h-2 w-2 animate-pulse rounded-full bg-green-400" />
              <p className="text-foreground-primary">
                ¡Instalación en la puerta de tu casa o envío a todo el país!
              </p>
            </div>
            <div className="flex items-center gap-2">
              <IconRosetteDiscountCheck size={16} className="text-green-500" />
              <p className="text-foreground-primary">Técnicos certificados</p>
            </div>
            <div className="flex items-center gap-2">
              <IconBolt size={16} className="text-red-500" />
              <p className="text-foreground-primary">Atención express</p>
            </div>
          </div>

          {/* HEADER */}
          <Header />

          {/* MAIN */}
          <main className="">{children}</main>

          {/* FOOTER */}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
