import { createStore, useStore as vuexUseStore } from "vuex";
import template from "./template";

// type
import { Store } from "vuex";
import { IRootState, IStoreType } from "./types";

const store = createStore<IRootState>({
  state() {
    return {};
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: { template },
});

export const useStore = (): Store<IStoreType> => {
  return vuexUseStore();
};

export default store;
