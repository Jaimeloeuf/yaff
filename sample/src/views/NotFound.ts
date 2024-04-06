import { f } from "../../../dist";

export function NotFound() {
  return f.div
    .class("h-dvh flex flex-col items-center justify-center p-12")
    .child([
      f.p.class("text-9xl font-thin text-zinc-400").child("Page Not Found"),
      f.button
        .class("pt-8 underline underline-offset-4 text-zinc-500")
        .event("click", ({ queueReRender }) => {
          window.history.pushState({}, "", "/");
          queueReRender();
        })
        .child("Back to Home"),
    ]);
}
