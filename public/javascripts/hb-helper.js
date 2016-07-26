var register = function(Handlebars) {
    var helpers = {
        // put all of your helpers inside this object
        trimForAvatar: function (passedString) {
          return passedString.substring(0,1);
        },
        debug: function(optionalValue) {
            console.log("Current Context");
            console.log("====================");
            //console.log(this);
            if (optionalValue) {
                console.log("Value");
                console.log("====================");
                console.log(optionalValue);
            }
        },
        andfixer: function(passedString) {
            if(passedString!=null){
                if(passedString.indexOf('&amp;') ){
                    return passedString.replace("&amp;", "&");
                }
            }
            return;
        },
        compareStrings: function(passedString, secondString) {
            if(passedString!=null &&  secondString!=null){
                if(passedString.toLowerCase() === secondString.toLowerCase()){
                    return true;
                }
            }
            return false;
        },
        stringContains: function(passedString, expression){
            console.log(passedString, expression)
          if(passedString.indexOf(expression)>-1)
          return true;
            else false;
        },
        json: function(context){
            return JSON.stringify(context);
        },
        indexPlusConstant:function(index, constant){
            return index+constant;
        },
        indexMinusConstant:function(index, constant){
            return index-constant;
        },
        getTrueOrFalse:function(array){
            var bArray= [];
            for(var a in array)
            if(array[a] == '' || array[a] == null || array[a] == false) bArray.push(false);
            else bArray.push(true);

            var returnedValue= true;

            for(var b in bArray){
                if(bArray && returnedValue) returnedValue=true;
                else returnedValue=false;
            }
            return returnedValue;
        },
        idGenerator:function(object){
            var S4 = function() {
                return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            };
            return object.theID=(S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
        },
        upToIndex:function(currentIndex, maxIndex){
            if(currentIndex<=maxIndex)
            return true;
            else
            return false;
        },
        joinBreadCrumb: function(array, url){
            var breadcrumb = "";
            for (var a in array){
                if(a == array.length-1) breadcrumb += array[a].name
                else breadcrumb += array[a].name+'%20>%20'
            }
            if(url == 'true'){
                 return breadcrumb.split(" & ").join("%20%26%20")
            }
            else {
                return breadcrumb;
            }
        }
    };

if (Handlebars && typeof Handlebars.registerHelper === "function") {
        // register helpers
        for (var prop in helpers) {
            Handlebars.registerHelper(prop, helpers[prop]);
        }
    }
else {
        // just return helpers object if we can't register helpers here
        return helpers;
      }     
}
// client
if (typeof window !== "undefined") {
    register(Handlebars);
}
// server
else {
    module.exports.register = register;
    module.exports.helpers = register(null);
}
