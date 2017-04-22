import React from "react";

function QueryStringTest({ router: { query } }) {
  return <pre>{JSON.stringify(query)}</pre>;
}

export default QueryStringTest;
