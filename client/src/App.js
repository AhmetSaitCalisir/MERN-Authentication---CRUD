import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import CreateCustomer from "./pages/CreateCustomer";
import Customers from "./pages/Customers";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UpdateCustomer from "./pages/UpdateCustomer";

const App = () => {
  return (
    <Router>
      <div className="container-fluid">
        <Navbar />
        <Route path="/" exact component={Home} />
        <Route path="/customers" exact component={Customers} />
        <Route path="/createcustomer" component={CreateCustomer} />
        <Route path="/updatecustomer/:id" component={UpdateCustomer} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </div>
    </Router>
  );
};

export default App;
