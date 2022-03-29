import { mount, createVNode, patch } from "../dist";

const vnode = createVNode("ul", {}, [
  createVNode("li", {}, createVNode("p", {}, "test")),
  createVNode("li", {}, createVNode("p", {}, "test 2")),
  createVNode("li", {}, createVNode("p", {}, "test 3")),
]);

const vnode2 = createVNode("ul", {}, [
  createVNode("li", {}, createVNode("p", {}, "new test")),
  createVNode("li", {}, createVNode("p", {}, "new test 2")),
  createVNode("li", {}, createVNode("p", {}, "new test 3")),
]);

mount(vnode, document.getElementById("app"));
setTimeout(() => patch(vnode, vnode2), 3000);
