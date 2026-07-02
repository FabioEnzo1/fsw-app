import { CardHeader } from "./card"
import Image from "next/image"
import { Button } from "./button"
import { MenuIcon } from "lucide-react"

const Header = () => {
  return (
    <div>
      <CardHeader className="flex flex-row items-center justify-between p-5">
        <Image src="/Logo.png" alt="FSW BARBER" height={18} width={120} />
        <Button variant="outline" size="icon">
          <MenuIcon />
        </Button>
      </CardHeader>
    </div>
  )
}

export default Header
