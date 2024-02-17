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

      return f.create("div").child([
        f.h1.child("Todos"),

        f.input
          .class("p-3")
          .attrs({
            type: "text",
            placeholder: "Add a new todo here...",
            value: state.newTodo,
            style: "border-radius: 0.5rem; border-color: rgb(228 228 231);",
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

        state.todos.length === 0 && f.p.child("Enter a todo to get started"),

        f.div
          .attrs({
            style: "padding-top: 1rem;",
          })
          .create(),

        f.button
          .attrs({
            style: "padding-right: 1rem; padding-left: 1rem;",
          })
          .event("click", addTodo)
          .child("Create"),

        state.todos.length > 0
          ? [
              f.p.child(`You have ${state.todos.length} todos.`),
              f.ol.child(
                state.todos.map((todo, index) =>
                  f.li.class(index & 1 ? "bg-zinc-50" : "").child(todo)
                )
              ),
            ]
          : f.p.child("No todos"),
      ]);
    }
  );
}

todo();
