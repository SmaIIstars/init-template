// 解决 vite 引包问题
import { App, DefineComponent } from 'vue';

const registerGlobalComponents = (app: App) => {
  const components: DefineComponent[] = Object.values(
    import.meta.globEager('../components/*/*.vue') as DefineComponent
  );

  components.forEach((c) => {
    app.component(c.default.name, c.default);
  });
};

export default registerGlobalComponents;
