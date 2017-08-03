import qs from 'qs';
import { compose, withProps } from 'recompose';
import { withRouter } from '../router/router-react';
import QueryStringTest from '../components/QueryStringTest';

export default compose(
  withRouter,
  withProps(({ router }) => ({
    query: qs.parse(router.location.search.substr(1)),
  })),
)(QueryStringTest);
