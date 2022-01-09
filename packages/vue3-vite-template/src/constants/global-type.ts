import { DefineComponent, ComponentOptionsWithoutProps } from "vue";

export type CustomComponentOptionsWithoutProps =
  ComponentOptionsWithoutProps & {
    name?: string;
    isAutoRegisterRoute?: boolean;
    dynamicRouteParams?: string[];
    redirectUri?: string;
  };
