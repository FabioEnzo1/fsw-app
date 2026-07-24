"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"

interface CreateBookingParams {
  userId: string
  serviceId: string
  date: Date
  barbershopId: string
}

export const createBooking = async (params: CreateBookingParams) => {
  await db.booking.create({
    data: {
      userId: params.userId,
      serviceId: params.serviceId,
      barbershopId: params.barbershopId,
      dateTime: params.date,
    },
  })
  revalidatePath("/barbershops/[id]")
}
