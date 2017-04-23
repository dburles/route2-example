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

const routes = [
  /^\/$/,
  () => render(nest(Layout, Home)),

  /^\/page-one$/,
  () => render(nest(Layout, PageOne)),

  /^\/page-one\/(\w+)$/,
  () => render(nest(Layout, PageOne)),

  /^\/page-one\/(\w+)\/(\w+)$/,
  () => render(nest(Layout, PageOne)),

  /^\/page-two$/,
  () => render(nest(Layout, PageTwo)),

  // /^\/page-one\/(\w+)\/(\w+)$/,
  // ([, one, two]) => console.log("one with params:", { one, two }),

  /^\/query-string-test.*$/,
  () => render(nest(Layout, QueryStringTest)),

  /^\/redirect-to-page-one\/(\w+)$/,
  ([, test]) => history.push(`/page-one/${test}`),

  // /^\/redirect-to-page-one\/(\w+)$/,
  // ([, test]) => console.log(test),

  /.*/,
  () => render(nest(Layout, NotFound)),
];

// Log route changes
subscribe(params => console.debug("route: ", params));

router(routes);

ReactDOM.render(<Router />, document.getElementById("root"));
