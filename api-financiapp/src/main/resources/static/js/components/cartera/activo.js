Vue.component("activo", {
    props: ["activo"],
    data: function () {
        return {
            enEdicion: false
        };
    },
    directives: {
        focus: {
            inserted: function (el) {
                el.focus();
                el.select();
            }
        }
    },
    methods: {
        buscarMovimientosPorActivoId() {
            this.$emit("buscarMovimientosPorActivoId", this.activo);
        },
        rescateTotalInversion(activoId) {
            this.$emit("rescateTotalInversion", activoId);
        },
        rescateParcial(activoId, monto) {
            this.$emit("rescateParcial", activoId, monto);
        },
        invertirSobreVigente(activoId, monto) {
            this.enEdicion = false;
            this.$emit("invertirSobreVigente", activoId, monto);
        },
        actualizarMonto(activoId, montoActualizado) {
            this.enEdicion = false;
            this.$emit("confirmarActivo", activoId, montoActualizado);
        },
        deshacerMovimientoHoy() {
            this.$emit("deshacerMovimientoHoy", this.activo.id);
        },
        cancelar() {
            this.enEdicion = false;
        }
    },
    template: `
            <tr>
                <td>{{activo.nombre}}</td>
                <td class="text-center">{{activo.moneda}}</td>
                <td class="text-center">{{activo.fechaInicial}} - {{activo.fechaActual}}</td>
                <td class="text-right">{{activo.montoInicial}}</td>
                <td class="text-right">{{activo.montoActual}} </td>

                <td class="text-right">{{activo.gananciaParcial}}</td>   
                <td class="text-right">{{activo.gananciaTotal}}</td>

                <td class="text-center">
                    <boton-editar @actualizarMonto="actualizarMonto" :idActivo="activo.id" :montoActual="activo.montoActual"/>
                </td>
                <td class="text-center">
                    <boton-deshacer @deshacerMovimientoHoy="deshacerMovimientoHoy" :activoId="activo.id"/>
                </td>
                <td class="text-center">
                    <boton-finalizar @rescateTotalInversion="rescateTotalInversion" @rescateParcial="rescateParcial" :idActivo="activo.id"/>
                </td>
                <td class="text-center">
                    <boton-invertir-vigente @invertirSobreVigente="invertirSobreVigente" :idActivo="activo.id"/>
                </td>
                <td class="text-center">
                    <a class="fa-clickable" v-tooltip title="Ver movimientos" @click="buscarMovimientosPorActivoId">
                        <i class="fa fa-search text-info"></i>
                    </a>
                </td>
            </tr>
    `

});