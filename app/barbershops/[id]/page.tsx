import { db } from "@/app/_lib/prisma"

interface BarbershopPageProps {
  params: Promise<{ id: string }>
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const { id } = await params

  const barbershop = await db.barbershop.findUnique({
    where: {
      id,
    },
  })

  return <h1>{barbershop?.name}</h1>
}

export default BarbershopPage
