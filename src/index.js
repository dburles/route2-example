import router, { subscribe } from "./router";

// Log route changes
subscribe(({ path, params }) => console.debug("route: ", { path, params }));

router(path => console.log(path));

// ReactDOM.render(<Router />, document.getElementById("root"));
