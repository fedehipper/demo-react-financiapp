Vue.component("boton-deshacer", {
    props:["activoId"],
    data: function() {
        return {
            modalId: "deshacer" + this.activoId
        };
    },
    methods: {
        deshacer() {
            this.$emit("deshacerMovimientoHoy");
        },
        verModal() {
            $("#" + this.modalId).modal();
        }
    },
    template: `
        <div>
            <modal-confirmacion-deshacer :modalId="modalId" @confirmarDeshacer="deshacer()"/>
            <a  class="fa-clickable" @click="verModal" v-tooltip title="Deshacer">
                <i class="fa fa-undo text-warning"></i>
            </a>
        </div>
    `
});