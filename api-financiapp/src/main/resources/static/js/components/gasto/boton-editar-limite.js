Vue.component("boton-editar-limite", {
    props: ["limite"],
    data: function () {
        return {
            modalId: ""
        };
    },
    methods: {
        verModal() {
            $("#" + this.modalId).modal();
        },
        editarLimite(limiteEditado) {
            this.$emit("editarLimite", limiteEditado);
        }
    },
    created() {
        this.modalId = "edicion-limite";
    },
    template: `
        <div>
            <a class="fa-clickable" v-tooltip title="Editar meta a superar" @click="verModal">
                <i class="fa fa-edit text-primary"></i>
            </a>
            <modal-editar-limite :limite="limite" :modalId="modalId" @limiteEditado="editarLimite"/>
        </div>
    `
});