# FSW Barber

Uma plataforma para encontrar barbearias, consultar serviços e reservar horários online. O projeto possui autenticação com Google, persistência em PostgreSQL e uma interface responsiva para celular, tablet e desktop.

## Funcionalidades

- Busca de barbearias por nome ou serviço.
- Listas de recomendações e barbearias populares.
- Visualização de serviços, endereço e telefones de contato.
- Escolha de dia e horário disponível para uma reserva.
- Autenticação com conta Google.
- Consulta e cancelamento de agendamentos.
- Layout adaptado para telas pequenas, médias e grandes.

## Tecnologias

- [Next.js 16](https://nextjs.org/) e React 19
- TypeScript
- Tailwind CSS 4
- Prisma 7 e PostgreSQL
- NextAuth.js
- Base UI e Lucide

## Estrutura principal

```text
app/                  Rotas, componentes, ações e estilos da aplicação
app/_components/      Componentes de interface reutilizáveis
app/_actions/         Ações de criação, consulta e cancelamento de reservas
prisma/               Schema, migrações e dados de demonstração
public/               Imagens e ícones estáticos
```
