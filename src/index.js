import React from "react";
import ReactDOM from "react-dom";
import { nest } from "recompose";
import router, { history, subscribe } from "./router";
import Router, { render } from "./router-react";
import Layout from "./containers/Layout";
import Home from "./components/Home";
import PageOne from "./containers/PageOne";
import PageTwo from "./components/PageTwo";
import NotFound from "./components/NotFound";
import QueryStringTest from "./containers/QueryStringTest";
import arrayRouteParser from "./router-array-route-parser";

const routes = [
  "/",
  () => render(nest(Layout, Home)),

  "/page-one",
  () => render(nest(Layout, PageOne)),

  "/page-one/:one",
  params => render(nest(Layout, PageOne), params),

  "/page-one/:one/:two",
  params => render(nest(Layout, PageOne), params),

  "/page-two",
  () => render(nest(Layout, PageTwo)),

  "/query-string-test",
  () => render(nest(Layout, QueryStringTest)),

  "/redirect-to-page-one/:test",
  ({ test }) => history.push(`/page-one/${test}`),

  // TODO
  "",
  () => render(nest(Layout, NotFound)),
];

// Log route changes
subscribe(({ path, params }) => console.debug("route: ", { path, params }));

router(arrayRouteParser(routes));

ReactDOM.render(<Router />, document.getElementById("root"));
