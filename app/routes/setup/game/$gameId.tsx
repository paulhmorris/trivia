import type { LoaderArgs } from "@remix-run/node";
import { Response } from "@remix-run/node";
import { FaInfoCircle, FaLink } from "react-icons/fa";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import invariant from "tiny-invariant";
import { Button } from "~/components/common/Button";
import { ButtonLink } from "~/components/common/ButtonLink";
import { AddRoundCard } from "~/components/round/AddRoundCard";
import { RoundCard } from "~/components/round/RoundCard";
import { copyInnerTextToClipboard, copyTextToClipboard } from "~/lib/utils";
import { getGameById } from "~/models/game.server";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(typeof params.gameId === "string", "Expected gameId param");
  const game = await getGameById(params.gameId);
  if (!game) {
    throw new Response("Game not found", { status: 404 });
  }
  return typedjson({ game });
};

export default function HostGamePags() {
  const { game } = useTypedLoaderData<typeof loader>();
  const gameHasQuestions =
    game.rounds.filter((r) => r.questions.length > 0).length > 0;

  return (
    <main className="w-full space-y-6">
      <div className="flex max-w-[90%] flex-wrap items-end gap-4">
        <h1 className="text-5xl font-bold text-black" title="Great name!">
          {game?.name ?? game.id}
        </h1>
        <Button
          className="w-auto text-sm"
          variant="secondary"
          onClick={() =>
            copyTextToClipboard(`${window.ENV.APP_URL}/join/${game.publicCode}`)
          }
        >
          Copy Link
          <FaLink className="h-4 w-4 hover:text-pink-700" />
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <p id="code">Code:</p>
        <button
          aria-describedby="code"
          className="font-bold text-pink-700 hover:text-pink-700"
          onClick={copyInnerTextToClipboard}
        >
          {game.publicCode}
        </button>
        <span>|</span>
        <p>
          <span className="font-bold text-pink-700">{game.numberOfRounds}</span>{" "}
          rounds |
        </p>
        <p>
          <span className="font-bold text-pink-700">
            {game.defaultPointsPerQuestion}
          </span>{" "}
          pt{game.defaultPointsPerQuestion > 1 ? "s" : ""} per question
        </p>
      </div>

      <div>
        <ButtonLink to={`/play/host/${game.id}`}>Start Game</ButtonLink>
        {!gameHasQuestions && (
          <p className="mt-1 rounded border-2 border-zinc-500 p-2 text-sm font-medium sm:max-w-xs">
            <FaInfoCircle className="mb-2" />
            You haven't added any questions yet. You can start the game, but it
            won't be very fun!
          </p>
        )}
      </div>

      <div>
        <h2 className="mb-2 text-3xl font-bold text-black">Rounds</h2>
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {game.rounds.map((round) => (
            <RoundCard key={round.id} round={round} />
          ))}
          <AddRoundCard gameId={game.id} />
        </ul>
      </div>
    </main>
  );
}
