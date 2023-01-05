export function Divider({ margin = "my-8" }: { margin?: `my-${number}` }) {
  return <hr className={`block w-full border-zinc-400 ${margin}`} />;
}
