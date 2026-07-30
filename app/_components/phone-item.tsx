"use client"

import { SmartphoneIcon } from "lucide-react"
import { toast } from "sonner"
import { Button } from "./ui/button"

interface PhoneItemProps {
  phone: string
}

const PhoneItem = ({ phone }: PhoneItemProps) => {
  const handleCopyPhoneClick = (phone: string) => {
    navigator.clipboard.writeText(phone)
    toast("Telefone copiado com sucesso!")
  }

  return (
    <div className="flex w-full items-center justify-between gap-3" key={phone}>
      {/* ESQUERDA */}
      <div className="flex min-w-0 items-center gap-2">
        <SmartphoneIcon className="shrink-0" />
        <p className="text-sm break-all">{phone}</p>
      </div>
      {/* DIREITA */}
      <Button
        variant="outline"
        onClick={() => handleCopyPhoneClick(phone)}
        size="sm"
        className="shrink-0"
      >
        Copiar
      </Button>
    </div>
  )
}

export default PhoneItem
