import template from "./template/constants";
interface IPath {
  template: typeof template;
}

// 只支持2层module结构
const serializePaths = <T>(name: string, module: T) => {
  const path = {};
  for (const k in module) {
    Reflect.set(path, k, `${name}/${module[k]}`);
  }
  return path as T;
};

// mutation等路径
const path: IPath = {
  template: serializePaths<typeof template>("template", template),
};

export default path;
