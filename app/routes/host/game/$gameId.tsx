import type { DataFunctionArgs } from "@remix-run/node";
import { json, Response } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { copyToClipboard } from "~/lib/utils";
import { getGameById } from "~/models/game.server";

export const loader = async ({ params }: DataFunctionArgs) => {
  invariant(typeof params.gameId === "string", "Expected gameId param");
  const game = await getGameById(params.gameId);
  if (!game) {
    throw new Response("Game not found", { status: 404 });
  }
  return json({ game });
};

export default function HostGamePage() {
  const { game } = useLoaderData<typeof loader>();

  return (
    <main className="w-full">
      <h1 className="text-5xl font-bold text-black" title="Great name!">
        {game?.name ?? game.id}
      </h1>
      <div className="my-4">
        <div className="flex gap-4">
          <button
            aria-describedby="copy-instructions"
            className="text-xl font-bold text-pink-700"
            onClick={copyToClipboard}
          >
            {game.publicCode}
          </button>
          <button>
            <span className="sr-only">Get a link to share</span>
          </button>
        </div>
        <p id="copy-instructions">
          Click the code to copy it, or click the share icon to get a link.
        </p>
      </div>
      <p>Rounds {game.numberOfRounds}</p>
      <p>Points per q{game.defaultPointsPerQuestion}</p>
    </main>
  );
}
