import { prisma } from "../prisma/client";

async function main() {
  const roles = [
    {
      name: "ADMIN",
      description: "System Administrator"
    },
    {
      name: "FACULTY",
      description: "Faculty Member"
    },
    {
      name: "STUDENT",
      description: "Student"
    }
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: {
        name: role.name
      },
      update: {},
      create: role
    });
  }

  console.log("✅ Roles seeded successfully");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
