import { yaff, f } from "../dist";

/**
 * Function that transform the state by saving the draft todo as a new one.
 */
function addTodo(state) {
  if (state.newTodo === "") {
    alert("Please enter a valid todo");
    return state;
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
  yaff(
    document.getElementById("app"),

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
          .event("input", (state, event) => ({
            ...state,
            newTodo: event.target.value,
          }))
          .event("keydown", (state, event) => {
            if (event.key === "Enter") {
              return addTodo(state);
            }

            return state;
          })
          .create(),

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
          ? f.ol.child(
              state.todos.map((todo, index) =>
                f.li.class(index & 1 ? "bg-zinc-50" : "").child(todo)
              )
            )
          : f.p.child("No todos"),
      ]);
    }
  );
}

todo();
