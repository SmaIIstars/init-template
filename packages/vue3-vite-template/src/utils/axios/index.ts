import BaseRequest from "./request";
import { TIME_OUT, INSTANCE_INTERCEPTORS } from "./config";

const defaultAxiosRequestConfig = {
  timeout: TIME_OUT,
};

// 若有多个baseURL,新建实例
// 请求实例

const baseRequest = new BaseRequest({
  ...defaultAxiosRequestConfig,
  interceptors: INSTANCE_INTERCEPTORS,
});

export default baseRequest;
