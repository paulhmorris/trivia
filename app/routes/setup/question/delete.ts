import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { deleteQuestion } from "~/models/question.server";

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const questionId = form.get("questionId");
  invariant(typeof questionId === "string", "Expected questionId");

  const deletedQuestion = await deleteQuestion(questionId);
  return json({ deletedQuestion });
};
