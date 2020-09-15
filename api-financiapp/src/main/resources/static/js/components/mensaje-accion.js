Vue.component("mensaje-accion", {
    props: ["mensaje", "color"],
    template: `
        <div class="toast toast-custom" :class=color data-delay="6000">
            <div class="toast-body">
                {{mensaje}}
            </div>
        </div>
`
});