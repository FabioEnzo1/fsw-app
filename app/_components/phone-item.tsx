"use client"

import { PhoneIcon } from "lucide-react"
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
    <div className="flex justify-between" key={phone}>
      {/* ESQUERDA */}
      <div className="flex items-center gap-2">
        <PhoneIcon />
        <p className="text-sm">{phone}</p>
      </div>
      {/* DIREITA */}
      <Button
        variant="outline"
        onClick={() => handleCopyPhoneClick(phone)}
        size="sm"
      >
        Copiar
      </Button>
    </div>
  )
}

export default PhoneItem
