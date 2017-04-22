import React from "react";

function PageOne({ router: { Link } }) {
  return (
    <div>
      <h1>Page One</h1>
      <Link href="/page-two">Another link to page two!</Link>
    </div>
  );
}

export default PageOne;
