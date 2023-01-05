import type { Question } from "@prisma/client";
import { prisma } from "~/db.server";

export function getQuestionById(id: Question["id"]) {
  return prisma.question.findUnique({
    where: { id },
    include: { round: true },
  });
}

export function deleteQuestion(id: Question["id"]) {
  return prisma.question.delete({ where: { id } });
}

export function incrementPoints(id: Question["id"]) {
  return prisma.question.update({
    where: { id },
    data: {
      points: { increment: 1 },
    },
  });
}

export function decrementPoints(id: Question["id"]) {
  return prisma.question.update({
    where: { id },
    data: {
      points: { decrement: 1 },
    },
  });
}
