import { withRouter } from "../router-react";
import qs from "qs";
import QueryStringTest from "../components/QueryStringTest";

function mapRouterProps(router) {
  return {
    ...router,
    query: qs.parse(location.search.substr(1)),
  };
}

export default withRouter(mapRouterProps)(QueryStringTest);
