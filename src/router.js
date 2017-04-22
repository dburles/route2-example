let routes = [];
const subscriptions = [];

export function subscribe(fn) {
  subscriptions.push(fn);
  return function() {
    subscriptions.splice(subscriptions.indexOf(fn), 1);
  };
}

function getRoute(path) {
  let foundIndex = 0;
  const route = routes.find((r, i) => {
    if (r instanceof RegExp) {
      foundIndex = i;
      return r.test(path);
    }
    return false;
  });

  if (route) {
    const matches = route.exec(path);

    return {
      params: matches,
      fn: routes[foundIndex + 1],
    };
  }

  return undefined;
}

export function getRouteParams(path) {
  const route = getRoute(path);
  return route ? route.params : [];
}

function exec(path) {
  const route = getRoute(path);
  if (route) {
    route.fn(route.params);
  } else {
    console.error(`router: no match for ${path}`);
  }
}

function notify(path) {
  subscriptions.forEach(fn => fn(getRouteParams(path)));
  exec(path);
}

window.onpopstate = () => notify(window.location.pathname);

export const history = {
  push(path) {
    window.history.pushState({}, null, path);
    notify(path);
  },
};

export default function router(map) {
  routes = map;
  notify(window.location.pathname);
}
