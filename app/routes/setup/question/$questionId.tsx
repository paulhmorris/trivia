import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, useSearchParams } from "@remix-run/react";
import { FaArrowLeft } from "react-icons/fa";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import invariant from "tiny-invariant";
import { Button } from "~/components/common/Button";
import { Input } from "~/components/common/Input";
import { ChangeQuestionPointsForm } from "~/components/forms/ChangeQuestionPointsForm";
import { prisma } from "~/db.server";
import { getQuestionById } from "~/models/question.server";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(typeof params.questionId === "string", "Expected questionId param");
  const question = await getQuestionById(params.questionId);
  if (!question) {
    throw new Response("Question not found", { status: 404 });
  }
  return typedjson({ question });
};

export const action = async ({ request, params }: ActionArgs) => {
  const { questionId } = params;
  invariant(typeof questionId === "string", "Expected questionId");

  const form = await request.formData();
  const question = form.get("question");
  const answer = form.get("answer");

  invariant(typeof question === "string", "Expected question");
  invariant(typeof answer === "string", "Expected answer");

  const updatedQuestion = await prisma.question.update({
    where: { id: questionId },
    data: { question, answer },
  });

  return redirect(`/setup/round/${updatedQuestion.roundId}`);
};

export default function QuestionPage() {
  const { question } = useTypedLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const questionNumber = searchParams.get("question");

  return (
    <main className="w-full space-y-6">
      <Link
        to={`/setup/round/${question.roundId}`}
        className="inline-flex items-center gap-2 text-zinc-400 transition duration-75 hover:text-pink-700"
      >
        <FaArrowLeft /> Back to round setup
      </Link>
      <h1 className="text-6xl font-bold text-black">
        Question {questionNumber}
      </h1>
      <div className="ml-auto flex items-center gap-4 text-center">
        <p className="font-bold">Points</p>
        <ChangeQuestionPointsForm question={question} />
      </div>
      <form method="post" className="space-y-4">
        <Input
          name="question"
          label="Question"
          defaultValue={question.question}
          required
        />
        <Input
          name="answer"
          label="Answer"
          defaultValue={question.answer}
          required
        />
        <Button type="submit">Save</Button>
      </form>
    </main>
  );
}
