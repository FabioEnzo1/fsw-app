import PhoneItem from "@/app/_components/phone-item"
import ServiceItem from "@/app/_components/service-item"
import SidebarSheet from "@/app/_components/sidebar-sheet"
import { Button, buttonVariants } from "@/app/_components/ui/button"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import { db } from "@/app/_lib/prisma"
import { cn } from "@/app/_lib/utils"
import { ChevronLeftIcon, MapIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BarbershopPageProps {
  params: Promise<{ id: string }>
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const { id } = await params

  const barbershop = await db.barbershop.findUnique({
    where: {
      id,
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    return notFound()
  }

  return (
    <div>
      {/* IMAGEM */}
      <div className="relative h-72 w-full sm:h-96 lg:mx-auto lg:mt-8 lg:max-w-7xl lg:overflow-hidden lg:rounded-2xl">
        <Image
          src={barbershop?.imageUrl}
          fill
          className="object-cover"
          alt={barbershop?.name}
        />

        <Link
          href="/"
          aria-label="Voltar"
          className={cn(
            buttonVariants({ variant: "secondary", size: "icon" }),
            "absolute top-4 left-4",
          )}
        >
          <ChevronLeftIcon />
        </Link>

        <Sheet>
          <SheetTrigger
            render={
              <Button
                className="absolute top-4 right-4"
                variant="secondary"
                size="icon"
                nativeButton={true}
              >
                <MenuIcon />
              </Button>
            }
          ></SheetTrigger>
          <SidebarSheet />
        </Sheet>
      </div>

      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="border-b border-solid py-5 sm:py-8">
          <h1 className="mb-3 text-xl font-bold">{barbershop.name}</h1>
          <div className="mb-2 flex items-center gap-1">
            <MapIcon className="text-primary shrink-0" size={18} />
            <p className="text-sm">{barbershop.address}</p>
          </div>

          <div className="flex items-center gap-1">
            <StarIcon className="fill-primary text-primary" size={18} />
            <p className="text-sm">5,0 (299 Avaliações)</p>
          </div>
        </section>

        <div className="lg:grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-10">
          {/* DESCRIÇÃO */}
          <section className="space-y-3 border-b border-solid py-5 sm:py-8 lg:border-b-0">
            <h2 className="text-xs font-bold text-gray-400 uppercase">
              Sobre nós
            </h2>
            <p className="text-left text-sm sm:text-justify">
              {barbershop.description}
            </p>
          </section>
          {/* SERVIÇOS */}
          <section className="space-y-3 border-b border-solid py-5 sm:py-8">
            <h2 className="mb-3 text-xs font-bold text-gray-400 uppercase">
              Serviços
            </h2>
            <div className="space-y-3">
              {barbershop.services.map((service) => (
                <ServiceItem
                  key={service.id}
                  barbershop={JSON.parse(JSON.stringify(barbershop))}
                  service={JSON.parse(JSON.stringify(service))}
                />
              ))}
            </div>
          </section>
        </div>
        {/* CONTATOS */}
        <section className="space-y-3 py-5 sm:py-8">
          {barbershop.phones.map((phone, index) => (
            <PhoneItem key={`${phone}-${index}`} phone={phone} />
          ))}
        </section>
      </main>
    </div>
  )
}

export default BarbershopPage
