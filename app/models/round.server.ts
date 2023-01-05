import type { Game, Prisma, Round } from "@prisma/client";
import { prisma } from "~/db.server";

export function getRoundById(id: Round["id"]) {
  return prisma.round.findUnique({
    where: { id },
    include: { questions: { orderBy: { createdAt: "asc" } } },
  });
}

export async function createRound(gameId: Game["id"]) {
  const game = await prisma.game.findFirst({
    where: { id: gameId },
    include: { rounds: true },
  });
  if (!game) {
    throw new Error("Game not found");
  }

  return prisma.round.create({
    data: { gameId, order: game.rounds.length + 1 },
  });
}

export function updateRound(id: Round["id"], data: Prisma.RoundUpdateInput) {
  return prisma.round.update({ where: { id }, data });
}

export async function deleteRound(id: Round["id"], gameId: Game["id"]) {
  const round = await prisma.round.delete({ where: { id } });

  // decrement order of all following round to keep order straight
  await prisma.round.updateMany({
    where: { gameId, order: { gt: round.order } },
    data: { order: { decrement: 1 } },
  });

  return round;
}
