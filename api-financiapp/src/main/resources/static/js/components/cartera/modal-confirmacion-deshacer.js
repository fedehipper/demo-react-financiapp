Vue.component("modal-confirmacion-deshacer", {
    props: ["modalId"],
    methods: {
        confirmar() {
            this.$emit("confirmarDeshacer");
            $("#" + this.modalId).modal("hide");
        }
    },
    template: `
        <div class="modal fade" :id="modalId" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">

                    <div class="modal-header">
                        <h5 class="modal-title">Deshacer actualización</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit="confirmar" @submit.prevent>
                        <div class="modal-body text-center mb-3">
                            Estás seguro que querés deshacer la actualización del monto?
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
