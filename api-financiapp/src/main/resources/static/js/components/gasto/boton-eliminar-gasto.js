Vue.component("boton-eliminar-gasto", {
    props: ["gasto"],
    methods: {
        verModalEliminacionGasto() {
            this.$emit("verModalEliminacionGasto", this.gasto);
        }
    },
    template: `
        <div>
            <a class="fa-clickable" v-tooltip title="Eliminar gasto" @click="verModalEliminacionGasto"  data-target="#modalEliminacionGastoId">
                <i class="fa fa-trash text-danger"></i>
            </a>
        </div>
    `
});