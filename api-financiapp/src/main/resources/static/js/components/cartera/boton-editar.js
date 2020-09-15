Vue.component("boton-editar", {
    props: ["idActivo", "montoActual"],
    data: function () {
        return {
            accion: "",
            titulo: "",
            tituloInput: ""
        };
    },
    created() {
        this.accion = "actualizacion";
        this.titulo = "Actualizar monto";
        this.tituloInput = "Monto actual";
    },
    methods: {
        actualizarMonto(idActivo, montoActualizado) {
            this.$emit("actualizarMonto", idActivo, montoActualizado);
        },
        verModal() {
            $("#" + this.idActivo + this.accion).modal("show");
        }
    },
    template: `
        <div>
            <a class="fa-clickable" @click="verModal" v-tooltip title="Actualizar monto">
                <i class="fa fa-refresh text-secondary"></i>
            </a>
            <actualizacion-monto 
                @actualizarMonto="actualizarMonto" 
                :accion="accion" 
                :titulo="titulo"
                :valorInput="montoActual"
                :tituloInput="tituloInput"
                :idActivo="idActivo"/>
        </div>
    `
});