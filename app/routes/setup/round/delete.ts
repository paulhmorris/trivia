import type { ActionArgs } from "@remix-run/server-runtime";
import { typedjson } from "remix-typedjson";
import invariant from "tiny-invariant";
import { deleteRound } from "~/models/round.server";

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const roundId = form.get("roundId");
  const gameId = form.get("gameId");
  invariant(typeof roundId === "string", "Expected roundId");
  invariant(typeof gameId === "string", "Expected gameId");
  const deletedRound = await deleteRound(roundId, gameId);
  return typedjson({ deletedRound });
};
