import type { ActionArgs } from "@remix-run/node";
import { redirect } from "remix-typedjson";
import invariant from "tiny-invariant";
import { createRound } from "~/models/round.server";

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const gameId = form.get("gameId");
  invariant(typeof gameId === "string", "Expected gameId URL parameter");

  const newRound = await createRound(gameId);
  return redirect(`/setup/round/${newRound.id}`);
};
