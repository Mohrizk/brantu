var registerPartials = function(Handlebars) {
    var partials = {
        // put all of your partials inside this object
        loading: function () {
          return'<div class="row">'+
                  '<div class="col-md-12">'+
                  '<div class="fetching text-center ">'+
                  '<h5 class="bold" style="color:#ddd;">Loading</h5>'+
                  '<img src="/images/loading.svg" style="width:4vw;">'+
                  '</div>'+
                  '</div>'+
                  '</div>'
        }
    };
if (Handlebars && typeof Handlebars.registerPartial === "function") {
        // register partials
        for (var prop in partials) {
            Handlebars.registerPartial(prop, partials[prop]);
        }
    }
else {
        // just return partials object if we can't register partials here
        return partials;
      }     
}
// client
if (typeof window !== "undefined") {
    registerPartials(Handlebars);
}
// server
else {
    module.exports.partial = registerPartials;
    module.exports.partials = registerPartials(null);
}