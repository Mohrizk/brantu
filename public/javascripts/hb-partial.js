var registerPartials = function(Handlebars) {
    var partials = {
        // put all of your partials inside this object
        loading: function () {
          return '<div class="row">'+
                '<div class="col-md-12">'+
                '<div class="fetching">'+
                '<h6 class="text-center">LOADING</h6>'+
                '<div class="loader loader--style3" title="2">'+
                '<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">'+
                '<path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">'+
                ' <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"/>'+
                '</path>'+
                '</svg>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>';
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