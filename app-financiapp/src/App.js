import React from 'react';
import './App.css';
import GastosView from './gastos/Gastos.js';

// class Formulario extends Component {
//   constructor() {
//     super();
//     this.state = {
//       inputName: "Nombre",
//       inputTerms: true
//     }
//   }

//   handleSubmit = (e) => {
//     e.preventDefault(); // para que no actualize la página
//     console.log(this.state);
//   }

//   render() {
//     return (
//       <div>
//         <h4>Formu</h4>
//         <form>
//           <p>
//             <label>Nombre:</label>
//             <input
//               id="name"
//               name="userName"
//               value={this.state.inputName}
//               // esto es para guardar el valor nuevo en el state de nombre
//               onChange={e => this.setState({ inputName: e.target.value })}
//             />
//           </p>
//           <p>
//             <label>
//               <input
//                 checked={this.state.inputTerms}
//                 onChange={e => this.setState({ inputTerms: e.target.checked })}
//                 type="checkbox"
//               />
//               Acepta los terminos y condiciones
//             </label>
//           </p>

//           <button onClick={this.handleSubmit}>Mandale</button>
//         </form>
//       </div>
//     )
//   }

// }



class Layout extends React.Component {
  render() {
    return (
      <div className='container'>{this.props.children}</div>
    );
  }
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
