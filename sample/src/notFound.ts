import { f } from "../../dist";
import type { State } from "./State";

export function notFound(state: State, rerender) {
  return f.div
    .class("h-dvh flex flex-col items-center justify-center p-12")
    .child([
      f.p.class("text-9xl font-thin text-zinc-400").child("Page Not Found"),
      f.button
        .class("pt-8 underline underline-offset-4 text-zinc-500")
        .event("click", () => {
          window.history.pushState({}, "", "/");
          rerender();
        })
        .child("Back to Home"),
    ]);
}
