import service from './service.js';

export default {
    buscarAnios: () => {
        return service.get("http://localhost:8097/api/comboAnio");
    }
};