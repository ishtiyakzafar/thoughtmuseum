import React, { lazy } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { renderRoutes } from "./config/routes";

const Layout = lazy(() => import("./components/layout/Layout"));

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {renderRoutes.map(([key, route]) => {
          return (
            <route.type
              key={key}
              exact
              render={() => (
                <Layout>
                  <route.component {...route.props} />
                </Layout>
              )}
              path={route.path}
            />
          );
        })}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
