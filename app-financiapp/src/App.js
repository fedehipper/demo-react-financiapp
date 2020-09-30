import React from 'react';
import './App.css';
import GastosView from './gastos/Gastos.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function Layout(props) {
  return (
    <div className='container-fluid col-10'>{props.children}</div>
  );
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Layout>
          <GastosView />
        </Layout>
      </header>
    </div>
  );
}

export default App;
