import service from './service.js';

export default {
    buscarAnios: () => {
        return service.get("http://localhost:8097/api/comboAnio");
    },
    cambiarNecesidad: (gastoId) => {
        return service.put('http://localhost:8097/api/gasto/necesidad/' + gastoId);
    },
    buscarTodos: (anio, mes) => {
        return service.get('http://localhost:8097/api/gasto?anio=' + anio + '&mes=' + mes);
    }
};