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
    },
    editarGasto: (gasto) => {
        return service.put('http://localhost:8097/api/gasto/' + gasto.id, gasto);
    },
    buscarGraficoGastos: (anio, mes) => {
        return service.get('http://localhost:8097/api/gastoBurnUp?anio=' + anio + '&mes=' + mes);
    },
    buscarSumatoriaGastos: (anio, mes) => {
        return service.get('http://localhost:8097/api/gasto/total?anio=' + anio + '&mes=' + mes);
    },
    buscarMontoMensualEstimado: (anio, mes) => {
        return service.get('http://localhost:8097/api/montoMensualEstimado?anio=' + anio + '&mes=' + mes);
    }
};