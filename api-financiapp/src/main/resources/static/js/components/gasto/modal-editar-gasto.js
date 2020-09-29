Vue.component("modal-editar-gasto", {
    props: ["gasto"],
    data: function () {
        return {
            fecha: this.gasto.fecha,
            concepto: this.gasto.concepto,
            valor: this.gasto.valor
        };
    },
    methods: {
        desplegarDatePicker() {
            $("#datepicker").datepicker({
                uiLibrary: 'bootstrap4'
            });
        },
        confirmar() {
            var gastoEditado = {
                fecha: this.fecha,
                concepto: this.concepto,
                valor: this.valor,
                id: this.gasto.id
            };
            this.$emit("gastoEditado", gastoEditado);
            $("#modalEdicionGastoId").modal("hide");
        },
        resetearOriginales() {
            this.fecha = "";
            this.concepto = "";
            this.valor = "";
        }
    },
    watch: {
        gasto() {
            this.fecha = this.gasto.fecha;
            this.concepto = this.gasto.concepto;
            this.valor = this.gasto.valor;
        }
    },
    template: `
        <div class="modal fade" id="modalEdicionGastoId" tabindex="-1" >
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content" @keyup.esc="resetear">

                    <div class="modal-header">
                        <h5 class="modal-title">Editar gasto</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="resetearOriginales">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit="confirmar" @submit.prevent>
                        <div class="modal-body">
                            <div class="mb-2 text-left">
                                <label>Concepto</label>
                                <input 
                                    type="text"
                                    maxlength="25"
                                    class="form-control"
                                    required
                                    v-model="concepto"
                                    placeholder="Nombre del concepto">
                            </div>
                            <div>
                                <label>Monto</label>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">$</span>
                                    </div>
                                    <input 
                                        type="number" step=0.01
                                        maxlength="10"
                                        min="0" max="999999999999999"
                                        class="form-control"
                                        required
                                        v-model="valor"
                                        placeholder="Monto pagado">
                                </div>
                            </div>
                            <div class="mb-3">
                                <label>Fecha</label>
                                <datepicker 
                                    v-model="fecha"
                                    :placeholder="fecha"
                                    required>
                                </datepicker>
                            </div> 
    
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="resetearOriginales">Cancelar</button>
                            <button type="submit" class="btn btn-primary">Aceptar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>       
        `
});
