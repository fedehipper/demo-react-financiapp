Vue.directive("tooltip", {
    inserted: function (el) {
        $(el).tooltip();
    }
});
    