Vue.component("activos", {
    props: ["detalles"],
    methods: {
        editarMeta(metaEditada) {
            this.$emit("editarMeta", metaEditada);
        }
    },
    template: `
        <div>                 
            <div v-for="detalle in detalles" class="row position-relative">
                <div v-if="detalle.tipoMoneda === 'ARS'" class="col-md-3 p-4">
                    <p>Peso argentino</p>
                    <img src="/fonts/pesos.jpg" class="img-fluid">
                </div>
                <div v-else class="col-md-3 p-4">
                    <p>Dólar estadounidense</p>
                    <img class="img-fluid" src="/fonts/dolares.jpg">
                </div>
                
                <div class="col-md-5 position-static p-4 mt-3">
                    <table class="table table-sm table-hover mt-4">
                        <tbody>
                            <tr>
                                <th scope="row">Monto invertido</th>
                                <td class="text-right">{{detalle.montoInicial}} {{detalle.tipoMoneda === 'ARS' ? '$' : detalle.tipoMoneda}}</td>
                            </tr>
                            <tr>
                                <th scope="row">Monto al día</th>
                                <td class="text-right">{{detalle.montoActual}} {{detalle.tipoMoneda === 'ARS' ? '$' : detalle.tipoMoneda}}</td>
                            </tr>
                            <tr>
                                <th scope="row">Variación parcial</th>
                                <td class="text-right">{{detalle.gananciaParcial}} {{detalle.tipoMoneda === 'ARS' ? '$' : detalle.tipoMoneda}}</td>
                            </tr>
                            <tr>
                                <th scope="row">Ganancia total</th>
                                <td class="text-right">{{detalle.gananciaTotal}} {{detalle.tipoMoneda === 'ARS' ? '$' : detalle.tipoMoneda}}</td>
                            </tr>
                        </tbody>
                </table>
                </div>
                <div class="col-md-4 position-static p-4 mt-3">
                    <div class="card bg-light mt-4">
                        <div class="card-body pb-3 pl-3 pr-3 pt-2">
                            <div class="row">
                                <h5 class="col card-title">Ganancia deseada</h5>
                                <boton-editar-meta class="col-1 mr-2" :meta="detalle.metaInversion" @editarMeta="editarMeta"/>
                            </div>
                            <div class="row">
                                <div class="col-10">Fecha límite: <b>{{detalle.metaInversion.fechaLimite ? detalle.metaInversion.fechaLimite : '-'}}</b></div>
                                <i v-if="detalle.metaInversion.fechaVencida" class="text-warning col-2 fa fa-exclamation-triangle" v-tooltip title="Fecha límite vencida"></i>
                            </div>
                            <div>Monto a superar: <b>{{detalle.metaInversion.montoASuperar ? detalle.metaInversion.montoASuperar : '-'}} {{detalle.tipoMoneda === 'ARS' ? '$': detalle.tipoMoneda}}</b></div>
                            <barra-progreso :tope="detalle.metaInversion.montoASuperar" :actual="detalle.gananciaTotal" :color="'bg-primary'"/>
                        </div>
                    </div>
                </div>
                <hr class="division suma-monedas mt-0 mb-0" v-if="detalle.tipoMoneda !== 'ARS'">
            </div>
        </div>
    `
});