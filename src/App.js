import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './componets/Login'
import Home from './componets/Home'
import Jobs from './componets/Jobs'
import JobDetails from './componets/JobDetails'
import ProtectedRoute from './componets/ProtectedRoute'
import NotFound from './componets/NotFound'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobDetails} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
