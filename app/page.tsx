export const dynamic = "force-dynamic"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { getServerSession } from "next-auth"
import Image from "next/image"
import BarbershopItem from "./_components/barbershop-item"
import BookingItem from "./_components/booking-item"
import Header from "./_components/header"
import Search from "./_components/search"
import { Button } from "./_components/ui/button"
import { quickSearchOptions } from "./_constrants/search"
import { authOptions } from "./_lib/auth"
import { db } from "./_lib/prisma"

const Home = async () => {
  const user = await getServerSession(authOptions)
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  const confirmedBookings = user?.user
    ? await db.booking.findMany({
        where: {
          userId: user.user.id,
          dateTime: {
            gte: new Date(),
          },
        },
        include: {
          service: {
            include: {
              barbershop: true,
            },
          },
        },
        orderBy: {
          dateTime: "asc",
        },
      })
    : []

  return (
    <div>
      {/* Header */}
      <Header />
      <main className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        <h2 className="text-xl font-bold">
          Olá, {user?.user ? user.user.name : "bem vindo"}!
        </h2>
        <p>{format(new Date(), "EEEE, dd 'de' MMMM", { locale: ptBR })}</p>

        {/* BUSCA */}

        <div className="mt-6">
          <Search />
        </div>

        {/* BUSCA RÁPIDA */}

        <div className="mt-6 flex gap-3 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button className="gap-2" variant="secondary" key={option.title}>
              <Image
                src={option.imageUrl}
                width={16}
                height={16}
                alt={option.title}
              />
              {option.title}
            </Button>
          ))}
        </div>

        <div className="relative mt-6 h-40 w-full sm:h-52 lg:h-64">
          <Image
            alt="Agende nos melhores com FSW BARBER"
            src="/banner01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {confirmedBookings.length > 0 && (
          <>
            <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
              Agendamentos
            </h2>

            {/* AGENDAMENTO */}
            <div className="flex gap-3 overflow-x-auto pb-1 md:grid md:grid-cols-2 md:overflow-visible [&::-webkit-scrollbar]:hidden">
              {confirmedBookings.map((booking) => (
                <div
                  className="w-[min(20rem,calc(100vw-2rem))] shrink-0 md:w-auto"
                  key={booking.id}
                >
                  <BookingItem booking={JSON.parse(JSON.stringify(booking))} />
                </div>
              ))}
            </div>
          </>
        )}

        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-1 md:grid md:grid-cols-3 md:overflow-visible xl:grid-cols-4 [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <div className="w-40 shrink-0 md:w-auto" key={barbershop.id}>
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>

        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          Populares
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-1 md:grid md:grid-cols-3 md:overflow-visible xl:grid-cols-4 [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <div className="w-40 shrink-0 md:w-auto" key={barbershop.id}>
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Home
