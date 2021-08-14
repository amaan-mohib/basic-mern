import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Discussion from "./components/Discussion";
import Home from "./components/Home";
import Login, { Register } from "./components/Login";
import AuthProvider from "./contexts/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/t/:id" component={Discussion} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
