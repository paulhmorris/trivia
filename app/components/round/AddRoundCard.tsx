import type { Game } from "@prisma/client";

export function AddRoundCard({ gameId }: { gameId: Game["id"] }) {
  return (
    <form action="/setup/round/add" method="post" className="h-full w-full">
      <input type="hidden" name="gameId" value={gameId} />
      <button
        type="submit"
        className="grid h-full w-full place-items-center gap-4 rounded border-2 border-dashed border-black p-4 shadow"
      >
        <span className="text-lg font-bold">Add Round +</span>
      </button>
    </form>
  );
}
