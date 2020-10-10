
import service from './service.js';

export default {
    buscarCarteraActivos: () => {
        return service.get("http://localhost:8097/api/cartera");
    }
};