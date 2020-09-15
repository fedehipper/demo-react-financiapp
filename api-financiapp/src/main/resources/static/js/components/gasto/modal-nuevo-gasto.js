Vue.component("modal-nuevo-gasto", {
    data: function () {
        return {
            fecha: this.obtenerFechaHoyConFormato(),
            concepto: "",
            valor: "",
            necesario: true,
            cantidadPagosDisponibles: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
            cantidadPagosSeleccionado: 1
        };
    },
    methods: {
        obtenerFechaHoyConFormato() {
            var date = new Date();
            var formattedDate = moment(date).format('YYYY-MM-DD');
            return formattedDate;
        },
        desplegarDatePicker() {
            $("#datepicker").datepicker({
                uiLibrary: 'bootstrap4'
            });
        },
        confirmar() {
            var nuevoGasto = {
                fecha: this.fecha,
                concepto: this.concepto,
                valor: this.valor,
                necesario: this.necesario,
                cantidadPagos: this.cantidadPagosSeleccionado
            };
            this.$emit("nuevoGasto", nuevoGasto);
            $("#nuevoGasto").modal("hide");
            this.resetear();
        },
        resetear() {
            this.fecha = this.obtenerFechaHoyConFormato();
            this.concepto = "";
            this.valor = "";
        }
    },
    template: `
        <div class="modal fade" id="nuevoGasto" tabindex="-1" >
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content" @keyup.esc="resetear">

                    <div class="modal-header">
                        <h5 class="modal-title">Nuevo gasto</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="resetear">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit="confirmar" @submit.prevent>
                        <div class="modal-body">   
                            
                            <div class="mb-3">
                                <label>Concepto</label>
                                <input 
                                    type="text"
                                    maxlength="25"
                                    class="form-control"
                                    required
                                    v-model="concepto">
                            </div>
    
                            <div class="mb-3 mt-3">
                                <label for="formularioMonedas">Cantidad de pagos</label>
                                <select class="form-control" v-model="cantidadPagosSeleccionado">
                                    <option 
                                        v-for="cantidadPago in cantidadPagosDisponibles" :value="cantidadPago">{{cantidadPago}}
                                    </option>
                                </select>
                            </div>
                            
                            <div class="mb-3 mt-3">
                                <label>Monto</label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">$</span>
                                    </div>
                                    <input 
                                        type="number" step=0.01
                                        maxlength="10"
                                        class="form-control"
                                        min="0" max="999999999999999"
                                        required
                                        v-model="valor">
                                </div>
                            </div>
    
                            <div class="mb-3 mt-3">
                                <label>Fecha a realizar el pago</label>
                                <datepicker 
                                    v-model="fecha" 
                                    placeholder="Fecha de pago"
                                    required>
                                </datepicker>
                            </div>
    
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="resetear">Cancelar</button>
                            <button type="submit" class="btn btn-primary">Aceptar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>       
        `
});
