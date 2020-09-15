Vue.component("modal-editar-limite", {
    props: ["limite", "modalId"],
    data: function () {
        return {
            montoLimite: this.limite
        };
    },
    methods: {
        confirmar() {
            this.$emit("limiteEditado", this.montoLimite);
            $("#" + this.modalId).modal("hide");
        },
        actualizarMontoLimite() {
            this.montoLimite = this.limite;
        }
    },
    watch: {
        limite() {
            this.actualizarMontoLimite();
        }
    },
    template: `
        <div class="modal fade" :id="modalId" tabindex="-1" >
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content" @keyup.esc="resetear">

                    <div class="modal-header">
                        <h5 class="modal-title">Nuevo límte mensual</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="actualizarMontoLimite">
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
                                            v-model="montoLimite"
                                            placeholder="Monto límite">
                                    </div>
                                     
                                </div>
                            </div>
    
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="actualizarMontoLimite">Cancelar</button>
                            <button type="submit" class="btn btn-primary">Aceptar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>       
        `
});
