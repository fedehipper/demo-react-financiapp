Vue.component("editable", {
    props: ["tipo", "label", "datoOriginal", "reiniciarEdicion", "edicionDeshabilitada"],
    data: function () {
        return  {
            datoIngresado: "",
            editando: false
        };
    },
    methods: {
        pasarAEditando() {
            this.editando = true;
        },
        dejarDeEditar() {
            this.editando = false;
        },
        aceptar() {
            this.$emit("confirmacionIngresoDeDato", this.datoIngresado);
            this.dejarDeEditar();
        }
    },
    watch: {
        datoOriginal() {
            this.datoIngresado = this.datoOriginal;
        },
        reiniciarEdicion() {
            this.editando = false;
            this.$emit("confirmacionReinicioEdicion");
        }
    },
    template: `
        <div>
            <div v-if="editando">
                <div class="row d-flex justify-content-end mr-3">
                    <div class="row col-6 d-flex justify-content-between pr-0">
                        <label class="d-flex align-items-center mb-0">{{label}}</label>

                        <input v-if="tipo === 'number'"
                            v-focus
                            type="number" 
                            class="form-control text-center col-4" 
                            @keyup.esc="dejarDeEditar"
                            @keyup.enter="aceptar"
                            v-model="datoIngresado">
                        <input v-else
                            v-focus
                            type="text" 
                            @keyup.enter="aceptar"
                            class="form-control text-center col-4" 
                            v-model="datoIngresado">
                        
                        <div>
                            <button class="btn btn-success" @click="aceptar"><i class="fa fa-check p-1"></i></button>
                        </div>
                        
                        <div>
                            <button class="btn btn-secondary" @click="dejarDeEditar"><i class="fa fa-times p-1"></i></button>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else>
                <div class="row d-flex justify-content-end mr-3">
                    <div class="row col-7 d-flex justify-content-end pr-0">
                        <label class="d-flex align-items-center mb-0 mr-3">{{label}}</label>

                        <div class="col-4 card border-secondary text-secondary mr-3">
                            <div class="card-body text-right d-flex align-items-center pt-0 pb-0 pr-0">
                                <p class="mb-0">$ {{datoOriginal}}</p>
                            </div>
                        </div>
                        <div>
                            <button class="btn btn-primary" @click="pasarAEditando" :disabled="edicionDeshabilitada"><i class="fa fa-edit p-1"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
});