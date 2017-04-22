let routes = [];
const subscriptions = [];

export function subscribe(fn) {
  subscriptions.push(fn);
  return function() {
    subscriptions.splice(subscriptions.indexOf(fn), 1);
  };
}

function notify() {
  subscriptions.forEach(fn => fn());
}

window.onpopstate = () => notify();

function getRoute() {
  let foundIndex = 0;
  const route = routes.find((r, i) => {
    if (r instanceof RegExp) {
      foundIndex = i;
      return r.test(location.pathname);
    }
    return false;
  });

  if (route) {
    const matches = route.exec(location.pathname);

    return {
      params: matches,
      fn: routes[foundIndex + 1],
    };
  }

  return undefined;
}

export function getRouteParams() {
  const route = getRoute();
  return route ? route.params : {};
}

function exec() {
  const route = getRoute();
  if (route) {
    route.fn(route.params);
  } else {
    console.error(`router: no match for ${location.pathname}`);
  }
}

export const history = {
  push(path) {
    window.history.pushState({}, null, path);
    notify();
  },
};

export default function router(map) {
  routes = map;
  notify();
}

subscribe(exec);
