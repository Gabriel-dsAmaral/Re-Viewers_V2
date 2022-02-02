import { Switch } from 'react-router-dom'
import { AnimePage } from '../pages/Animes'
import { Home } from '../pages/Home'
import { HomeTeste } from '../pages/HomeTeste'
import { Search } from '../pages/Search'
import { Route } from './Route'

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/homeTeste" component={HomeTeste} isPrivate />
      <Route exact path="/animepage/:id" component={AnimePage} />
      <Route exact path="/search/:id" component={Search} />
    </Switch>
  )
}
