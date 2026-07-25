import { Prisma } from "@/prisma/generated/prisma/client"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"

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
  const isConfirmed = isFuture(booking.dateTime)
  return (
    <>
      <Card className="min-w-[90%]">
        <CardContent className="flex min-h-35 p-0">
          {/* ESQUERDA */}
          <div className="flex flex-1 flex-col justify-center gap-2 px-5 py-4">
            <Badge
              className="w-fit"
              variant={isConfirmed ? "default" : "secondary"}
            >
              {isConfirmed ? "Confirmado" : "Finalizado"}
            </Badge>
            <h3 className="font-semibold">{booking.service.name}</h3>

            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={booking.service.barbershop.imageUrl} />
              </Avatar>

              <p className="text-sm text-gray-400">
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
    </>
  )
}

export default BookingItem
