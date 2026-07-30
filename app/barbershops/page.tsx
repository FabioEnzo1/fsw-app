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
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div>
          <Search />
        </div>
        <div>
          <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
            Resultados para &quot;{search}&quot;
          </h2>
          <div className="grid grid-cols-1 gap-4 min-[440px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {barbershops.map((barbershop) => (
              <BarbershopItem barbershop={barbershop} key={barbershop.id} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default BarbershopsPages
