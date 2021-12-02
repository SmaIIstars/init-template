import { App, Plugin } from "vue";
import Arco, {
  Button,
  Layout,
  ConfigProvider,
  Empty,
  Menu,
  Avatar,
  Dropdown,
} from "ant-design-vue";

const components: { [key: string]: Plugin } = {
  Button,
  Layout,
  ConfigProvider,
  Empty,
  Menu,
  Avatar,
  Dropdown,
};

/**
 * antdv注册
 * @param app
 * @param global 是否全局注册，默认按需引入
 */
const registerAntdv = (app: App<Element>, global = false): void => {
  if (global) app.use(Arco);
  else {
    Object.keys(components)?.forEach((key: string) => {
      app.use(components[key]);
    });
  }
};

export default registerAntdv;
