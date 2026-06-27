import { config } from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.js";

config({ path: "prisma/.env" });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL não definida em prisma/.env");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function seedDatabase() {
  const images = [
    "https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png",
    "https://utfs.io/f/45331760-899c-4b4b-910e-e00babb6ed81-16q.png",
    "https://utfs.io/f/5832df58-cfd7-4b3f-b102-42b7e150ced2-16r.png",
    "https://utfs.io/f/7e309eaa-d722-465b-b8b6-76217404a3d3-16s.png",
    "https://utfs.io/f/178da6b6-6f9a-424a-be9d-a2feb476eb36-16t.png",
    "https://utfs.io/f/2f9278ba-3975-4026-af46-64af78864494-16u.png",
    "https://utfs.io/f/988646ea-dcb6-4f47-8a03-8d4586b7bc21-16v.png",
    "https://utfs.io/f/60f24f5c-9ed3-40ba-8c92-0cd1dcd043f9-16w.png",
    "https://utfs.io/f/f64f1bd4-59ce-4ee3-972d-2399937eeafc-16x.png",
    "https://utfs.io/f/e995db6d-df96-4658-99f5-11132fd931e1-17j.png",
  ];

  const creativeNames = [
    "Barbearia Vintage",
    "Corte & Estilo",
    "Barba & Navalha",
    "The Dapper Den",
    "Cabelo & Cia.",
    "Machado & Tesoura",
    "Barbearia Elegance",
    "Aparência Impecável",
    "Estilo Urbano",
    "Estilo Clássico",
  ];

  const addresses = [
    "Rua da Barbearia, 123",
    "Avenida dos Cortes, 456",
    "Praça da Barba, 789",
    "Travessa da Navalha, 101",
    "Alameda dos Estilos, 202",
    "Estrada do Machado, 303",
    "Avenida Elegante, 404",
    "Praça da Aparência, 505",
    "Rua Urbana, 606",
    "Avenida Clássica, 707",
  ];

  const services = [
    {
      name: "Corte de Cabelo",
      description: "Estilo personalizado com as últimas tendências.",
      price: 60.0,
    },
    {
      name: "Barba",
      description: "Modelagem completa para destacar sua masculinidade.",
      price: 40.0,
    },
    {
      name: "Pézinho",
      description: "Acabamento perfeito para um visual renovado.",
      price: 35.0,
    },
    {
      name: "Sobrancelha",
      description: "Expressão acentuada com modelagem precisa.",
      price: 20.0,
    },
    {
      name: "Massagem",
      description: "Relaxe com uma massagem revigorante.",
      price: 50.0,
    },
    {
      name: "Hidratação",
      description: "Hidratação profunda para cabelo e barba.",
      price: 25.0,
    },
  ];

  for (let i = 0; i < 10; i++) {
    const barbershop = await prisma.barbershop.create({
      data: {
        name: creativeNames[i],
        address: addresses[i],
        imageUrl: images[i],
        phones: ["(11) 99999-9999", "(11) 99999-9999"],
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac augue ullamcorper, pharetra orci mollis, auctor tellus.",
      },
    });

    for (const service of services) {
      await prisma.barbershopService.create({
        data: {
          name: service.name,
          description: service.description,
          price: service.price,
          barbershopId: barbershop.id,
        },
      });
    }
  }

  console.log("Seed concluído: 10 barbearias criadas.");
}

seedDatabase()
  .catch((error) => {
    console.error("Erro ao executar seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
