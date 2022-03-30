import { createApp, createVNode } from "../dist";

createApp(
  {
    val: Math.random(),
  },

  (state) =>
    createVNode("div", {}, [
      createVNode("ul", {}, [
        createVNode("li", {}, createVNode("p", {}, "state " + state.val)),
        createVNode("li", {}, createVNode("p", {}, "state " + state.val)),
      ]),
    ]),

  document.getElementById("app")
);
