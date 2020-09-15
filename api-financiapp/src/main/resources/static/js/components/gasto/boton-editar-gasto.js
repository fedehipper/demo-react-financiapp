Vue.component("boton-editar-gasto", {
    props: ["gasto"],
    methods: {
        verModalEdicionGasto() {
            this.$emit("verModalEdicionGasto", this.gasto);
        }
    },
    template: `
        <div>
            <a class="fa-clickable" v-tooltip title="Editar gasto" @click="verModalEdicionGasto">
                <i class="fa fa-edit text-primary"></i>
            </a>
        </div>
    `
});