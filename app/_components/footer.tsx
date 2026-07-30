import { Card, CardContent } from "./ui/card"

const Footer = () => {
  return (
    <footer className="mt-auto w-full">
      <Card className="rounded-none border-x-0 border-b-0">
        <CardContent className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
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
