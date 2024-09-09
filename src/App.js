import {BrowserRouter as Router,Route,Redirect} from "react-router-dom";
import NewPlaces from "./places/pages/NewPlaces";
import { Switch } from "react-router-dom/cjs/react-router-dom";
import Users from "./user/pages/Users";
import MainNavigtion from "./shared/components/Navigation/MainNavigtion";
import UserPlaces from "./places/pages/UserPlaces";
const App=()=> {
  return (
    <Router>
      <MainNavigtion/>
   <main>
   <Switch>
    <Route path="/" exact>
    <Users/>
    </Route>
    <Route path="/places/new" exact>
    <NewPlaces/>
    </Route>
    <Route path="/:userId/places" exact>
    <UserPlaces/>
    </Route>
    <Redirect to="/"/>
    </Switch>
   </main>
    </Router>
  )
}
;
export default App;