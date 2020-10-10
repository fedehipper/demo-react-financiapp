Vue.component("cartera", {
    data: function () {
        return {
            graficoDona: null,
            cartera: [],
            porcentajes: [],
            mostrarMensajeSinActivos: false,
            toast: {
                mensaje: "",
                color: ""
            },
            tipoMonedas: [],
            detalles: [],
            movimientos: [],
            activoSeleccionado: ""
        };
    },
    methods: {
        obtenerDetalles() {
            axios.get("/api/detalle-activo")
                    .then(response => {
                        this.detalles = response.data;
                    });
        },
        obenerTipoMonedas() {
            axios.get("/api/tipo-moneda")
                    .then(response => {
                        this.tipoMonedas = response.data;
                    });
        },
        rescateTotalInversion(activoId) {
            axios.delete("/api/activo/" + activoId)
                    .then(() => {
                        this.actualizarCartera();
                        this.lanzarAlerta("Tu inversión ha sido rescatado.", "bg-success");
                    });
        },
        crearActivo(activo) {
            axios.post("/api/activo", activo)
                    .then(() => {
                        this.actualizarCartera();
                        this.lanzarAlerta("Nuevo activo agregado.", "bg-success");
                    });
        },
        rescateParcial(activoId, monto) {
            axios.post("/api/movimiento/rescate?activoId=" + activoId + "&" + "monto=" + monto)
                    .then(() => {
                        this.actualizarCartera();
                        this.lanzarAlerta("Tu parte de la inversión ha sido rescatada.", "bg-success");
                    })
                    .catch(error => this.lanzarAlerta(error.response.data.message, "bg-danger"));
        },
        lanzarAlerta(mensaje, color) {
            this.toast.mensaje = mensaje;
            this.toast.color = color;
            $(".toast").toast("show");
        },
        editarMeta(metaEditada) {
            axios.put("/api/meta", metaEditada)
                    .then(() => {
                        this.obtenerDetalles();
                        this.lanzarAlerta("Tu meta ha sido actualizada.", "bg-success");
                    })
                    .catch(error => this.lanzarAlerta(error.response.data.message, "bg-danger"));
        },
        invertirSobreVigente(activoId, monto) {
            axios.post("/api/movimiento/inversion-nueva?activoId=" + activoId + "&" + "monto=" + monto)
                    .then(() => {
                        this.actualizarCartera();
                        this.lanzarAlerta("Se agrego dinero a tu activo.", "bg-success");
                    })
                    .catch(error => this.lanzarAlerta(error.response.data.message, "bg-danger"));
        },
        actualizarCartera() {
            this.obtenerCartera();
            this.obtenerPorcentajes();
            this.obtenerDetalles();
        },
        obtenerCartera() {
            axios.get("/api/cartera")
                    .then(response => {
                        this.cartera = response.data;
                        if (this.cartera.length === 0) {
                            this.mostrarMensajeSinActivos = true;
                        } else {
                            this.mostrarMensajeSinActivos = false;
                        }
                    });
        },
        obtenerPorcentajes() {
            axios.get("/api/porcentaje")
                    .then(response => {
                        this.porcentajes = response.data;
                        this.graficar(this.porcentajes);
                    });
        },
        deshacerMovimientoHoy(activoId) {
            axios.delete("/api/movimiento/activo/" + activoId)
                    .then(() => {
                        this.actualizarCartera();
                        this.lanzarAlerta("Se deshiso el cambio en tu movimiento.", "bg-success");
                    })
                    .catch(error => this.lanzarAlerta(error.response.data.message, "bg-danger"));
        },
        actualizarUnActivo(idActivo, montoActualizado) {
            var activoDiario = {
                id: idActivo,
                monto: montoActualizado
            };
            axios.post("/api/movimiento", activoDiario)
                    .then(() => {
                        this.obtenerCartera();
                        this.obtenerDetalles();
                        this.lanzarAlerta("Se actualizó el monto de tu activo.", "bg-success");
                    })
                    .catch(error => this.lanzarAlerta(error.response.data.message, "bg-danger"));
        },
        buscarMovimientosPorActivoId(activoSeleccionado) {
            this.activoSeleccionado = activoSeleccionado;
            axios.get("/api/movimiento/activo/" + this.activoSeleccionado.id)
                    .then(response => {
                        this.movimientos = response.data;
                        $("#modalMovimientosId").modal();
                    });
        },
        obtenerColor() {
            return "#" + ((1 << 24) * Math.random() | 0).toString(16);
        },
        graficar(porcentajes) {
            var porcentajesActivo = porcentajes.map(porcentaje => porcentaje.porcentajeActivo);
            var nombresActivo = porcentajes.map(porcentaje => porcentaje.nombreActivo);

            var colores = [];
            for (var i = 0; i < porcentajes.length; i++) {
                colores.push(this.obtenerColor());
            }
            if (this.graficoDona !== null) {
                this.graficoDona.destroy();
            }
            this.graficoDona = new Chart(document.getElementById("porcentajesActivos"), {
                type: "doughnut",
                data: {
                    datasets: [{
                            data: porcentajesActivo,
                            backgroundColor: colores
                        }],
                    labels: nombresActivo
                }
            });
        }
    },
    created() {
        this.obtenerCartera();
        this.obtenerPorcentajes();
        this.obenerTipoMonedas();
        this.obtenerDetalles();
    },
    template: `
        
       <div>
            <div class="row">
                <div class="col mb-4">
                    <h2 class="grosor-titulos">Mi Cartera</h2>
                    <mensaje-accion :mensaje="toast.mensaje" :color="toast.color"/>
                </div>
            </div>

            <div v-if="mostrarMensajeSinActivos">
                <alertaSinActivo/>
                <modal-alta-activo @activoNuevo="crearActivo" :tipoMonedas="tipoMonedas"/>
                <div class="text-center"> 
                    <boton-comenzar-a-invertir/>
                </div>
            </div>

            <div v-else>
                <div class="row">
                    <div class="col">
                        <div>
                            <modal-alta-activo @activoNuevo="crearActivo" :tipoMonedas="tipoMonedas"/>
                            <modal-movimientos :movimientos="movimientos" :nombreActivo="activoSeleccionado.nombre" :moneda="activoSeleccionado.moneda"/>

                            <nav class="navbar navbar-expand-lg navbar-light bg-light pl-2 pr-2">
                                <ul class="nav navbar-nav mr-auto mt-2 mt-lg-0">
                                    <li class="nav-item">
                                        <a class="nav-link active" data-toggle="tab" href="#cartera">Cartera de activos</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-toggle="tab" href="#grafico-cartera">Gráfico</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-toggle="tab" href="#suma-cartera">Suma por moneda</a>
                                    </li>
                                </ul>
                                <boton-nuevo-activo/>
                            </nav>
    
                            <div class="tab-content">
                                <div class="tab-pane fade show active" id="cartera">
                                
                                    <table class="table table-sm table-striped table-hover table-bordered">
                                        <thead class="thead-light text-center">
                                            <tr>
                                                <th>Activo</th>
                                                <th>Moneda</th>
                                                <th>Período</th>
                                                <th>Monto Invertido</th>
                                                <th>Monto al día</th>
                                                <th>Variación parcial</th>
                                                <th>Ganancia total</th>
                                                <th colspan="5">Acciones</th>                                        
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <activo 
                                                v-for="activo in cartera" 
                                                :activo="activo" 
                                                :key="cartera.id" 
                                                @confirmarActivo="actualizarUnActivo" 
                                                @rescateTotalInversion="rescateTotalInversion" 
                                                @invertirSobreVigente="invertirSobreVigente"
                                                @deshacerMovimientoHoy="deshacerMovimientoHoy"
                                                @rescateParcial="rescateParcial"
                                                @buscarMovimientosPorActivoId="buscarMovimientosPorActivoId"
                                            />                                
                                        </tbody>
                                    </table>    
                                </div>

                                <div class="tab-pane fade show" id="grafico-cartera">
                                    <div class="row grafico-espaciado">
                                        <div class="col-10 mb-4 mt-3 offset-1">
                                            <canvas id="porcentajesActivos" class="chartjs" width="770" height="385" style="display: block; width: 770px; height: 385px;"></canvas>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="tab-pane fade" id="suma-cartera">
                                    <activos :detalles="detalles" @editarMeta="editarMeta"/>
                                </div>
                            
                            </div>
                        
                        </div>
                    </div>
                </div>
            </div>

        </div>
    `
});