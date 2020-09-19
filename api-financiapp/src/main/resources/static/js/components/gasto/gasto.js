Vue.component("gasto", {
    data: function () {
        return {
            graficoBurnUp: null,
            montoMensualEstimado: "",
            reiniicarEdicionMontoEstimado: false,
            anioSeleccionado: "",
            mesSeleccionado: "",
            comboAnio: {
                anioActual: "",
                aniosASeleccionar: []
            },
            comboMes: {
                mesActual: "",
                mesesASeleccionar: []
            },
            meses: [],
            toast: {
                mensaje: "",
                color: ""
            },
            gastosMesSeleccionado: [],
            sumatoriaGasto: "",
            mostrarMensajePeriodoSinGastos: false,
            mostrarPestaniaVerGrafico: false,
            graficoBurnUpData: "",
            gastoSeleccionado: ""
        };
    },
    methods: {
        buscarGraficoBurnUp() {
            axios.get("/api/gastoBurnUp?anio=" + this.anioSeleccionado + "&mes=" + this.mesSeleccionado)
                    .then(response => {
                        this.graficoBurnUpData = response.data;
                        if (this.fechaSeleccionadaEsAnteriorAHoy()) {
                            this.mostrarPestaniaVerGrafico = true;
                            this.graficar();
                        } else {
                            this.graficoBurnUp.destroy();
                            this.mostrarPestaniaVerGrafico = false;
                        }
                    });
        },
        fechaSeleccionadaEsAnteriorAHoy() {
            var fechaHoyAnioYMes = this.anioActual() + "" + this.calcularMes(this.mesActual());
            var fechaAnioYMesSeleccionado = this.anioSeleccionado + "" + this.calcularMes(this.mesSeleccionado);
            return fechaAnioYMesSeleccionado <= fechaHoyAnioYMes;
        },
        calcularMes(mesNumerico) {
            return mesNumerico < 10 ? "0" + mesNumerico : mesNumerico;
        },
        graficar() {
            if (this.graficoBurnUp !== null) {
                this.graficoBurnUp.destroy();
            }
            this.graficoBurnUp = new Chart(document.getElementById("burnUp"), {
                type: 'line',
                data: {
                    datasets: [{
                            label: 'Gasto disponible hasta la fecha',
                            data: this.graficoBurnUpData.gastoAcumuladoSinRepetirPorDia,
                            borderColor: "#007bff",
                            pointBackgroundColor: "#007bff"
                        },
                        {
                            label: 'Gasto realizado hasta la fecha',
                            data: this.graficoBurnUpData.gastoEstimadoAcumuladoPorDiasDelMes,
                            borderColor: "#dc3545",
                            pointBackgroundColor: "#dc3545"
                        }],
                    labels: this.graficoBurnUpData.diasDelMes
                }
            });
        },
        obtenerAnios() {
            axios.get("/api/comboAnio")
                    .then(response => {
                        this.comboAnio = response.data;
                        this.anioSeleccionado = this.comboAnio.anioActual;
                        if (this.comboAnio.aniosASeleccionar.length > 0) {
                            this.obtenerMesesPorAnio();
                        } else {
                            this.mostrarMensajePeriodoSinGastos = true;
                        }
                    });
        },
        obtenerMesesPorAnio() {
            axios.get("/api/comboMes?anio=" + this.anioSeleccionado)
                    .then(response => {
                        this.comboMes = response.data;
                        if (this.comboMes.mesesASeleccionar.includes(this.comboMes.mesActual) && this.anioSeleccionado === this.comboAnio.anioActual) {
                            this.mesSeleccionado = this.comboMes.mesActual;
                        } else if (this.anioSeleccionado < this.comboAnio.anioActual) {
                            this.mesSeleccionado = Math.max(...this.comboMes.mesesASeleccionar);
                        } else {
                            this.mesSeleccionado = Math.min(...this.comboMes.mesesASeleccionar);
                        }
                        this.renderizarGastoActual();
                    });
        },
        buscarMontoMensualEstimado() {
            axios.get("/api/montoMensualEstimado?anio=" + this.anioSeleccionado + "&mes=" + this.mesSeleccionado)
                    .then(response => this.montoMensualEstimado = response.data);
        },
        actualizarMontoMensualEstimado(montoMensualEstimadoIngresado) {
            let nuevoMontoMensualEstimado = {
                anio: this.anioSeleccionado.toString(),
                mes: this.mesSeleccionado.toString(),
                montoEstimado: montoMensualEstimadoIngresado
            };
            axios.put("/api/montoMensualEstimado?", nuevoMontoMensualEstimado)
                    .then(response => {
                        this.montoMensualEstimado = response.data;
                        this.buscarGastoPorAnioYMes();
                        this.lanzarAlerta("Se ha actualizado el monto mensual estimado.", "bg-success");
                    });
        },
        buscarGastoPorAnioYMes() {
            axios.get("/api/gasto?anio=" + this.anioSeleccionado + "&mes=" + this.mesSeleccionado)
                    .then(response => {
                        this.gastosMesSeleccionado = response.data;
                        this.buscarGraficoBurnUp();
                    });
        },
        calcularPerdidas(gastoId) {
            axios.put("/api/gasto/necesidad/" + gastoId)
                    .then(() => {
                        this.obtenerSumatoriaGastosPorAnioYMes();
                        this.lanzarAlerta("Se ha actualizado el valor necesidad del gasto.", "bg-success");
                    });
        },
        obtenerSumatoriaGastosPorAnioYMes() {
            axios.get("/api/gasto/total?anio=" + this.anioSeleccionado + "&mes=" + this.mesSeleccionado)
                    .then(response => this.sumatoriaGasto = response.data);
        },
        crearGasto(nuevoGasto) {
            this.anioSeleccionado = moment(nuevoGasto.fecha).year();
            this.mesSeleccionado = moment(nuevoGasto.fecha).month() + 1;
            axios.post("/api/gasto", nuevoGasto)
                    .then(() => {
                        this.obtenerAnios();
                        this.obtenerMesesPorAnio();
                        this.obtenerSumatoriaGastosPorAnioYMes();
                        if (this.fechaSeleccionadaEsAnteriorAHoy()) {
                            this.buscarGastoPorAnioYMes();
                        }
                        this.lanzarAlerta("Se ha creado un nuevo gasto.", "bg-success");
                    })
                    .catch(error => this.lanzarAlerta(error.response.data.message, "bg-danger"));
        },
        lanzarAlerta(mensaje, color) {
            this.toast.mensaje = mensaje;
            this.toast.color = color;
            $(".toast").toast("show");
        },
        modificarGastoPorId(gastoModificado) {
            axios.put("/api/gasto/" + gastoModificado.id, gastoModificado)
                    .then(() => {
                        this.obtenerSumatoriaGastosPorAnioYMes();
                        this.buscarGastoPorAnioYMes();
                        this.lanzarAlerta("Se ha actualizado el gasto.", "bg-success");
                    });
        },
        eliminarGastoSeleccionado(gastoId) {
            axios.delete("/api/gasto/" + gastoId)
                    .then(() => {
                        this.obtenerSumatoriaGastosPorAnioYMes();
                        this.buscarGastoPorAnioYMes();
                        this.lanzarAlerta("Se ha eliminado el gasto.", "bg-success");
                    });
        },
        volverANoEdicionMontoEstimado() {
            this.reiniicarEdicionMontoEstimado = false;
        },
        renderizarGastoActual() {
            this.reiniicarEdicionMontoEstimado = true;
            this.obtenerSumatoriaGastosPorAnioYMes();
            this.buscarGastoPorAnioYMes();
            this.buscarMontoMensualEstimado();
        },
        verModalEliminacionGasto(gastoSeleccionado) {
            this.gastoSeleccionado = gastoSeleccionado;
            $("#modalEliminacionGastoId").modal();
        },
        verModalEdicionGasto(gastoSeleccionado) {
            this.gastoSeleccionado = gastoSeleccionado;
            $("#modalEdicionGastoId").modal();
        }
    },
    computed: {
        deshabilitarEdicionDeGasto() {
            var fechaHoyAnioYMes = this.comboAnio.anioActual + "" + this.calcularMes(this.comboMes.mesActual);
            var fechaAnioYMesSeleccionado = this.anioSeleccionado + "" + this.calcularMes(this.mesSeleccionado);
            return fechaAnioYMesSeleccionado < fechaHoyAnioYMes;
        }
    },
    watch: {
        gastosMesSeleccionado() {
            if (this.gastosMesSeleccionado.length === 0) {
                this.mostrarMensajePeriodoSinGastos = true;
                this.anioSeleccionado = "";
            } else {
                this.mostrarMensajePeriodoSinGastos = false;
            }
        }
    },
    created() {
        this.obtenerAnios();
    },
    template: `
        <div>
            <modal-eliminar-gasto :gasto="gastoSeleccionado" @confirmarEliminacion="eliminarGastoSeleccionado"/>
            <modal-editar-gasto :gasto="gastoSeleccionado" @gastoEditado="modificarGastoPorId"/>
            <modal-nuevo-gasto @nuevoGasto="crearGasto"/>
            <div class="row">
                <div class="col mb-4">
                    <h2 class="grosor-titulos">Mis Gastos</h2>
                    <mensaje-accion :mensaje="toast.mensaje" :color="toast.color"/>
                </div>
            </div>
    
            <div v-if="mostrarMensajePeriodoSinGastos">
                <alerta-sin-gastos-periodo/>
                <div class="text-center" v-if="anios.length === 0">
                    <boton-nuevo-gasto :comenzarARegistrarGastos="true"/>
                </div>
                <div class="text-center" v-else>
                    <button class="btn btn-primary" @click="obtenerAnios">Ok</button>
                </div>
            </div>
            <div v-else>
                <div v-if="gastosMesSeleccionado">
                    <div class="row">
                        <div class="col-2">
                            <div class="row"> 
                                <div class="col-3 mt-2">
                                    Año
                                </div>
                                <div class="col-6">
                                    <select class="form-control" v-model="anioSeleccionado" @change="obtenerMesesPorAnio">
                                        <option 
                                            v-for="anio in comboAnio.aniosASeleccionar" :value="anio">{{anio}}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="col-2">
                            <div class="row">  
                                <div class="col-3 mt-2">
                                    Mes
                                </div>
                                <div class="col-5 pl-3">
                                    <select class="form-control" v-model="mesSeleccionado" @change="renderizarGastoActual">
                                        <option 
                                            v-for="mes in comboMes.mesesASeleccionar" :value="mes">{{mes}}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
    
                    </div>

                    <div class="row mt-3">
                        <div class="col">
                            <nav class="navbar navbar-expand-lg navbar-light bg-light pl-2 pr-2">
                                <ul class="nav navbar-nav mr-auto mt-2 mt-lg-0">
                                    <li class="nav-item">
                                        <a class="nav-link active" data-toggle="tab" href="#detalle-gastos">Detalle mensual</a>
                                    </li>
                                    <li v-if="mostrarPestaniaVerGrafico" class="nav-item" @click="buscarGraficoBurnUp">
                                        <a class="nav-link" data-toggle="tab" href="#grafico-gastos">Gráfico mensual</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-toggle="tab" href="#control-gastos">Limita tus gastos</a>
                                    </li>
                                </ul>
                                <boton-nuevo-gasto/>
                            </nav>
                            
                            <div class="tab-content">
                                <div class="tab-pane fade show active" id="detalle-gastos">
                                    <table class="table table-sm table-striped table-hover table-bordered">
                                        <col width="250">
                                        <col width="70">
                                        <col width="50">
                                        <col width="30">
                                        <col width="5">
                                        <col width="5">
                                        <thead class="thead-light text-center">
                                            <tr>
                                                <th>Concepto</th>
                                                <th>Fecha</th>
                                                <th>Valor ($)</th>
                                                <th>Necesario</th>
                                                <th colspan="2">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="gasto in gastosMesSeleccionado" :key="gasto.id">
                                                <td>{{gasto.concepto}}</td>
                                                <td class="text-center">{{gasto.fecha}}</td>
                                                <td class="text-right">{{gasto.valor}}</td>
                                                <td class="text-center">
                                                    <div class="form-check">
                                                        <input type="checkbox" class="form-check-input" :checked=gasto.necesario v-model="gasto.necesario" @change="calcularPerdidas(gasto.id)">
                                                    </div>
                                                </td>
                                                <td class="text-center"><boton-editar-gasto :gasto="gasto" @verModalEdicionGasto="verModalEdicionGasto"/></td>
                                                <td class="text-center"><boton-eliminar-gasto :gasto="gasto" @verModalEliminacionGasto="verModalEliminacionGasto"/></td>
                                            </tr>
                                        </tbody>                            
                                    </table>
                              
                                </div>
                                
                                <div class="tab-pane fade" id="grafico-gastos">
                                    <div class="row">
                                        <div class="col mb-4">
                                            <canvas id="burnUp" class="chartjs" width="770" height="385" style="display: block; width: 770px; height: 385px;"></canvas>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="tab-pane fade" id="control-gastos">
                                    <control-gasto :sumatoriaGasto="sumatoriaGasto" :montoLimite="montoMensualEstimado" @editarLimite="actualizarMontoMensualEstimado"/>
                                </div>
                            
                            </div>
    
                        </div>
                    </div>
                </div>
                <div v-else class="text-center">
                    <alerta-sin-gastos-periodo/>
                    <button class="btn btn-primary text-center">Ir al último mes</button>
                </div>
            </div>
        </div>
    `
});