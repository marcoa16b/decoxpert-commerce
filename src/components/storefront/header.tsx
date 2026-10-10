"use client"
import { IconBrandWhatsapp, IconSearch, IconShoppingBag, IconMenuDeep } from "@tabler/icons-react"
import LogoImage from "@/app/assets/Logo.png"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { motion } from "motion/react"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from "../ui/sheet"
import { Button } from "../ui/button"

export default function Header() {
  const links = [
    {
      title: "Inicio",
      link: "/"
    },
    {
      title: "Catálogo",
      link: "/"
    },
    {
      title: "Instalación a domicilio",
      link: "/"
    },
    {
      title: "Zonas de cobertura",
      link: "/"
    },
    // {
    //   title: "Articulos",
    //   link: "/"
    // },
  ]

  return (
    <header className="sticky top-0 flex flex-col w-full py-3 px-4 bg-background/60 backdrop-blur-2xl z-50">
      <div className="flex items-center justify-between gap-2">
        <Sheet>
          <SheetTrigger className="hover:scale-105 duration-200">
            <IconMenuDeep className="scale-x-[-1]" />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <Image
                src={LogoImage}
                alt="DecoXpert Logo"
                className="max-w-40"
              />
            </SheetHeader>
            <div className="w-full h-px bg-muted mb-5" />
            <div className="flex flex-col items-start gap-2 px-4">
              {links.map((l) => (
                <Link key={l.title} href={l.link} className="w-full justify-start text-lg h-fit font-heading font-bold hover:[&_div]:w-full uppercase text-foreground/70 hover:text-foreground duration-200">
                  {l.title}
                  <div className="w-0 h-0.5 bg-red-600 duration-200" />
                </Link>
              ))}
            </div>
            <SheetFooter className="px-4">
              <Link href="#" className="w-full justify-start text-xs h-fit font-heading text-foreground/70 hover:text-foreground duration-200">
                Politica de privacidad
              </Link>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* LOGO */}
        <Image
          src={LogoImage}
          alt="DecoXpert Logo"
          className="max-w-40"
        />

        <div className="hidden w-full md:flex items-center border border-foreground/20 rounded-xl bg-background px-2 py-1 mx-10">
          <IconSearch size={18} className="text-foreground-primary" />
          <input
            placeholder="Alarmas, GPS, Pantallas Android, Parlantes..."
            className="outline-none px-1 w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* WhatsApp */}
          <button className="p-1.5 rounded-full border border-green-600 bg-green-600">
            <IconBrandWhatsapp size={20} />
          </button>

          {/* BAG */}
          <button className="p-1.5 rounded-full border border-foreground/20 ">
            <IconShoppingBag size={20} />
          </button>

        </div>

      </div>
    </header>
  )
}

const NavMobileItem = ({
  children,
  link
}: {
  children: React.ReactNode;
  link: string;
}) => {
  return (
    <motion.div
      className="relative w-full text-end py-3 hover:[&_div]:w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.3 }}}
      exit={{ opacity: 0 }}
    >
      <Link href={link} className="block w-full px-4 pb-0.5 text-xl md:text-sm rounded-md uppercase font-bold">
        {children}
      </Link>
      <div className="w-0 h-1 bg-primary duration-200" />
    </motion.div>
  )
}
