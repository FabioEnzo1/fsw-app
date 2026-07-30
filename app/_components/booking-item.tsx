"use client"

import { Prisma } from "@/prisma/generated/prisma/client"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"
import { deleteBooking } from "../_actions/delete-booking"
import BookingSummary from "./booking-summary"
import PhoneItem from "./phone-item"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

// TODO: receber agendamento como prop
const BookingItem = ({ booking }: BookingItemProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const {
    service: { barbershop },
  } = booking
  const isConfirmed = isFuture(booking.dateTime)
  const handleCancelBooking = async () => {
    try {
      await deleteBooking(booking.id)
      setIsSheetOpen(false)
      toast.success("Reserva cancelada com sucesso")
    } catch (error) {
      console.error(error)
      toast.error("Erro ao cancelar reserva. Tente novamente.")
    }
  }

  const handleSheetOpenChange = (isOpen: boolean) => {
    setIsSheetOpen(isOpen)
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger className="w-full min-w-0 text-left">
        <Card className="w-full min-w-0">
          <CardContent className="flex min-h-35 p-0">
            {/* ESQUERDA */}
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 px-4 py-4 sm:px-5">
              <Badge
                className="w-fit"
                variant={isConfirmed ? "default" : "secondary"}
              >
                {isConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>
              <h3 className="font-semibold break-words">
                {booking.service.name}
              </h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={booking.service.barbershop.imageUrl} />
                </Avatar>

                <p className="truncate text-sm text-gray-400">
                  {booking.service.barbershop.name}
                </p>
              </div>
            </div>

            {/* DIREITA */}
            <div className="flex w-21 shrink-0 flex-col items-center justify-center border-l border-zinc-800 px-2 text-center">
              <p className="text-sm capitalize">
                {format(booking.dateTime, "MMMM", { locale: ptBR })}
              </p>
              <p className="text-2xl leading-none">
                {format(booking.dateTime, "dd", { locale: ptBR })}
              </p>
              <p className="text-sm text-gray-300">
                {format(booking.dateTime, "HH:mm", { locale: ptBR })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="w-[min(90vw,32rem)] px-4 sm:px-5">
        <SheetHeader>
          <SheetTitle className="text-left">Informações da Reserva</SheetTitle>
        </SheetHeader>

        <div className="relative flex h-45 w-full items-end">
          <Image
            src="/map.png"
            alt={`Mapa da barbearia ${booking.service.barbershop.name}`}
            fill
            className="rounded-xl object-cover"
          />

          <Card className="z-50 mx-5 mb-3 w-full rounded-xl">
            <CardContent className="flex items-center gap-3 px-5 py-3">
              <Avatar>
                <AvatarImage src={barbershop.imageUrl} />
              </Avatar>

              <div className="min-w-0">
                <h3 className="font-bold">{barbershop.name}</h3>
                <p className="text-xs break-words">{barbershop.address}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Badge
            className="w-fit"
            variant={isConfirmed ? "default" : "secondary"}
          >
            {isConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>

          <div className="mt-3">
            <BookingSummary
              barbershop={barbershop}
              service={booking.service}
              selectedDate={booking.dateTime}
            />
          </div>

          <div className="mt-3 space-y-3">
            {barbershop.phones.map((phone, index) => (
              <PhoneItem key={index} phone={phone} />
            ))}
          </div>
        </div>
        <SheetFooter className="mt-5 flex w-full flex-row flex-wrap gap-3 p-0">
          <SheetClose
            render={
              <Button variant="outline" className="flex-1">
                Voltar
              </Button>
            }
          ></SheetClose>
          {isConfirmed && (
            <Dialog>
              <DialogTrigger
                render={
                  <Button variant="destructive" className="flex-1">
                    Cancelar Reserva
                  </Button>
                }
              ></DialogTrigger>
              <DialogContent className="w-full">
                <DialogHeader>
                  <DialogTitle className="text-center">
                    Quer cancelar sua reserva ?
                  </DialogTitle>
                  <DialogDescription className="text-center">
                    Deseja realmente cancelar sua reserva? Essa ação é
                    irreversível.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-row gap-3">
                  <DialogClose
                    render={
                      <Button variant="secondary" className="flex-1">
                        Voltar
                      </Button>
                    }
                  ></DialogClose>
                  <DialogClose
                    render={
                      <Button
                        variant="destructive"
                        className="flex-1"
                        onClick={handleCancelBooking}
                      >
                        Confirmar
                      </Button>
                    }
                  ></DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default BookingItem
