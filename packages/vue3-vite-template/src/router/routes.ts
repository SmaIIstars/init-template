import { RouteRecordRawProp } from "./types";
import getRoutes from "@/utils/getAutoRoutes";

const routes: RouteRecordRawProp[] = [
  // 重定向路由
  {
    key: "redirect-home",
    path: "/",
    redirect: "/dev-case",
  },
  ...getRoutes(),
];

console.log("routes", routes);

export { routes };
