"use client"
import LogoImage from "@/app/assets/Logo.png"
import CartButton from "@/components/storefront/cart/cart-button"
import { useCart } from "@/components/storefront/cart/cart-context"
import { IconBrandWhatsapp, IconMenuDeep, IconSearch } from "@tabler/icons-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from "../ui/sheet"

export default function Header() {
  const { settings } = useCart()
  const router = useRouter()
  const [query, setQuery] = useState("")
  const links = [
    { title: "Inicio", link: "/" },
    { title: "Catálogo", link: "/catalogo" },
    { title: "Instalación a domicilio", link: "/" },
    { title: "Zonas de cobertura", link: "/" },
  ]

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const value = query.trim()
    router.push(value ? `/catalogo?q=${encodeURIComponent(value)}` : "/catalogo")
  }

  const whatsappHref = settings.whatsappNumber
    ? `https://wa.me/${settings.whatsappNumber.replace(/\D/g, "")}`
    : "#"

  return (
    <header className="sticky top-0 flex w-full flex-col bg-background/60 px-4 py-3 backdrop-blur-2xl z-50">
      <div className="flex items-center justify-between gap-2">
        <Sheet>
          <SheetTrigger className="duration-200 hover:scale-105">
            <IconMenuDeep className="scale-x-[-1]" />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <Image src={LogoImage} alt="DecoXpert Logo" className="max-w-40" />
            </SheetHeader>
            <div className="mb-5 h-px w-full bg-muted" />
            <div className="flex flex-col items-start gap-2 px-4">
              {links.map((link) => (
                <Link
                  key={link.title}
                  href={link.link}
                  className="w-full justify-start text-lg h-fit font-heading font-bold uppercase text-foreground/70 duration-200 hover:text-foreground hover:[&_div]:w-full"
                >
                  {link.title}
                  <div className="h-0.5 w-0 bg-red-600 duration-200" />
                </Link>
              ))}
            </div>
            <SheetFooter className="px-4">
              <Link
                href="#"
                className="w-full justify-start text-xs h-fit font-heading text-foreground/70 duration-200 hover:text-foreground"
              >
                Politica de privacidad
              </Link>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* LOGO */}
        <Link href="/">
          <Image src={LogoImage} alt="DecoXpert Logo" className="max-w-40" />
        </Link>

        <form
          onSubmit={submitSearch}
          className="mx-10 hidden w-full items-center rounded-xl border border-foreground/20 bg-background px-2 py-1 md:flex"
        >
          <IconSearch size={18} className="text-foreground-primary" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Alarmas, GPS, Pantallas Android, Parlantes..."
            className="w-full px-1 outline-none"
          />
        </form>

        <div className="flex items-center gap-2">
          {/* WhatsApp */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-green-600 bg-green-600 p-1.5"
          >
            <IconBrandWhatsapp size={20} />
          </a>

          {/* BAG */}
          <CartButton />
        </div>
      </div>
    </header>
  )
}
