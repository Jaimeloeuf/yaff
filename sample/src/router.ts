import { router } from "../../dist";

import { Todos } from "./views/Todos";
import { Settings } from "./views/Settings";
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
      path: "/settings",
      name: "settings",
      component: Settings,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
  ],

  notFoundComponent: NotFound,
});
