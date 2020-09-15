Vue.component("modal-alta-activo", {
    props: ["tipoMonedas"],
    data: function () {
        return {
            nombreActivo: "",
            montoInvertido: "",
            moneda: ""
        };
    },
    mounted() {
        this.resetear();
    },
    methods: {
        confirmar() {
            var activo = {
                nombre: this.nombreActivo,
                monto: this.montoInvertido,
                moneda: this.moneda
            };
            this.$emit("activoNuevo", activo);
            this.nombreActivo = "";
            this.montoInvertido = "";
            $("#altaActivo").modal("hide");
        },
        resetear() {
            this.nombreActivo = "";
            this.montoInvertido = "";
            this.moneda = "ARS";
        }
    },
    created() {
        this.moneda = "ARS";
    },
    template: `
        <div class="modal fade" id="altaActivo" tabindex="-1" >
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content" @keyup.esc="resetear">

                    <div class="modal-header">
                        <h5 class="modal-title">Nuevo activo</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="resetear">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit="confirmar" @submit.prevent>
                        <div class="modal-body">
                                <div class="row">
                                    <div class="col mb-2">
                                        <label>Nombre</label>
                                        <input 
                                            type="text"
                                            maxlength="15"
                                            class="form-control"
                                            required
                                            v-model="nombreActivo">
                                    </div>
                                </div>
                                <div class="row mt-3" id="inputMonto">
                                    <div class="col-3">
                                        <label for="formularioMonedas">Moneda</label>
                                        <select class="form-control" v-model="moneda">
                                            <option 
                                                v-for="tipoMoneda in tipoMonedas" :value="tipoMoneda">{{tipoMoneda}}
                                            </option>
                                        </select>
                                    </div>    
                                    <div class="col-9">
                                        <label>Monto</label>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">$</span>
                                            </div>
                                            <input 
                                                type="number" step=0.01 
                                                class="form-control" 
                                                required
                                                min="0" max="999999999999999"
                                                v-model="montoInvertido">
                                        </div>
                                    </div>
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
