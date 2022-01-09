import { lazy } from "react";
import _ from "lodash";

import { RouterConfigModel } from "@/router";

import { prefixStr } from "./constants";
import { getKeyPathStartPos, getComponents, getModules } from "./utils";
// type

/**
 * Serialize routes
 * @param routes
 * @returns
 */
const serializeRoutes = (routes: RouterConfigModel[]) => {
  routes = Object.values(routes);
  const routeQueue = [...routes];

  while (routeQueue.length) {
    const route = routeQueue.pop();
    if (route?.routes) {
      route.routes = Object.values(route.routes);
      routeQueue.push(...(route.routes as any[]));
    }
  }

  return routes;
};

const getRoutes = (blackRouterList: string[] = []): RouterConfigModel[] => {
  let routeList: RouterConfigModel[] = [];
  const modules = getModules(blackRouterList),
    components = getComponents();

  for (const key in modules) {
    if (!components[key]) return [];

    const keyPathArr = key.split("/");
    const path = keyPathArr.slice(getKeyPathStartPos(keyPathArr) + 1, -1);

    let finalPath = path.join("/routes/").split("/");

    const {
      name,
      isAutoRegisterRoute = true,
      dynamicRouteParams,
      redirectUri,
      isExact = true,
    } = components[key]?.default.type;

    if (isAutoRegisterRoute) {
      const templateRoute = {
        key: `${prefixStr}${path.join("-")}`,
        path: `/${path.join("/")}`,
        name: name,
        component: lazy(modules[key]),
        exact: isExact,
      };

      // isDynamicRoute
      const isDynamicRoute = !!dynamicRouteParams?.length;
      if (isDynamicRoute) {
        templateRoute.path = `/${path.join("/")}/:${dynamicRouteParams.join(
          "/:"
        )}`;
      }

      if (redirectUri) {
        // 动态路由重定向
        if (isDynamicRoute) {
          const redirectTemplateRoute = {
            key: `redirect-${path.join("-")}`,
            path: `/${path.join("/")}`,
            name: key,
          };

          const rePath = `/${path.join("/")}/${redirectUri}`;
          Reflect.set(redirectTemplateRoute, "redirect", rePath);
          _.set(routeList, "", redirectTemplateRoute);
        } else {
          // Ordinary Route
          const rePath = `/${path.join("/")}/${redirectUri}`;
          Reflect.set(templateRoute, "redirect", rePath);
        }
      }
      _.set(routeList, finalPath, templateRoute);
    }
  }

  return serializeRoutes(routeList);
};

export default getRoutes;
