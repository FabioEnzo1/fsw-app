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
    <div>
      <CardHeader className="flex flex-row items-center justify-between p-5">
        <Link href="/">
          <Image src="/Logo.png" alt="FSW BARBER" height={18} width={120} />
        </Link>

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
      </CardHeader>
    </div>
  )
}

export default Header
