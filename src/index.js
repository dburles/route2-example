import React from "react";
import ReactDOM from "react-dom";
import { nest } from "recompose";
import router, { history } from "./router";
import Layout from "./containers/Layout";
import Home from "./components/Home";
import PageOne from "./containers/PageOne";
import PageTwo from "./components/PageTwo";
import NotFound from "./components/NotFound";
import QueryStringTest from "./containers/QueryStringTest";

function render(Component) {
  ReactDOM.render(<Component />, document.getElementById("root"));
}

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

  /^\/query-string-test$/,
  () => render(nest(Layout, QueryStringTest)),

  /^\/redirect-to-page-one\/(\w+)$/,
  ([, test]) => history.push(`/page-one/${test}`),

  /.*/,
  () => render(nest(Layout, NotFound)),
];

router(routes);
