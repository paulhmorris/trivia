import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useFetcher } from "@remix-run/react";
import { FaArrowLeft } from "react-icons/fa";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import invariant from "tiny-invariant";
import { Button } from "~/components/common/Button";
import { Divider } from "~/components/common/Divider";
import { Input } from "~/components/common/Input";
import { ChangeQuestionPointsForm } from "~/components/forms/ChangeQuestionPointsForm";
import { prisma } from "~/db.server";
import { MAX_QUESTIONS_PER_ROUND } from "~/lib/config";
import { getRoundById } from "~/models/round.server";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(typeof params.roundId === "string", "Expected roundId param");
  const round = await getRoundById(params.roundId);
  if (!round) {
    throw new Response("Round not found", { status: 404 });
  }
  return typedjson({ round });
};

export const action = async ({ request, params }: ActionArgs) => {
  const { roundId } = params;
  invariant(typeof roundId === "string", "Expected roundId");

  const form = await request.formData();
  const question = form.get("question");
  const answer = form.get("answer");

  invariant(typeof question === "string", "Expected question");
  invariant(typeof answer === "string", "Expected answer");

  const newQuestion = await prisma.question.create({
    data: {
      question,
      answer,
      round: {
        connect: { id: roundId },
      },
    },
  });
  return json({ newQuestion });
};

export default function RoundPage() {
  const { round } = useTypedLoaderData<typeof loader>();
  const fetcher = useFetcher();

  return (
    <main className="w-full space-y-6">
      <Link
        to={`/setup/game/${round.gameId}`}
        className="inline-flex items-center gap-2 text-zinc-400 transition duration-75 hover:text-pink-700"
      >
        <FaArrowLeft /> Back to game setup
      </Link>
      <fetcher.Form
        action="/setup/round/update"
        method="post"
        className="space-y-2"
      >
        <input type="hidden" name="roundId" value={round.id} />
        <Input
          required
          label="Round name"
          name="name"
          className="text-6xl font-bold text-black sm:w-1/3"
          defaultValue={round.name ?? ""}
        />
        <Button type="submit">Save</Button>
      </fetcher.Form>
      <p className="text-zinc-500">Maximum 10 questions per round</p>
      <Divider margin="my-12" />
      <fetcher.Form method="post" className="space-y-4">
        <Input name="question" label="Question" required />
        <Input name="answer" label="Answer" required />
        <Button
          type="submit"
          disabled={round.questions.length >= MAX_QUESTIONS_PER_ROUND}
        >
          Add +
        </Button>
        {round.questions.length >= MAX_QUESTIONS_PER_ROUND && (
          <p className="text-sm font-bold text-pink-700">
            Max questions reached!
          </p>
        )}
      </fetcher.Form>
      <ul className="space-y-4">
        {round.questions.length > 0 ? (
          round.questions.map((q, index) => {
            const questionNumber = index + 1;
            return (
              <li
                key={q.id}
                className="flex w-full items-center rounded border border-zinc-500 p-4"
              >
                <div>
                  <p className="font-bold">Question {questionNumber}</p>
                  <div className="mb-4 flex items-center gap-4">
                    <Link
                      to={`/setup/question/${q.id}?question=${questionNumber}`}
                    >
                      Edit
                    </Link>
                    <fetcher.Form action="/setup/question/delete" method="post">
                      <input type="hidden" name="questionId" value={q.id} />
                      <button
                        type="submit"
                        className="font-medium text-pink-700 decoration-pink-700 decoration-2 underline-offset-2 transition duration-75 hover:underline"
                      >
                        Delete
                      </button>
                    </fetcher.Form>
                  </div>
                  <p>Q: {q.question}</p>
                  <p>A: {q.answer}</p>
                </div>

                <div className="ml-auto text-center">
                  <p className="mb-4 font-bold">Points</p>
                  <ChangeQuestionPointsForm question={q} />
                </div>
              </li>
            );
          })
        ) : (
          <p className="text-zinc-500">No questions yet. Add one above.</p>
        )}
      </ul>
    </main>
  );
}
