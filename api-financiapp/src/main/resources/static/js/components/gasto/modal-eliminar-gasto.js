Vue.component("modal-eliminar-gasto", {
    props:["gasto"],
    methods: {
        confirmar() {
            this.$emit("confirmarEliminacion", this.gasto.id);
            $("#modalEliminacionGastoId").modal("hide");
        }
    },
    template: `
        <div class="modal fade" id="modalEliminacionGastoId" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">

                    <div class="modal-header">
                        <h5 class="modal-title">Eliminar gasto</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit="confirmar" @submit.prevent>
                        <div class="modal-body text-center">
                            <p>Estás seguro que querés eliminar el gasto
                            <strong>{{gasto.concepto}}</strong>?</p>
                            <p class="text-info">Se eliminarán todas las cuotas perteneciente al mismo.</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                            <button type="submit" class="btn btn-danger">Aceptar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        `
});
