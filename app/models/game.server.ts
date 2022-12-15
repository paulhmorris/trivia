import type { Game, Prisma } from "@prisma/client";
import { prisma } from "~/db.server";

export function createGame(data: Prisma.GameCreateArgs) {
  return prisma.game.create({ ...data });
}

export function getGameById(id: Game["id"]) {
  return prisma.game.findUnique({
    where: { id },
    include: { creator: true, rounds: true },
  });
}
