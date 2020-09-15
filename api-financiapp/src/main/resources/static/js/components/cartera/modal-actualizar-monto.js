Vue.component("actualizacion-monto", {
    props: ["idActivo", "montoActual", "accion", "titulo", "valorInput", "tituloInput"],
    data: function () {
        return {
            idModal: "",
            montoActualizado: this.valorInput
        };
    },
    methods: {
        confirmar() {
            this.$emit("actualizarMonto", this.idActivo, this.montoActualizado);
            $("#" + this.idModal).modal("hide");
        }
    },
    created() {
        this.idModal = this.idActivo + this.accion;
    },
    template: `
        <div class="modal fade" :id="idModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">

                    <div class="modal-header">
                        <h5 class="modal-title">{{titulo}}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit="confirmar" @submit.prevent>
                        <div class="modal-body">
                            <div class="col">
                                <div class="row">
                                    <label>{{tituloInput}}</label>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">$</span>
                                        </div>
                                        <input 
                                            type="number" step=0.01
                                            class="form-control" 
                                            required
                                            min="0" max="999999999999999"
                                            v-model="montoActualizado">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                            <button type="submit" class="btn btn-primary">Aceptar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
`
});
