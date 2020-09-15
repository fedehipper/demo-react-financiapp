Vue.component("boton-nuevo-gasto", {
    props: ["comenzarARegistrarGastos"],
    methods: {
        verModal() {
            $("#nuevoGasto").modal();
        }
    },
    template: `
        <div>
            <button v-if="comenzarARegistrarGastos" class="btn btn-primary" v-tooltip title="Nuevo gasto" @click="verModal" data-target="#nuevoGasto">
                Comenzá a registrar tus gastos!
            </button>

            <button v-else class="btn btn-danger" @click="verModal" data-target="#nuevoGasto">
                <i class="fa fa-plus-circle"></i> Nuevo gasto
            </button>
        </div>
    `
});