import React, {Component} from 'react'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import DemoNavbar from './components/DemoNavbar';
import Summary from './views/Summary';
import Urlpage from './views/Urlpage'
import { createPortal } from 'react-dom';
class App extends Component {
  render(){
    return (
      <div>
        <DemoNavbar />
        {/* <Summary></Summary> */}
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Summary} />
            <Route exact path="/user" component={Summary} />
            <Route exact path="/urlpage" component={Urlpage} />
          </Switch>
        </BrowserRouter>,
      </div>
     
    );
  }
}
export default App;
