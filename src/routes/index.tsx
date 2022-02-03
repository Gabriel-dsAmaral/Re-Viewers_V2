<<<<<<< HEAD
import { Route, Switch } from "react-router-dom";
import { AboutUs } from "../pages/AboutUs";
import { AnimePage } from "../pages/Animes";
import { Home } from "../pages/Home";
import { HomeTeste } from "../pages/HomeTeste";
import { Search } from "../pages/Search";
import { User } from "../pages/User";
=======
import { Route, Switch } from 'react-router-dom'
import { AnimePage } from '../pages/Animes'
import { Devs } from '../pages/Devs'
import { Home } from '../pages/Home'
import { HomeTeste } from '../pages/HomeTeste'
import { Search } from '../pages/Search'
import { User } from '../pages/User'
>>>>>>> 26838799943098e9dba0d7c9fde52e686b204f61

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/homeTeste" component={HomeTeste} />
      <Route exact path="/animepage/:id" component={AnimePage} />
      <Route exact path="/search/:id" component={Search} />
      <Route exact path="/user" component={User} />
<<<<<<< HEAD
      <Route exact path="/devs" component={Devs} />
=======
      <Route exact path="/aboutUs" component={AboutUs} />
>>>>>>> cd9814940ec8dd72d5eb208abe57b06d56836624
    </Switch>
  )
}
