import RouteParser from "route-parser";

const routes = [];

function getRoute(path) {
  const route = routes.find(r => r.path.match(path));
  if (route) {
    return {
      ...route,
      params: route.path.match(path),
    };
  }
  return undefined;
}

export default function arrayRouteParser(_routes) {
  _routes.forEach((r, i) => {
    if (typeof r === "string") {
      routes.push({
        path: new RouteParser(_routes[i]),
        fn: _routes[i + 1],
      });
    }
  });

  console.log(routes);

  return function(path) {
    const route = getRoute(path);
    if (route) {
      route.fn(route.params);
    } else {
      console.error(`router: no match for ${path}`);
    }
  };
}
