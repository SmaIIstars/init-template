import type { RouteRecordRaw } from 'vue-router';

type RouteRecordRawProp = RouteRecordRaw & {
  key: string;
  topNav?: boolean;
};

export { RouteRecordRawProp };
