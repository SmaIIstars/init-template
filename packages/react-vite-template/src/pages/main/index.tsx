import { memo } from "react";

import getRoutes from "@/utils/getAutoRoutes";

const Home = () => {
  const routes = getRoutes(["main"]);

  return (
    <>
      <h1>React Template</h1>
      <ul>
        {routes.map((route) => {
          return (
            <li key={route.key}>
              <a href={route.path}>{route.key}</a>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default memo(Home);
