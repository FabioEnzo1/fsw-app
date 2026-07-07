export const dynamic = "force-dynamic"
import { SearchIcon } from "lucide-react"
import { Button } from "./_components/ui/button"
import Header from "./_components/header"
import { Input } from "./_components/ui/input"
import Image from "next/image"
import { Card, CardContent } from "./_components/ui/card"
import { Badge } from "./_components/ui/badge"
import { Avatar, AvatarImage } from "./_components/ui/avatar"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"

const Home = async () => {
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })
  return (
    <div>
      {/* Header */}
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Enzo!</h2>
        <p>Segunda-Feira, 29 de Junho</p>

        {/* BUSCA */}

        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca..." />
          <Button size="icon">
            <SearchIcon />
          </Button>
        </div>

        {/* BUSCA RÁPIDA */}

        <div className="[&:: -webkit-scrollbar]:hidden mt-6 flex gap-3 overflow-x-scroll">
          <Button className="gap-2" variant="secondary">
            <Image src="/cabelo.svg" width={16} height={16} alt="cabelo" />
            Cabelo
          </Button>

          <Button className="gap-2" variant="secondary">
            <Image src="/barba.svg" width={16} height={16} alt="cabelo" />
            Barba
          </Button>

          <Button className="gap-2" variant="secondary">
            <Image src="/acabamento.svg" width={16} height={16} alt="cabelo" />
            Acabamento
          </Button>

          <Button className="gap-2" variant="secondary">
            <Image src="/sobrancelha.svg" width={16} height={16} alt="cabelo" />
            Sobrancelha
          </Button>

          <Button className="gap-2" variant="secondary">
            <Image src="/hidratação.svg" width={16} height={16} alt="cabelo" />
            Hidratação
          </Button>

          <Button className="gap-2" variant="secondary">
            <Image src="/massagem.svg" width={16} height={16} alt="cabelo" />
            Massagem
          </Button>
        </div>

        <div className="relative mt-6 h-37.5 w-full">
          <Image
            alt="Agende nos melhores com FSW BARBER"
            src="/banner01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {/* AGENDAMENTO */}
        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          Agendamentos
        </h2>
        <Card>
          <CardContent className="flex justify-between pl-0">
            {/* ESQUERDA */}
            <div className="flex flex-col gap-2 py-5 pl-5">
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

        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          Recomendados
        </h2>
        <div className="[&:: -webkit-scrollbar]:hidden flex gap-4 overflow-auto">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          Populares
        </h2>
        <div className="[&:: -webkit-scrollbar]:hidden flex gap-4 overflow-auto">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

      <footer>
        <Card>
          <CardContent className="px-1.5 py-2.5">
            <p className="pl-3.5 text-sm text-gray-400">
              © 2023 Copyright <span className="font-bold">FSW Barber</span>
            </p>
          </CardContent>
        </Card>
      </footer>
    </div>
  )
}

export default Home
