import { Card, CardContent } from "./ui/card"

const Footer = () => {
  return (
    <footer className="w-full">
      <Card className="rounded-none border-x-0 border-b-0">
        <CardContent className="px-5 py-3">
          <p className="text-sm text-gray-400">
            © 2026 Copyright{" "}
            <span className="font-bold text-gray-300">FSW Barber</span>
          </p>
        </CardContent>
      </Card>
    </footer>
  )
}

export default Footer
