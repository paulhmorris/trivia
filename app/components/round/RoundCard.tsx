import type { Prisma } from "@prisma/client";
import { useFetcher } from "@remix-run/react";
import { FaTrashAlt } from "react-icons/fa";
import { ButtonLink } from "~/components/common/ButtonLink";

type RoundWithQuestions = Prisma.RoundGetPayload<{
  include: { questions: true };
}>;

export function RoundCard({ round }: { round: RoundWithQuestions }) {
  const fetcher = useFetcher();
  return (
    <li
      className="flex flex-col justify-between gap-4 rounded border-2 border-black p-4 shadow"
      data-order={round.order}
    >
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold">{round.name}</p>
        <fetcher.Form
          action="/setup/round/delete"
          method="delete"
          className="flex w-auto items-center"
        >
          <input type="hidden" name="roundId" value={round.id} />
          <input type="hidden" name="gameId" value={round.gameId} />
          <button
            type="submit"
            className="-mr-2 p-2 text-zinc-300 hover:text-pink-700"
          >
            <span className="sr-only">Delete round</span>
            <FaTrashAlt className="h-4 w-4" />
          </button>
        </fetcher.Form>
      </div>
      <p>
        {round.questions.length > 0 &&
          `${round.questions.length} question${
            round.questions.length > 1 ? "s" : ""
          }`}
      </p>
      <ButtonLink to={`/setup/round/${round.id}`} variant="secondary">
        {round.questions.length > 0 ? "Edit" : "Add Questions +"}
      </ButtonLink>
    </li>
  );
}
