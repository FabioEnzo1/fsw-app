import { BarbershopService } from "@/prisma/generated/prisma/client"
import Image from "next/image"

interface ServiceItemProps {
  service: BarbershopService
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="relative min-h-27.5 min-w-27.5">
        <Image
          src={service.imageUrl}
          fill
          className="object-cover"
          alt={service.name}
        />
      </div>
      <div>
        <p className="font-semibold">{service.name}</p>
        <p className="text-sm text-gray-500">{service.description}</p>
      </div>
    </div>
  )
}

export default ServiceItem
