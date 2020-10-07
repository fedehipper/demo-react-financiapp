import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar } from 'react-bootstrap';
import logoFinanciap from './img/logo.png';
import AppRouter from './navigation/AppRouter';

function Layout(props) {
  return <div>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home"><img src={logoFinanciap} width="30" height="30" alt='' /> Financiapp</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="mi-cartera">Mi cartera</Nav.Link>
          <Nav.Link href="mis-gastos">Mis gastos</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <div className='container-fluid col-10' >
      <AppRouter />
    </div>
  </div>
}


function App() {
  return <div className="App">
    <header className="App-header">
      <Layout />
    </header>
  </div >
}

export default App;
