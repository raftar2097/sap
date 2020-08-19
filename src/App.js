import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Repo from "./components/repo";
import Folder from "./components/folder";
import Document from "./components/document";
import Nav from 'react-bootstrap/Nav'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
class App extends Component {
  render() {
    return (
      <Router>
        
        <Nav justify variant="tabs" defaultActiveKey="/home">
          <Nav.Item>
            <Nav.Link href="/"><Link to="/">Repo</Link></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="/folder"> <Link to="/folder">New Folder</Link></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="/document"><Link to="/document">New Document</Link></Nav.Link>
          </Nav.Item>
        </Nav>
        <Jumbotron fluid>
          <Container>
            <h1>Workbench</h1>
            <p>
              This is a modified workbench that gives info about repo,create document and folders.
            </p>
          </Container>
        </Jumbotron>
          {/* <nav>
            <ul>
              <li>
                <Link to="/">Repo</Link>
              </li>
              <li>
                <Link to="/folder">New Folder</Link>
              </li>
              <li>
                <Link to="/document">New Document</Link>
              </li>
            </ul>
          </nav> */}
  
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/" exact>
            <Repo />
            </Route>
            <Route path="/folder" exact>
              <Folder />
            </Route>
            <Route path="/document" exact>
              <Document />
            </Route>
          </Switch>
      </Router>
    );
  }
}

export default App;