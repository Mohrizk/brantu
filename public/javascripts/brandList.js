/**
 * Created by mohamedrizk on 13/05/16.
 */

var clientBrands = algoliasearch("D3IWZXC0AH", '3d6a60c228b6e8058770fdf8eab2f652');


var brandListAlgolia = algoliasearchHelper(clientBrands,'brands_sv');
var brandQueryAlgolia = algoliasearchHelper(clientBrands,'brands_sv');

/******RENDER Brands***************/
var brandSelectionList = $('#brandSelectionList');

var userAddedBrands = [];
var userRemovedBrands = [];

/*function getInitialBrands(){
    var list = userInitialBrands.brands;
    list.forEach( function(brand){
        userAddedBrands.push({name:brand.name, key:brand.key});
    })
    console.log('initial user brands are ', userAddedBrands)
}*/
//getInitialBrands();

function brandObjectSearch(key, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].key === key) {
            return true;
        }
    }
    return false;
}


function checkUserHasBrand(key){
    if(brandObjectSearch(key, userInitialBrands.brands)){
        return true;
    }
    else{
        return false;
    }
}

function addBrand(brand, array){
    if(!brandObjectSearch(brand.key, array)) {
        array.push(brand);
        console.log(array)

    }
}

function removeBrand(brand, array){
    for (var i=0; i < array.length; i++) {
        if (array[i].key === brand.key) {
            array.splice(i,1);
            console.log(array)
            return;
        }
    }
}

brandListAlgolia.search();

/*****************************/
function submitBrands(list, formSelector){
    var brands ={}
    brands.brandsList = list ;
    $.ajax({
        url: formSelector.attr( "action"),
        type: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data : JSON.stringify(brands),
        success: function(data) {
            window.location = data;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Weird SHIT!')

        }
    });
}

$(document).ready(function() {
    var fetching = false;
    var loading = $('#brandQueryLoading');

    brandListAlgolia.on('result', function(content) {
        var brands = content.hits;
        pageRef = content.page;
        totalPages = content.nbPages;
        var html = '';
        brands.forEach(function(brand){
            if(!checkUserHasBrand( brand.key)){
                html += '<li><input class="input value" type="checkbox" id="'+brand.name+'Selection" key="'+brand.key+'"  name="'+brand.name+'"/> <label class="label" for="'+brand.name+'Selection"> <div class="name"> '+brand.name+'</div> </label></li>';
            }
        })
        loading.slideUp();
        brandSelectionList.append(html);

        fetching = false;
    })

    brandQueryAlgolia.on('result', function(content) {
        console.log(content);
        var brands = content.hits;
        var html = '';
        if(brands.length == 0 ) html+= '<h4>Zero</h4>'
        else {
            brands.forEach(function(brand){
                html += '<li><input class="input" type="checkbox" id="'+brand.name+'Query" key="'+brand.key+'"  name="'+brand.name+'"/> <label class="label" for="'+brand.name+'Query"> <div class="name"> '+brand.name+'</div> </label></li>';
            })
        }
        loading.slideUp();
        $('#brandSelectionQuery').html(html);

    })

    function brandQueryCallback() {
        var q = $('#brandQueryInput').val()

        var brandSelector= $('#brandSelectionQuery');

        var mainSection = $('#brandSelectionList');
        var searchSection = $('#brandSelectionQuery');

        console.log(q.length);

        if(q.length ==  0){
            if(searchSection.is(':visible')) searchSection.hide();
            if(mainSection.is(':hidden')) mainSection.show();
            return;
        }

        loading.slideDown();
        brandSelector.hide();
        if(mainSection.is(':visible')) mainSection.hide();
        if(searchSection.is(':hidden')) searchSection.show();
        brandQueryAlgolia.setQuery(q).search();
    }


    $('#brandQueryInput').on( 'change', brandQueryCallback);

    $('#mainSection').on( 'change', '#brandSelectionQuery input[type=checkbox], #brandSelectionList input[type=checkbox]', function(){
        var selector = $(this);
        if( selector.is(':checked') ){

            addBrand({name: selector.attr('name'),key: selector.attr('key')}, userAddedBrands);
        }
        else{
            removeBrand({name: selector.attr('name'),key: selector.attr('key')}, userAddedBrands );
        }

        var saveCancelButton =  $('#addBrandsFormWrapper');
        if(userAddedBrands.length >0)
            saveCancelButton.show();
        else
            saveCancelButton.hide();
    });


    $('#mainSection').on( 'change', '#brandUser input[type=checkbox]', function(){
        var selector = $(this);
        if( selector.is(':checked') ){
            removeBrand( {name: selector.attr('name'),key: selector.attr('key')} , userRemovedBrands );
        }
        else{
            addBrand({name: selector.attr('name'),key: selector.attr('key')} , userRemovedBrands );
        }
        var saveCancelButton =  $('#removeBrandsFormWrapper');
        if(userRemovedBrands.length > 0)
            saveCancelButton.show();
        else
            saveCancelButton.hide();

    });


    $('#removeBrandsSubmit').on( 'click',function(){;
        submitBrands( userRemovedBrands, $('#removeBrandsForm'));
    })
    $('#removeBrandsCancel').on( 'click',function(){;
        window.location = '/settings/brands';
    })

    $('#addBrandsSubmit').on( 'click',function(){;
        submitBrands( userAddedBrands ,$('#addBrandsForm'));
    })
    $('#addBrandsCancel').on( 'click',function(){;
        window.location = '/settings/brands';
    })
    $('#goToTop').on( 'click',function(){;
        $(document).scrollTop(0);
    })

    $(window).scroll(function(event){
        var s = $(window).scrollTop(),
            d = $(document).height(),
            f = $(window).height();

        //console.log(s, f, d);

        var scrollPercentage = (s / (d-f)) * 100;
        //console.log(scrollPercentage);
        if( !fetching &&  scrollPercentage > 80 )
        {

            if((pageRef + 1) <= totalPages) {
                loading.slideDown();
                fetching = true;
                pageRef += 1;
                brandListAlgolia.setPage( pageRef ).search();
            }
        }

    });
})




