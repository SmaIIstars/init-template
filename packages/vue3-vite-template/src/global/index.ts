import registerGlobalComponents from "./global-components";
import registerAntdvComponents from "./antdv";

// 请勿在此文件直接进行注册操作，创建对应的文件，在此处进行函数调用注册
import { App } from "vue";
/**
 * app挂在前的插件注册统一入口
 */
const beforeMountGlobalRegister = (): void => {
  //
};

/**
 * app挂在后的插件注册统一入口
 * @param app
 */
const mountedGlobalRegister = (app: App): void => {
  // global-components
  registerGlobalComponents(app);
  // antdv
  registerAntdvComponents(app);
};

export { beforeMountGlobalRegister, mountedGlobalRegister };
