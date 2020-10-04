import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import GastosView from './components/gastos/Gastos';

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
