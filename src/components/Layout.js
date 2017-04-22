import React from "react";

const activeStyle = {
  color: "red",
};

function Layout({ router: { Link, params, location }, children }) {
  return (
    <div>
      <h3>Router</h3>
      <pre>params: {JSON.stringify(params)}</pre>
      <ul>
        <li>
          <Link href="/" style={location.pathname === "/" ? activeStyle : {}}>
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/page-one"
            style={location.pathname === "/page-one" ? activeStyle : {}}
          >
            Page One
          </Link>
        </li>
        <li>
          <Link
            href="/page-one/a/b"
            style={
              new RegExp("/page-one/.*").test(location.pathname)
                ? activeStyle
                : {}
            }
          >
            Page One (with params)
          </Link>
        </li>
        <li>
          <Link
            href="/page-two"
            style={location.pathname === "/page-two" ? activeStyle : {}}
          >
            Page Two
          </Link>
        </li>
        <li>
          <Link
            href="/query-string-test?a=foo&b=2&c=bar"
            style={
              new RegExp("/query-string-test?.*").test(location.pathname)
                ? activeStyle
                : {}
            }
          >
            Query String Test
          </Link>
        </li>
        <li>
          <Link href="/redirect-to-page-one/redirected">
            Redirect to Page One (with params)
          </Link>
        </li>
        <li><Link href="/askfjaslkj">404</Link></li>
      </ul>
      <hr />
      {children}
    </div>
  );
}

export default Layout;
