import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import GastosView from './components/gastos/Gastos';
import { Nav, Navbar } from 'react-bootstrap';
import logoFinanciap from './img/logo.png';

function Layout(props) {
  return <div>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home"><img src={logoFinanciap} width="30" height="30" alt='' /> Financiapp</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#miCartera">Mi cartera</Nav.Link>
          <Nav.Link href="#misGastos">Mis gastos</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <div className='container-fluid col-10'>{props.children}</div>
  </div>
}


function App() {
  return <div className="App">
    <header className="App-header">
      <Layout>
        <GastosView />
      </Layout>
    </header>
  </div>
}

export default App;
