import _ from "lodash";
import { DefineComponent } from "vue";
import { RouteRecordRawProp } from "@/router/types";
import { prefixStr } from "./constants";
import { getKeyPathStartPos } from "./utils";

type CustomComponent = DefineComponent & {
  name?: string;
  isAutoRoute?: boolean;
  dynamicRouteParams?: string[];
  redirectUri?: string;
};

const blackRouterList: string[] = ["test", "v-template"];

const routerFilter = (keyPath: string) => {
  const keyPathArr = keyPath.split("/");
  const fileName = keyPathArr.slice(getKeyPathStartPos(keyPathArr) + 1, -1)[0];
  return blackRouterList.includes(fileName);
};

const getModules = () => {
  // pages下的.vue文件
  const components = import.meta.glob("../../pages/**/*.vue");
  let res: Record<string, () => Promise<{ [key: string]: CustomComponent }>> =
    {};
  for (const key in components) {
    if (!routerFilter(key) && !key.includes("components")) {
      Reflect.set(res, key, components[key]);
    }
  }
  return res;
};

const getComponents = () => {
  const components = import.meta.globEager("../../pages/**/*.vue");
  let res: Record<string, { [key: string]: CustomComponent }> = {};
  for (const key in components) {
    if (!key.includes("components")) {
      Reflect.set(res, key, components[key]);
    }
  }
  return res;
};

/**
 * 对 routes 进行序列化
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
    const keyPathArr = key.split("/");
    const path = keyPathArr.slice(getKeyPathStartPos(keyPathArr) + 1, -1);

    let finalPath = path.join("/children/").split("/");

    const component = components[key]?.default,
      { name, isAutoRoute = true, dynamicRouteParams, redirectUri } = component;

    // 是否需要自动注册
    if (isAutoRoute) {
      const templateRoute = {
        key: `${prefixStr}${path.join("-")}`,
        path: `/${path.join("/")}`,
        name: name,
        component: modules[key],
      };

      // 动态路由
      if (dynamicRouteParams?.length) {
        templateRoute.path = `/${path.join("/")}/:${dynamicRouteParams.join(
          "/:"
        )}`;
      }

      if (redirectUri) {
        const rePath = `/${path.join("/")}/${redirectUri}`;
        Reflect.set(templateRoute, "redirect", rePath);
      }

      // lodash的set方法不能直接向数组加值，需要对routes进行序列化
      _.set(routeList, finalPath, templateRoute);
    }
  }

  return serializeRoutes(routeList);
};

export default getRoutes;
