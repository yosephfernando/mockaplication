import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import RouterComponent from "./component/RouterComponent";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

export default function App() {
  const[logged, setLogged] = useState({
    "username":"",
    "role": ""
  })

  useEffect(() => {
    if(localStorage.getItem("token") !== null){
      let decoded = jwt_decode(localStorage.getItem("token"))
      logged.username = decoded.email
      logged.role = decoded.role
      setLogged({...logged})
    }
  }, {...logged})

  const logOut = () => {
    localStorage.removeItem("token")
    window.location.reload()
  }

  return (
    <Router>
      <Navbar bg="secondary" expand="lg">
        <Container>
          <Navbar.Brand href="#home">EDII</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {(logged.role === "" || logged.role === null) ? <Link to="/login" style={{textDecoration: "none", color:"#000"}}>Sign in</Link>:""}
              {(logged.role !== "" && logged.role !== null && logged.role === "user" ) ?
                <Link to="/entry-biodata" style={{textDecoration: "none", color:"#000", padding: ".5rem 1rem", alignItems: "center",display: "flex"}}>Entry Biodata</Link>:""}
              {(logged.role !== "" && logged.role !== null) ?
                <Link to="/users-data" style={{textDecoration: "none", color:"#000", padding: ".5rem 1rem", alignItems: "center",display: "flex"}}>User Data</Link>:""}
              {(logged.role !== "" && logged.role !== null) ?
              <NavDropdown  id="dropdown-item-button" title={logged.username} style={{textDecoration: "none", color:"#000"}}>
                <NavDropdown.ItemText style={{cursor:"default"}}>Logged as {logged.role}</NavDropdown.ItemText>
                <NavDropdown.Item as="button" onClick={() => logOut()} style={{textDecoration: "none", color:"#000"}}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown >:""}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <Container>
        <RouterComponent logged={logged} />
      </Container>
    </Router>
  );
}
