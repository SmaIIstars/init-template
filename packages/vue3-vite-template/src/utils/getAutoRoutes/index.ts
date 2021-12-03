import _ from "lodash";
import { RouteRecordRawProp } from "@/router/types";
import { prefixStr } from "./constants";
import { getKeyPathStartPos } from "./utils";
// type
import { DefineComponent } from "vue";
const blackRouterList: string[] = [
  // "test",
  // "v-template",
];

const routerFilter = (keyPath: string) => {
  const keyPathArr = keyPath.split("/");
  const fileName = keyPathArr.slice(getKeyPathStartPos(keyPathArr) + 1, -1)[0];
  return blackRouterList.includes(fileName);
};

const getModules = () => {
  // .vue files in 'pages' folders
  const modules = import.meta.glob("../../pages/**/*.vue");
  let res: Record<string, () => Promise<{ [key: string]: DefineComponent }>> =
    {};
  if (!modules) return res;

  for (const key in modules) {
    if (!routerFilter(key) && !key.includes("components")) {
      Reflect.set(res, key, modules[key]);
    }
  }
  return res;
};

const getComponents = () => {
  const components = import.meta.globEager("../../pages/**/*.vue");
  let res: Record<string, { [key: string]: DefineComponent }> = {};
  if (!components) return res;

  for (const key in components) {
    if (!key.includes("components")) {
      Reflect.set(res, key, components[key]);
    }
  }
  return res;
};

/**
 * Serialize routes
 * @param routes
 * @returns
 */
const serializeRoutes = (routes: RouteRecordRawProp[]) => {
  routes = Object.values(routes);
  const routeQueue = [...routes];

  while (routeQueue.length) {
    const route = routeQueue.pop();
    if (route?.children) {
      route.children = Object.values(route.children);
      routeQueue.push(...(route.children as RouteRecordRawProp[]));
    }
  }

  return routes;
};

const getRoutes = (): RouteRecordRawProp[] => {
  let routeList: RouteRecordRawProp[] = [];
  const modules = getModules(),
    components = getComponents();

  for (const key in modules) {
    if (!components[key]) return [];

    const keyPathArr = key.split("/");
    const path = keyPathArr.slice(getKeyPathStartPos(keyPathArr) + 1, -1);

    let finalPath = path.join("/children/").split("/");

    const {
      name,
      isAutoRegisterRoute = true,
      dynamicRouteParams,
      redirectUri,
    } = components[key]?.default;

    if (isAutoRegisterRoute) {
      const templateRoute = {
        key: `${prefixStr}${path.join("-")}`,
        path: `/${path.join("/")}`,
        name: name,
        component: modules[key],
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
          console.error(components[key]?.default);
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
        console.log(redirectUri);
      }
      _.set(routeList, finalPath, templateRoute);
    }
  }

  return serializeRoutes(routeList);
};

export default getRoutes;
