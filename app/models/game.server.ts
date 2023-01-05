import { faker } from "@faker-js/faker";
import type { Game, Prisma } from "@prisma/client";
import { prisma } from "~/db.server";

export function createGame(data: Prisma.GameUncheckedCreateInput) {
  const rounds = [];
  for (let i = 1; i <= data.numberOfRounds; i++) {
    rounds.push(i);
  }
  // [1, 2, 3...]

  return prisma.game.create({
    data: {
      ...data,
      rounds: {
        createMany: {
          data: rounds.map((r) => {
            return { name: faker.lorem.word(), order: r }; // [{ order: 1}, {order: 2}...]
          }),
        },
      },
    },
  });
}

export function getGameById(id: Game["id"]) {
  return prisma.game.findUnique({
    where: { id },
    include: {
      creator: true,
      rounds: {
        include: { questions: true },
        orderBy: { order: "asc" },
      },
    },
  });
}
