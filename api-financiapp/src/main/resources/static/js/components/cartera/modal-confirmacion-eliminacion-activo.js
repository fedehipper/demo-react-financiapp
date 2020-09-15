Vue.component("confirmacion-eliminar", {
    props: ["idActivo"],
    data: function () {
        return {
            rescate: "",
            montoARescatar: ""
        };
    },
    mounted() {
        this.resetear();
    },
    methods: {
        confirmar() {
            if (this.rescate === "total") {
                this.$emit("rescateTotalInversion", this.idActivo);
            } else {
                this.$emit("rescateParcial", this.idActivo, this.montoARescatar);
            }
            $("#" + this.idActivo).modal("hide");
            this.resetear();
        },
        resetear() {
            this.rescate = "";
            this.montoARescatar = "";
        }
    },
    computed: {
        idRadioTotal() {
            return "radioTotal" + this.idActivo;
        },
        idRadioParcial() {
            return "radioRescateParcial" + this.idActivo;
        }
    },
    template: `
        <div class="modal fade" :id="idActivo" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content" @keyup.esc="resetear">

                    <div class="modal-header">
                        <h5 class="modal-title">Rescatar monto</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="resetear">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit="confirmar" @submit.prevent>
                        <div class="modal-body">
                            <div class="text-left mb-3">
                                Seleccione el modo de rescate
                            </div>
                            <div class="row mb-3">
                                <div class="col form-check">
                                    <input 
                                        class="form-check-input fa-clickable" 
                                        v-model="rescate" 
                                        type="radio" 
                                        name="gridRadios" 
                                        :id="idRadioTotal"
                                        v-tooltip
                                        title="Se elimina el activo de la tabla" 
                                        value="total" 
                                        required>
                                    <label class="form-check-label fa-clickable" :for="idRadioTotal">
                                        Total
                                    </label>
                                </div>
                                <div class="col form-check">
                                    <input 
                                        class="form-check-input fa-clickable" 
                                        v-model="rescate" 
                                        type="radio"
                                        name="gridRadios"
                                        :id="idRadioParcial"
                                        v-tooltip
                                        title="Se descuenta al monto actual"
                                        required
                                        value="parcial">
                                    <label class="form-check-label fa-clickable" :for="idRadioParcial">
                                        Parcial
                                    </label>
                                </div>
                            </div>
                            <div class="input-group mb-3" v-if="rescate === 'parcial'">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">$</span>
                                </div>
                                <input 
                                    type="number" step=0.01
                                    class="form-control" 
                                    required
                                    min="0" max="999999999999999"
                                    v-model="montoARescatar">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="resetear">Cancelar</button>
                            <button type="submit" class="btn btn-primary">Aceptar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        `
});
