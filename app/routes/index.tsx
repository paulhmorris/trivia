import type { ActionFunction } from "@remix-run/node";
import invariant from "tiny-invariant";
import { Button } from "~/components/common/Button";
import { ButtonLink } from "~/components/common/ButtonLink";
import { Input } from "~/components/common/Input";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const code = form.get("publicCode");
  invariant(typeof code === "string", "Expected game code");
};

export default function Index() {
  return (
    <main className="relative mt-[20%] flex h-full flex-col items-center">
      <div>
        <h1 className="text-center text-6xl font-extrabold text-black">
          Live trivia.
          <br /> Easy to host. <br />
          Easy to join. Free.
        </h1>
      </div>
      <div className="mt-12 flex w-full max-w-xs flex-col items-center justify-center gap-2">
        <form action="/?index" method="post">
          <div className="flex flex-col items-center gap-1">
            <div className="flex gap-1">
              <Input
                label="Enter code"
                hideLabel
                placeholder="Enter a game code"
                type="text"
                name="publicCode"
                id="publicCode"
              />
              <Button
                type="submit"
                variant="secondary"
                size="lg"
                className="w-auto"
              >
                Join
              </Button>
            </div>
          </div>
        </form>
        <p className="text-lg font-bold">or</p>
        <ButtonLink to="/setup" size="xl">
          Host Game
        </ButtonLink>
      </div>
    </main>
  );
}
