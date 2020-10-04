Vue.component("control-gasto", {
    props: ["sumatoriaGasto", "montoLimite"],
    methods: {
        editarLimite(limiteEditado) {
            this.$emit("editarLimite", limiteEditado);
        }
    },
    computed: {
        montoLimiteEsSuperado() {
            return this.sumatoriaGasto.gastoTotal > this.montoLimite;
        }
    },
    template: `
            <div class="row position-relative">
                <div class="col-md-3 p-4">
                    <img class="img-fluid" src="/fonts/ahorro.jpg">
                </div>
                <div class="col-md-5 position-static p-4">
                    <table class="table table-sm table-hover">
                        <tbody>
                            <tr>
                                <th scope="row" class="text-danger">Suma de gastos innecesarios</th>
                                <td class="text-right">$ {{sumatoriaGasto.gastoInnecesario}}</td>
                            </tr>
                            <tr>
                                <th scope="row" class="text-success">Suma de gastos necesarios</th>
                                <td class="text-right">$ {{sumatoriaGasto.gastoNecesario}}</td>
                            </tr>
                            <tr>
                                <th scope="row">Total</th>
                                <td class="text-right">$ {{sumatoriaGasto.gastoTotal}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-md-4 position-static p-4">
                    <div class="card bg-light">
                        <div class="card-body pb-3 pl-3 pr-3 pt-2">
                            <div class="row">
                                <h5 class="col card-title">Límite a gastar</h5>
                                <boton-editar-limite class="col-1 mr-2" :limite="montoLimite" @editarLimite="editarLimite"/>
                            </div>
                            <div class="row col">
                                <div>Monto límite: <b>$ {{montoLimite}}</b></div>
                                <i v-if="montoLimiteEsSuperado" class="text-warning col-2 mt-1 fa fa-exclamation-triangle" v-tooltip title="Monto límite superado"></i>
                            </div>
                            <barra-progreso :tope="montoLimite" :actual="sumatoriaGasto.gastoTotal" :color="'bg-danger'"/>
                        </div>
                    </div>
                </div>
            </div>
        `
});