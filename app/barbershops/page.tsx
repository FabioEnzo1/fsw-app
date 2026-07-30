import BarbershopItem from "../_components/barbershop-item"
import Header from "../_components/header"
import Search from "../_components/search"
import { db } from "../_lib/prisma"

interface BarbershopsPagesProps {
  searchParams: Promise<{
    search?: string
  }>
}

const BarbershopsPages = async ({ searchParams }: BarbershopsPagesProps) => {
  const { search } = await searchParams

  const barbershops = await db.barbershop.findMany({
    where: {
      OR: [
        {
          name: {
            contains: (await searchParams)?.search,
            mode: "insensitive",
          },
        },
        {
          services: {
            some: {
              name: {
                contains: (await searchParams)?.search,
                mode: "insensitive",
              },
            },
          },
        },
      ],
    },
  })

  return (
    <div>
      <Header />
      <div className="mt-6 px-5">
        <Search />
      </div>
      <div className="px-5">
        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          Resultados para &quot;{search}&quot;
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <BarbershopItem barbershop={barbershop} key={barbershop.id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BarbershopsPages
