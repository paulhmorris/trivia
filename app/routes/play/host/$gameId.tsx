import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getGameById } from "~/models/game.server";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(typeof params.gameId === "string", "Expected gameId param");
  const game = await getGameById(params.gameId);
  if (!game) {
    throw new Response("Game not found", { status: 404 });
  }
  return json({ game });
};
