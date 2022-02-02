import { Route, Switch } from "react-router-dom";
import { AnimePage } from "../pages/Animes";
import { Home } from "../pages/Home";
import { HomeTeste } from "../pages/HomeTeste";
import { Search } from "../pages/Search";

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/homeTeste" component={HomeTeste} />
      <Route path="/animepage/:id" component={AnimePage} />
      <Route path="/search/:id" component={Search} />
    </Switch>
  );
};
