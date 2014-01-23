// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */
    var homeTpl = Handlebars.compile($("#home-tpl").html());
    var employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());
    var adapter = new MemoryAdapter();
    var employeeTpl = Handlebars.compile($("#employee-tpl").html());
    var detailsURL = /^#employees\/(\d{1,})/;
    var slider = new PageSlider($('body'));

     adapter.initialize().done(function () {
        route();
    });
    /* --------------------------------- Event Registration -------------------------------- */
	$(window).on('hashchange', route);

    /* ---------------------------------- Local Functions ---------------------------------- */
    function route() {
    var hash = window.location.hash;
    if (!hash) {
        slider.slidePage(new HomeView(adapter, homeTpl, employeeLiTpl).render().el);
       // $('body').html(new HomeView(adapter, homeTpl, employeeLiTpl).render().el);
        return;
    }
    var match = hash.match(detailsURL);
    if (match) {
        adapter.findById(Number(match[1])).done(function(employee) {
            slider.slidePage(new EmployeeView(adapter, employeeTpl, employee).render().el);

           // $('body').html(new EmployeeView(adapter, employeeTpl, employee).render().el);
        });
    }
}

}());