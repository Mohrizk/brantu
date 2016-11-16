var register = function(Handlebars) {
    var helpers = {
        translate:function(string){
          return  req_i18n.__(string);
        },
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
        categoryIdGenerate: function(str) {
            return str.substring(0, 2) + str.substring(str.length-3 , str.length-1);
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
        compareNumber: function(passedNum, secondNum) {
            if(passedNum!=null &&  secondNum!=null){
                if(passedNum === secondNum){
                    return true;
                }
            }
            return false;
        },
        stringContains: function(passedString, expression){
            if(typeof passedString == 'undefined' ||  typeof expression == 'undefined') return false;

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
                if(typeof array[a] !== 'undefined'){
                    if(typeof array[a].name !== 'undefined'){
                        if(a == array.length-1) breadcrumb += array[a].name
                        else breadcrumb += array[a].name+'%20>%20'
                    }
                }
            }
            if(url == 'true'){
                var pattern = " & ",
                    re = new RegExp(pattern, "g");
                 return breadcrumb.replace(re, '%20%26%20')
            }
            else {
                return breadcrumb;
            }
        },
        urlFriendly:function (string){
            var newString = string.toLowerCase()
                .replace(/[\/\*\+\.\?\=\)\(\}\{\<\>_]/g," ") //|(?:\,\ )|(?:\,)
                .replace(/(?:\')/g,"")
                .replace(/(?:\ \ )/g," ")
                .replace(/(?:\ )/g,"-")
                .replace(/(?:\&)/g,"˜");
            return newString;
            // if(typeof leaveDash !== 'undefined') ;
            //else return newString.replace(/\-/g, " ")
        },
        encodeDepartment   :function (string){
            if(typeof string == 'undefined' || string == null) return null;
            var str = string.toLowerCase();
            var women = ['kvinna','women','female']
            var men = ['men','man','male']
            for(var w in women){
                if(women[w] === str) return 'WOMEN'
            }
            for(var m in men){
                if(men[m] === str) return 'MEN'
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
