import React ,{Component}from "react";
import { Link, useLocation } from "react-router-dom";

import { Nav,Navbar,Button,Form,FormControl } from 'react-bootstrap'

class DemoNavbar extends Component {
 
    render(){
      return (
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">요기어때 : News_Summarizer</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/user">User News summarizer</Nav.Link>
            <Nav.Link href="/urlpage">URL News summarizer</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar>
        );
    }
  }
  export default DemoNavbar;