Vue.component("modal-editar-meta", {
    props: ["meta", "modalId"],
    data: function () {
        return {
            fechaLimite: this.meta.fechaLimite,
            montoASuperar: this.meta.montoASuperar,
            tipoMoneda: this.meta.tipoMoneda
        };
    },
    methods: {
        desplegarDatePicker() {
            $("#datepicker").datepicker({
                uiLibrary: 'bootstrap4'
            });
        },
        confirmar() {
            var metaEditada = {
                fechaLimite: this.fechaLimite,
                montoASuperar: this.montoASuperar,
                tipoMoneda: this.tipoMoneda
            };
            this.$emit("metaEditada", metaEditada);
            $("#" + this.modalId).modal("hide");
        },
        resetearOriginales() {
            this.fechaLimite = this.meta.fechaLimite;
            this.montoASuperar = this.meta.montoASuperar;
            this.tipoMoneda = this.meta.tipoMoneda;
        }
    },
    template: `
        <div class="modal fade" :id="modalId" tabindex="-1" >
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content" @keyup.esc="resetearOriginales">

                    <div class="modal-header">
                        <h5 class="modal-title">Nueva meta a superar</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="resetearOriginales">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit="confirmar" @submit.prevent>
                        <div class="modal-body">
                               
                            <div class="row text-left">
                                <div class="col">
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
                                            v-model="montoASuperar">
                                    </div>
                                     
                                </div>
                                
                                <div class="col">
                                    <label>Fecha</label>
                                    <datepicker 
                                        v-model="fechaLimite"
                                        :placeholder="fechaLimite"
                                        required>
                                    </datepicker>
                                </div> 
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
