Vue.component("boton-editar-meta", {
    props: ["meta"],
    data: function () {
        return {
            modalId: ""
        };
    },
    methods: {
        verModal() {
            $("#" + this.modalId).modal();
        },
        editarMeta(metaEditada) {
            this.$emit("editarMeta", metaEditada);
        }
    },
    created() {
        this.modalId = this.meta.tipoMoneda + "-edicion-meta";
    },
    template: `
        <div>
            <a class="fa-clickable" v-tooltip title="Editar meta a superar" @click="verModal">
                <i class="fa fa-edit text-primary"></i>
            </a>
            <modal-editar-meta :meta="meta" :modalId="modalId" @metaEditada="editarMeta"/>
        </div>
    `
});