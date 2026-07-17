import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"

// TODO: receber agendamento como prop
const BookingItem = () => {
  return (
    <>
      <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
        Agendamentos
      </h2>
      <Card>
        <CardContent className="flex justify-between pl-0">
          {/* ESQUERDA */}
          <div className="flex flex-col gap-2 pt-5 pb-3 pl-5">
            <Badge className="w-fit">Confirmado</Badge>
            <h3 className="font-semibold">Corte de Cabelo</h3>

            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="https://utfs.io/f/45331760-899c-4b4b-910e-e00babb6ed81-16q.png" />
              </Avatar>
              <p className="text-sm">Barbearia FSW</p>
            </div>
          </div>

          {/* DIREITA */}
          <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5 pr-1">
            <p className="text-sm">Julho</p>
            <p className="text-2xl">02</p>
            <p className="text-sm">16:30</p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default BookingItem
