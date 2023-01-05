import type { Question } from "@prisma/client";
import { useFetcher } from "@remix-run/react";
import { SquareButton } from "~/components/common/SquareButton";

export function ChangeQuestionPointsForm({ question }: { question: Question }) {
  const fetcher = useFetcher();
  return (
    <fetcher.Form
      action="/setup/question/change-points"
      method="post"
      className="mt-auto flex items-center gap-2"
    >
      <input type="hidden" name="questionId" value={question.id} />
      <SquareButton
        type="submit"
        name="_action"
        value="decrement"
        disabled={question.points <= 0}
      >
        -
      </SquareButton>
      <p className="min-w-[18px] font-bold">{question.points}</p>
      <SquareButton type="submit" name="_action" value="increment">
        +
      </SquareButton>
    </fetcher.Form>
  );
}
