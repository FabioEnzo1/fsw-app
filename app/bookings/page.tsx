import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"
import BookingItem from "../_components/booking-item"
import Header from "../_components/header"
import { authOptions } from "../_lib/auth"
import { db } from "../_lib/prisma"

const Bookings = async () => {
  const user = await getServerSession(authOptions)
  if (!user) {
    return notFound()
  }
  const confirmedBookings = await db.booking.findMany({
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
  })

  const concludedBookings = await db.booking.findMany({
    where: {
      userId: user.user.id,
      dateTime: {
        lte: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
  })

  return (
    <>
      <Header></Header>
      <main className="mx-auto w-full max-w-7xl space-y-3 px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        <h1 className="text-xl font-bold">Agendamentos</h1>
        {confirmedBookings.length === 0 && concludedBookings.length === 0 && (
          <p className="text-gray-400">Você não possui agendamentos.</p>
        )}
        {confirmedBookings.length > 0 && (
          <>
            <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
              Confirmados
            </h2>
            <div className="grid gap-3 lg:grid-cols-2">
              {confirmedBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              ))}
            </div>
          </>
        )}
        {concludedBookings.length > 0 && (
          <>
            <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
              Finalizados
            </h2>
            <div className="grid gap-3 lg:grid-cols-2">
              {concludedBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </>
  )
}

export default Bookings
