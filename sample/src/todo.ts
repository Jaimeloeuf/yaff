import { yaff, f } from "../../dist";
import type { State } from "./State";

/**
 * Function that transform the state by saving the draft todo as a new one.
 */
function addTodo(state: State) {
  if (state.newTodo === "") {
    alert("Please enter a valid todo");
    return;
  }

  return {
    ...state,
    newTodo: "",
    todos: [state.newTodo, ...state.todos],
  };
}

export function todo(state) {
  return f
    .create("div")
    .class("mx-auto max-w-screen-sm p-6")
    .child([
      f.div
        .class("flex flex-row items-center pb-2")
        .child([
          f.p.class("text-2xl font-bold").child("Todos"),
          state.todos.length !== 0 &&
            f.p
              .class("px-2 text-lg font-thin tracking-widest")
              .child(`(${state.todos.length})`),
        ]),

      f.div.class("flex flex-row items-center gap-4").child([
        f.input
          .class("w-full rounded-lg border border-zinc-200 p-2 outline-none")
          .attrs({
            type: "text",
            placeholder: "Add a new todo here...",
            value: state.newTodo,
          })
          .event("input", (state: State, event) => ({
            ...state,
            newTodo: (event.target as HTMLInputElement).value,
          }))
          .event("keydown", (state: State, event) => {
            if ((event as KeyboardEvent).key === "Enter") {
              return addTodo(state);
            }
          })
          .create(),

        f.div
          .class("flex flex-col items-center justify-center text-green-600")
          .child(
            f.button
              .class("text-4xl font-thin")
              .event("click", addTodo)
              .child("+"),
          ),
      ]),

      state.todos.length === 0
        ? f.p.class("py-8 text-3xl font-thin text-zinc-400").child("No todos")
        : f.ol
            .class(
              "list-decimal p-4 pr-0 marker:text-zinc-400 marker:font-light",
            )
            .child(
              state.todos.map((todo, index) =>
                f.li
                  .class("group cursor-pointer p-1 rounded-lg odd:bg-zinc-50")
                  .child(
                    f.div
                      .class("flex flex-row items-center justify-between")
                      .child([
                        f.p.class("text-zinc-900 font-extralight").child(todo),
                        f.div
                          .class(
                            "flex flex-col items-center justify-center px-1.5 rounded bg-white shadow-md group-hover:shadow-red-300",
                          )
                          .child(
                            f.button
                              .class(
                                "text-zinc-400 group-hover:text-red-400 select-none",
                              )
                              .event("click", (state: State) => {
                                state.todos.splice(index, 1);
                                return state;
                              })
                              .child("X"),
                          ),
                      ]),
                  ),
              ),
            ),
    ]);
}
