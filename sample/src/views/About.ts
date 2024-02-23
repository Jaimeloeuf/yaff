import { f, EventContext } from "../../../dist";
import type { State } from "../State";

export function About() {
  return f.div
    .class("h-dvh flex flex-col items-center justify-center p-12")
    .child([
      f.p.class("text-7xl font-thin text-zinc-400").child([
        f.span.child("todo app built with the "),
        f.a
          .class(
            "underline underline-offset-8 decoration-1 decoration-zinc-300",
          )
          .attrs({
            target: "_blank",
            href: "https://github.com/Jaimeloeuf/yaff",
          })
          .child("`yaff` framework"),
      ]),

      f.button
        .class(
          "pt-12 underline underline-offset-4 decoration-zinc-300 text-zinc-500",
        )
        .event("click", ({ queueReRender }: EventContext<State>) => {
          window.history.pushState({}, "", "/");
          queueReRender();
        })
        .child("Back to Home"),
    ]);
}
