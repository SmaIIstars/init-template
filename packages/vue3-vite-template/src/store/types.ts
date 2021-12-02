import { ITemplateState } from "./template/types";
type IStoreType = IRootState & IRootWithModule;

interface IRootState {
  [key: string]: any;
}

interface IRootWithModule {
  template: ITemplateState;
}

export { IStoreType, IRootState, IRootWithModule };
