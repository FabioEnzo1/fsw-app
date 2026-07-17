import { Calendar1Icon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { quickSearchOptions } from "../_constrants/search"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { CardHeader } from "./ui/card"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"

const Header = () => {
  return (
    <div>
      <CardHeader className="flex flex-row items-center justify-between p-5">
        <Image src="/Logo.png" alt="FSW BARBER" height={18} width={120} />

        <Sheet>
          <SheetTrigger
            render={
              <Button variant="outline" size="icon">
                <MenuIcon />
              </Button>
            }
          />
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            <div className="flex items-center gap-3 border-b border-solid p-4">
              <Avatar>
                <AvatarImage src="https://images.unsplash.com/photo-1728577740843-5f29c7586afe?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              </Avatar>

              <div>
                <p className="font-bold">Fábio Enzo</p>
                <p className="text-xs">fabio@email.io</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 border-b border-solid p-4">
              <SheetClose
                render={
                  <Button
                    className="justify-start gap-2"
                    variant="ghost"
                    nativeButton={false}
                    render={
                      <Link href="/">
                        <HomeIcon size={18} />
                        Início
                      </Link>
                    }
                  ></Button>
                }
              />
              <Button className="justify-start gap-2" variant="ghost">
                <Calendar1Icon size={18} />
                Agendamentos
              </Button>
            </div>

            <div className="flex flex-col gap-2 border-b border-solid p-4">
              {quickSearchOptions.map((option) => (
                <Button
                  key={option.title}
                  className="justify-start gap-2"
                  variant="ghost"
                >
                  <Image
                    src={option.imageUrl}
                    height={18}
                    width={18}
                    alt={option.title}
                  />
                  {option.title}
                </Button>
              ))}
            </div>

            <div className="flex flex-col gap-2 p-4">
              <Button className="justify-start gap-2" variant="ghost">
                <LogOutIcon size={18} />
                Sair da conta
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </CardHeader>
    </div>
  )
}

export default Header
