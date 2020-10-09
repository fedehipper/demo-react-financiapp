import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Cartera from "../components/cartera/CarteraView";
import GastosView from "../components/gastos/GastosView";

function MiCartera() {
    return <Cartera />;
}

function MisGastos() {
    return <GastosView />;
}

function AppRouter(props) {
    return <Router>
        <Route path="/" exact component={MiCartera} />
        <Route path="/mi-cartera/" component={MiCartera} />
        <Route path="/mis-gastos/" component={MisGastos} />
    </Router>
}

export default AppRouter;