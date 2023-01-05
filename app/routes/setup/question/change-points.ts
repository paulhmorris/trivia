import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { prisma } from "~/db.server";
import { decrementPoints, incrementPoints } from "~/models/question.server";

export type ChangePointsData = typeof action;

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const questionId = form.get("questionId");
  const action = form.get("_action");

  invariant(typeof questionId === "string", "Expected questionId");
  invariant(typeof action === "string", "Expected action");

  const currentQuestion = await prisma.question.findUnique({
    where: { id: questionId },
  });
  if (currentQuestion?.points === 0 && action === "decrement") {
    throw new Response("Cannot set a question's points to a negative number", {
      status: 405,
    });
  }

  let question;
  if (action === "increment") {
    question = await incrementPoints(questionId);
  } else if (action === "decrement") {
    question = await decrementPoints(questionId);
  }

  return json({ question });
};
