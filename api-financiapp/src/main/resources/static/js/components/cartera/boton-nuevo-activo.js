Vue.component("boton-nuevo-activo", {
    methods: {
        verModal() {
            $("#altaActivo").modal();
        }
    },
    template: `
        <button class="btn btn-success" @click="verModal" data-target="#altaActivo">
            <i class="fa fa-plus-circle"></i> Nuevo activo
        </button>
    `

});