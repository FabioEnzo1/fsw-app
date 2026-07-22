"use client"

import { Calendar1Icon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { quickSearchOptions } from "../_constrants/search"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"

const SidebarSheet = () => {
  const { data } = useSession()
  const handleLoginWithGoogleClick = () => signIn("google")
  const handleLogoutClick = () => signOut()
  return (
    <SheetContent className="gap-0">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center justify-between gap-3 border-b border-solid p-4">
        {data?.user ? (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={data?.user?.image ?? ""} />
            </Avatar>

            <div>
              <p className="font-bold">{data.user.name}</p>
              <p className="text-xs">{data.user.email}</p>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-bold">Olá, faça seu login!</h2>
            <Dialog>
              <DialogTrigger
                render={
                  <Button size="icon">
                    <LogInIcon />
                  </Button>
                }
              ></DialogTrigger>
              <DialogContent className="w-[90%]">
                <DialogHeader>
                  <DialogTitle>Faça seu login na plataforma</DialogTitle>
                  <DialogDescription>
                    Conecte-se usando sua conta do Google.
                  </DialogDescription>
                </DialogHeader>

                <Button
                  variant="outline"
                  className="gap-1 font-bold"
                  onClick={handleLoginWithGoogleClick}
                >
                  <Image
                    alt="Login com Google"
                    src="/google.svg"
                    width={18}
                    height={18}
                  />
                  Google
                </Button>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>

      <div className="flex flex-col gap-3 border-b border-solid p-4">
        <SheetClose
          nativeButton={false}
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

      <div className="flex flex-col gap-3 border-b border-solid p-4">
        {quickSearchOptions.map((option) => (
          <SheetClose
            key={option.title}
            nativeButton={false}
            render={
              <Button
                key={option.title}
                className="justify-start gap-2"
                variant="ghost"
                nativeButton={false}
                render={
                  <Link href={`/barbershops?search=${option.title}`}>
                    <Image
                      src={option.imageUrl}
                      height={18}
                      width={18}
                      alt={option.title}
                    />
                    {option.title}
                  </Link>
                }
              ></Button>
            }
          ></SheetClose>
        ))}
      </div>

      <div className="flex flex-col gap-2 p-4">
        <Button
          className="justify-start gap-2"
          variant="ghost"
          onClick={handleLogoutClick}
        >
          <LogOutIcon size={18} />
          Sair da conta
        </Button>
      </div>
    </SheetContent>
  )
}

export default SidebarSheet
