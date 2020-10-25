Vue.component("modal-movimientos", {
    props: ["movimientos", "nombreActivo", "moneda"],
    methods: {
        confirmar() {
            $("#modalMovimientosId").modal("hide");
        },
        formatearMoneda(moneda) {
            return financiapp.service.moneda.formatear(moneda);
        }
    },
    template: `
        <div class="modal fade" id="modalMovimientosId" tabindex="-1" >
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">

                    <div class="modal-header">
                        <div class="modal-title row col">
                            <h5>Últimos movimientos de&nbsp;</h5><h5 class="text-info">{{nombreActivo}}</h5>
                        </div>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit.prevent>
                        <div class="modal-body">
                            <table class="table table-sm table-hover mb-0">
                                <thead class="thead-light">
                                    <tr class="text-center">
                                        <th>Fecha</th>
                                        <th>Tipo</th>
                                        <th>Monto</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="movimiento in movimientos">
                                        <td class="text-center">{{movimiento.fecha}}</td>
                                        <td class="text-left">{{movimiento.tipo}}</td>
                                        <td class="text-right">{{formatearMoneda(moneda)}}&nbsp;{{movimiento.monto}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary" @click="confirmar">Aceptar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        `

});
