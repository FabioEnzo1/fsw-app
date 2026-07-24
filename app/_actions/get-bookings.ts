"use server"

import { endOfDay, startOfDay } from "date-fns"
import { db } from "../_lib/prisma"

interface GetBookingsProps {
  serviceId: string
  dateTime: Date
}

export const getBookings = async ({ dateTime }: GetBookingsProps) => {
  return db.booking.findMany({
    where: {
      dateTime: {
        lte: endOfDay(dateTime),
        gte: startOfDay(dateTime),
      },
    },
  })
}
