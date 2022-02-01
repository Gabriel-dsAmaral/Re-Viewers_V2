import { Route, Switch } from "react-router-dom";
import { AnimePage } from "../pages/Animes";
import { Home } from "../pages/Home";
import { HomeTeste } from "../pages/HomeTeste";

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/homeTeste" component={HomeTeste} />
      <Route exact path="/animepage/:id" component={AnimePage} />
    </Switch>
  );
};
