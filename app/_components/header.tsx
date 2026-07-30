"use client"

import { MenuIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import SidebarSheet from "./sidebar-sheet"
import { Button } from "./ui/button"
import { CardHeader } from "./ui/card"
import { Sheet, SheetTrigger } from "./ui/sheet"

const Header = () => {
  return (
    <header className="border-b">
      <CardHeader className="mx-auto flex w-full max-w-7xl flex-row items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/">
          <Image src="/Logo.png" alt="FSW BARBER" height={18} width={120} />
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <nav className="hidden items-center gap-4 text-sm text-gray-400 md:flex">
            <Link className="hover:text-foreground transition-colors" href="/">
              Início
            </Link>
            <Link
              className="hover:text-foreground transition-colors"
              href="/bookings"
            >
              Agendamentos
            </Link>
          </nav>

          <Sheet>
            <SheetTrigger
              render={
                <Button variant="outline" size="icon" nativeButton={true}>
                  <MenuIcon />
                </Button>
              }
            />
            <SidebarSheet />
          </Sheet>
        </div>
      </CardHeader>
    </header>
  )
}

export default Header
