import React from 'react';

function QueryStringTest({ query }) {
  return (
    <pre>
      {JSON.stringify(query)}
    </pre>
  );
}

export default QueryStringTest;
