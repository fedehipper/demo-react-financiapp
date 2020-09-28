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
    },
    buscarMesesDisponiblesPorAnio: (anio) => {
        return service.get('http://localhost:8097/api/comboMes?anio=' + anio);
    },
    crearGasto: (gasto) => {
        return service.post('http://localhost:8097/api/gasto', gasto);
    },
    eliminarGastoPorId: (gastoId) => {
        return service.delete('http://localhost:8097/api/gasto/' + gastoId);
    }
};