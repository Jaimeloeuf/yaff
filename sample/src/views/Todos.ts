import { AppContext, EventContext, f } from "../../../dist";
import type { State } from "../State";

function addTodo({ state, updateState }: EventContext<State>) {
  if (state.newTodo === "") {
    alert("Please enter a valid todo");
    return;
  }

  updateState({
    newTodo: "",
    todos: [state.newTodo, ...state.todos],
  });
}

function removeTodo(
  index: number,
  { state, updateState }: EventContext<State>,
) {
  state.todos.splice(index, 1);
  updateState(state);
}

export function Todos({ state, reRender }: AppContext<State>) {
  return f
    .create("div")
    .class("mx-auto max-w-screen-sm p-6")
    .child([
      f.div.class("flex flex-row items-center justify-between pb-2").child([
        f.div
          .class("flex flex-row items-center")
          .child([
            f.p.class("text-2xl font-bold").child("Todos"),
            state.todos.length !== 0 &&
              f.p
                .class("px-2 text-lg font-thin tracking-widest")
                .child(`(${state.todos.length})`),
          ]),

        f.button
          .class(
            "text-xl underline underline-offset-4 decoration-1 decoration-zinc-300 text-zinc-400 font-thin",
          )
          .event("click", () => {
            window.history.pushState({}, "", "/about");
            reRender();
          })
          .child("about"),
      ]),

      f.div.class("flex flex-row items-center gap-4").child([
        f.input
          .class("w-full rounded-lg border border-zinc-200 p-2 outline-none")
          .attrs({
            type: "text",
            placeholder: "Add a new todo here...",
            value: state.newTodo,
          })
          .event("input", ({ event, updateState }) =>
            updateState({
              newTodo: (event.target as HTMLInputElement).value,
            }),
          )
          .event("keydown", (context: EventContext<State>) => {
            if ((context.event as KeyboardEvent).key === "Enter") {
              addTodo(context);
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
        ? f.div
            .class("h-[80dvh] flex flex-col items-center justify-center")
            .child(
              f.p
                .class("py-8 text-7xl font-thin text-zinc-300 select-none")
                .child("No todos"),
            )
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
                      .class("flex flex-row items-start justify-between")
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
                              .event("click", (ctx) => removeTodo(index, ctx))
                              .child("X"),
                          ),
                      ]),
                  ),
              ),
            ),
    ]);
}
