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

      <Card className="overflow-hidden">
        <CardContent className="flex min-h-35 p-0">
          {/* ESQUERDA */}
          <div className="flex flex-1 flex-col justify-center gap-2 px-5 py-4">
            <Badge className="w-fit">Confirmado</Badge>

            <h3 className="font-semibold">Corte de Cabelo</h3>

            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src="https://utfs.io/f/45331760-899c-4b4b-910e-e00babb6ed81-16q.png"
                  alt="Barbearia FSW"
                />
              </Avatar>

              <p className="text-sm text-gray-400">Barbearia FSW</p>
            </div>
          </div>

          {/* DIREITA */}
          <div className="flex w-21 shrink-0 flex-col items-center justify-center border-l border-zinc-800 px-2 text-center">
            <p className="text-sm">Julho</p>
            <p className="text-2xl leading-none">02</p>
            <p className="text-sm text-gray-300">16:30</p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default BookingItem
