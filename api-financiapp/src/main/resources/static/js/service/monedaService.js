financiapp.service.moneda = (function () {

    function formatear(tipoMoneda) {
        return tipoMoneda === "ARS" ? "$" : tipoMoneda;
    }

    return {
        formatear: formatear
    };

})();