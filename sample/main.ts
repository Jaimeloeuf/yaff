import { yaff, f } from "../dist";

type State = {
  newTodo: string;
  todos: Array<string>;
};

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

/**
 * Function to define a new application to mount onto the DOM.
 */
function todo() {
  const appRootElement = document.getElementById("app");

  if (appRootElement === null) {
    throw new Error("App root element 'app' does not exist");
  }

  yaff<State>(
    appRootElement,

    {
      newTodo: "",
      todos: [],
    },

    function (state) {
      console.log("App state", state);

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
              .class(
                "w-full rounded-lg border border-zinc-200 p-2 outline-none",
              )
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

          state.todos.length > 0
            ? [
                f.ol.class("list-decimal p-6").child(
                  state.todos.map((todo, index) =>
                    f.li
                      .class("p-1")
                      .class(index % 2 === 0 && "bg-zinc-50")
                      .child(todo),
                  ),
                ),
              ]
            : f.p
                .class("py-8 text-3xl font-thin text-zinc-400")
                .child("No todos"),
        ]);
    },
  );
}

todo();
