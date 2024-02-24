import { router } from "../../dist";

import { Todos } from "./views/Todos";
import { About } from "./views/About";
import { NotFound } from "./views/NotFound";

export const { routerViewComponent } = router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Todos,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
  ],

  notFoundComponent: NotFound,
});
