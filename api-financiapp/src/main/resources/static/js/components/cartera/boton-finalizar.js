Vue.component("boton-finalizar", {
    props: ["idActivo"],
    methods: {
        rescateTotalInversion(idActivo) {
            this.$emit("rescateTotalInversion", idActivo);
        },
        rescateParcial(activoId, monto) {
            this.$emit("rescateParcial", activoId, monto);
        },
        verModal() {
            $("#" + this.idActivo).modal("show");
        }
    },
    template: `
       
        <div>
            <a  class="fa-clickable" @click="verModal" v-tooltip title="Rescatar">
                <i class="fa fa-arrow-down text-danger"></i>
            </a>
            <confirmacion-eliminar @rescateTotalInversion="rescateTotalInversion" @rescateParcial="rescateParcial" :idActivo="idActivo"/>
        </div>
    `

});