Vue.component("datepicker", {
    props: ["value"],
    mounted: function () {
        var self = this;
        $(self.$el)
                .datepicker({
                    header: true,
                    iconsLibrary: 'fontawesome',
                    uiLibrary: 'bootstrap4',
                    value: this.value,
                    locale: "es-es",
                    format: "yyyy-mm-dd"
                })
                .trigger("change")
                .on("change", function () {
                    self.$emit("input", this.value);
                });
    },
    watch: {
        value: function (value) {
            $(this.$el).val(value);
        }
    },
    destroyed: function () {
        $(this.$el).datepicker("destroy");
    },
    template:
            `<input class="form-control" type="text"/>`
});
