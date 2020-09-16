import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class FilaPersona extends Component {
    render() {
        return <tbody>
            <tr>
                <td>{this.props.personaARenderizar.nombre}</td>
                <td>{this.props.personaARenderizar.edad}</td>
            </tr>
        </tbody>
    }
}


class TablaPersona extends Component {
    constructor() {
        super();
        this.state = {
            personas: [
                {
                    id: 1,
                    nombre: "Federico",
                    edad: 21
                },
                {
                    id: 2,
                    nombre: "Carlos",
                    edad: 33
                },
                {
                    id: 3,
                    nombre: "Tony",
                    edad: 31
                }
            ]
        };
    }

    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Edad</th>
                    </tr>
                </thead>
                {
                    this.state.personas
                        .map(persona => <FilaPersona personaARenderizar={persona} key={persona.id} />)
                }
            </table>
        )
    }
}


export default TablaPersona;

