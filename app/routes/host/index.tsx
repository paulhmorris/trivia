import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import crypto from "crypto";
import invariant from "tiny-invariant";
import { Button } from "~/components/common/Button";
import { Input } from "~/components/common/Input";
import { Select } from "~/components/common/Select";
import { enforceMaxLength } from "~/lib/formHelpers";
import { createGame } from "~/models/game.server";
import { getUser } from "~/session.server";

export const action: ActionFunction = async ({ request }) => {
  const user = await getUser(request);
  const form = await request.formData();
  const name = form.get("name");
  const numberOfRounds = Number(form.get("numberOfRounds"));
  const defaultPointsPerQuestion = Number(form.get("defaultPointsPerQuestion"));

  invariant(typeof name === "string", "name is required");
  invariant(typeof numberOfRounds === "number", "numberOfRounds is required");
  invariant(
    typeof defaultPointsPerQuestion === "number",
    "defaultPointsPerQuestion is required"
  );

  const publicCode = crypto.randomBytes(3).toString("hex").toLowerCase();

  const newGame = await createGame({
    data: {
      name,
      numberOfRounds,
      defaultPointsPerQuestion,
      userId: user ? user.id : undefined,
      publicCode,
    },
  });

  return redirect(`/host/game/${newGame.id}`);
};
// TODO: Move this to the db
const numberOfRoundsOptions = [1, 2, 3, 4, 5, 7, 10, 12, 15, 20];
const defaultPointsPerQuestionOptions = [1, 2, 3, 4, 5];

export default function HostIndex() {
  return (
    <main className="relative mt-[20%] flex w-full max-w-md flex-col items-center">
      <h1 className="text-center text-6xl font-extrabold text-black">
        Host a game
      </h1>
      <p className="mt-8 text-center text-lg text-zinc-700 sm:text-xl">
        Hey-o! Welcome. Give us a few details about your game and we'll whip it
        up in no time.
      </p>
      <form
        action="/host?index"
        method="post"
        className="mt-12 flex w-full flex-col gap-8"
      >
        <Input
          name="name"
          label="Name"
          description="Pick something fun!"
          placeholder="Trivial Persuit"
          maxLength={256}
          onKeyDown={enforceMaxLength}
          required
        />
        <Select
          name="numberOfRounds"
          label="Number of rounds"
          description="We usually start with five"
          defaultValue={5}
          required
        >
          {numberOfRoundsOptions.map((num) => {
            return (
              <option key={num} value={num.toString()}>
                {num}
              </option>
            );
          })}
        </Select>
        <Select
          name="defaultPointsPerQuestion"
          label="Default points per question"
          description="You can change each question's points later."
          defaultValue={1}
          required
        >
          {defaultPointsPerQuestionOptions.map((num) => {
            return (
              <option key={num} value={num.toString()}>
                {num}
              </option>
            );
          })}
        </Select>
        <Button variant="primary" type="submit">
          Start
        </Button>
      </form>
    </main>
  );
}
