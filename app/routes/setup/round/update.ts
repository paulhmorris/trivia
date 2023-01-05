import type { ActionArgs } from "@remix-run/node";
import { typedjson } from "remix-typedjson";
import invariant from "tiny-invariant";
import { updateRound } from "~/models/round.server";

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const roundId = form.get("roundId");
  const name = form.get("name");

  invariant(typeof roundId === "string", "Expected roundId");
  invariant(typeof name === "string", "Expected roundId");

  const round = await updateRound(roundId, { name });
  return typedjson({ round });
};
