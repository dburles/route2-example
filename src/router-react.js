import React, { Component } from "react";
import { history, subscribe, getRouteParams } from "./router";

function handleLink(href) {
  return function(event) {
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
            params: getRouteParams(window.location.pathname),
          }),
        });
      }
    };
  };
}
