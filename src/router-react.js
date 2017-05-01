import React, { Component } from "react";
import { history, subscribe, getRouteParams, setRouteParams } from "./router";

function handleLink(href) {
  return function(event) {
    if (
      !event.button === 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return;
    }
    event.preventDefault();
    history.push(href);
  };
}

export function Link({ href, children, ...props }) {
  return (
    <a {...props} href={href} onClick={handleLink(href)}>
      {children}
    </a>
  );
}

export function withRouter(mapRouterProps = router => router) {
  return function(WrappedComponent) {
    return class extends Component {
      constructor() {
        super();
        this.subscription = subscribe(() => this.setState({}));
      }

      componentWillUnmount() {
        this.subscription();
      }

      render() {
        return React.createElement(WrappedComponent, {
          ...this.props,
          router: mapRouterProps({
            Link,
            location: window.location,
            params: getRouteParams(),
          }),
        });
      }
    };
  };
}

let trigger = () => {};
let component = null;

export function render(C, params = {}) {
  component = C;
  setRouteParams(params);
  trigger();
}

export default class Router extends Component {
  constructor() {
    super();
    trigger = () => this.setState({});
  }

  render() {
    return React.createElement(component, { ...this.props });
  }
}
