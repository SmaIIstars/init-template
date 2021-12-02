import { Module } from 'vuex';
import { ITemplateState } from './types';
import { IRootState } from '../types';

const templateModule: Module<ITemplateState, IRootState> = {
  namespaced: true,
  state() {
    return {
      name: 'templateName',
      age: 18,
    };
  },
  getters: {},
  mutations: {},
  actions: {},
};

export default templateModule;
