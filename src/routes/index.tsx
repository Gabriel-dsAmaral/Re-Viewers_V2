import { Route, Switch } from "react-router-dom";
import { AnimePage } from "../pages/Animes";
import { Home } from "../pages/Home";

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/animepage" component={AnimePage} />
    </Switch>
  );
};
