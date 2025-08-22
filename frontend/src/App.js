import {BrowserRouter, Switch, Route} from "react-router-dom"

import Recipes from "./components/Recipes"
import Home from "./components/Home";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/api/recipes" component={Recipes} />
    </Switch>
  </BrowserRouter>
)

export default App;
