Vue.component("boton-invertir-vigente", {
    props: ["idActivo"],
    data: function () {
        return {
            accion: "",
            titulo: "",
            placeholder: "",
            tituloInput: ""
        };
    },
    created() {
        this.accion = "inversion";
        this.titulo = "Invertir";
        this.placeholder = "Monto a adicionar al vigente";
        this.tituloInput = "Monto a adicionar";
    },
    methods: {
        invertirSobreVigente(idActivo, montoActualizado) {
            this.$emit("invertirSobreVigente", idActivo, montoActualizado);
        },
        verModal() {
            $("#" + this.idActivo + this.accion).modal("show");
        }
    },
    template: `
        <div>
            <a class="fa-clickable" @click="verModal" v-tooltip title="Invertir">
                <i class="fa fa-arrow-up text-primary"></i>
            </a>
            <actualizacion-monto 
                @actualizarMonto="invertirSobreVigente" 
                :accion="accion"
                :titulo="titulo"
                :placeholder="placeholder"
                :tituloInput="tituloInput"
                :idActivo="idActivo"/>
        </div>
    `
});

