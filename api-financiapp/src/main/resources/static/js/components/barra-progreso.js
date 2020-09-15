Vue.component("barra-progreso", {
    props: ["actual", "tope", "color"],
    data() {
        return {
            styleProgreso: this.calcularPorcentajeProgreso() + "%",
            porcentajeProgresoActualizable: this.calcularPorcentajeProgreso()
        };
    },
    methods: {
        calcularPorcentajeProgreso() {
            if (this.tope) {
                var porcentaje = Math.round(this.actual * 100 / this.tope);
                if (porcentaje > 100) {
                    return 100;
                } else {
                    return porcentaje;
                }
            } else {
                return 0;
            }
        }
    },
    computed: {
        cambioProgreso() {
            const {actual, tope} = this;
            return {actual, tope};
        }
    },
    watch: {
        cambioProgreso() {
            this.porcentajeProgresoActualizable = this.calcularPorcentajeProgreso();
            this.styleProgreso = this.calcularPorcentajeProgreso() + "%";
        }
    },
    template: `
        <div class="progress mt-2">
            <div 
                class="progress-bar"
                :class=color
                role="progressbar"
                :style="{width: styleProgreso}" 
                :aria-valuenow="porcentajeProgresoActualizable" 
                aria-valuemin="0" 
                aria-valuemax="100">{{porcentajeProgresoActualizable}}%</div>
        </div>
    `
});