import type { Metadata } from "next"
import { Toaster } from "sonner"
import Footer from "./_components/footer"
import AuthProvider from "./_providers/auth"
import "./globals.css"

export const metadata: Metadata = {
  title: "FSW Barber | Agendamentos para barbearias",
  description:
    "Encontre barbearias, escolha serviços e agende seu próximo horário.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="flex min-h-screen flex-col antialiased">
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  )
}
