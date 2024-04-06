import { f, useState } from "../../../dist";

function saveUsername(input: string) {
  // if (input === "") {
  //   alert("Please enter a valid username");
  //   return;
  // }
}

export function Settings() {
  const [username, setUsername] = useState("");

  return f
    .create("div")
    .class("mx-auto max-w-screen-sm p-6")
    .child([
      f.p.class("text-2xl font-bold pb-4").child("Settings"),

      f.p.class("pb-1 font-light").child("Username (press enter to save)"),

      f.input
        .class("w-full rounded-lg border border-zinc-200 p-2 outline-none")
        .attrs({
          type: "text",
          placeholder: "Write your username here...",
          value: username(),
        })
        .event("input", ({ event }) =>
          setUsername((event.target as HTMLInputElement).value),
        )
        .event("keydown", (context) => {
          if ((context.event as KeyboardEvent).key === "Enter") {
            saveUsername(username());
            setUsername("");
          }
        })
        .create(),
    ]);
}
