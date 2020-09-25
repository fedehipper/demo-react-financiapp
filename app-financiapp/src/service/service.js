export default {
    get: (url) => {
        return fetch(url);
    },
    put: (url) => {
        const requestOptions = {
            method: 'PUT'
        };
        return fetch(url, requestOptions);
    }
};


// var feriadoService = {
//     obtenerPorAnio: async function (anio) {
//         const res = await fetch('http://localhost:3000/api/feriados/' + anio);
//         const feriados = await res.json();
//         return feriados;
//     }
// }
// export { feriadoService };