/**
 * Created by mohamedrizk on 13/05/16.
 */
$(document).ready(function() {
    var clientBrands = algoliasearch("D3IWZXC0AH", '3d6a60c228b6e8058770fdf8eab2f652');
    var brandListAlgolia = algoliasearchHelper(clientBrands,'brands_sv');
    var brandQueryAlgolia = algoliasearchHelper(clientBrands,'brands_sv');

    /******RENDER Brands***************/
    var brandSelectionList = $('#brandSelectionList');
    var userAddedBrands = [];
    var userRemovedBrands = [];

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
    var UserBrandsKeys = $('#yourBrands').attr('user-brand').split('/BREAK/');
    function submitBrands(list, formSelector){
        var brands ={}
        brands.brandList = list ;
        console.log(formSelector.attr( "action"))
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
    var fetching = false;
    var loading = $('#brandQueryLoading');

    brandListAlgolia.on('result', function(content) {
        var brands = content.hits.filter(function(hit){
            return UserBrandsKeys.indexOf(hit.key) == -1
        });
        pageRef = content.page;
        totalPages = content.nbPages;
        var html = '';
        brands.forEach(function(brand){
            if(!checkUserHasBrand( brand.key)){
                html += '<li><input class="input value" type="checkbox" id="'+brand.name+'Selection" _id="'+brand._id+'" key="'+brand.key+'"  name="'+brand.name+'"/> <label class="label" for="'+brand.name+'Selection"> <div class="name"> '+brand.name+'</div> </label></li>';
            }
        })
        loading.slideUp();
        brandSelectionList.append(html);

        fetching = false;
    })
    brandQueryAlgolia.on('result', function(content) {
        console.log(content);
        var brands = content.hits.filter(function(hit){
            return UserBrandsKeys.indexOf(hit.key) == -1
        });

        var html = '';
        if(brands.length == 0 ) html+= '<h4>Zero</h4>'
        else {
            brands.forEach(function(brand){
                html += '<li><input class="input" type="checkbox" id="'+brand.name+'Query" _id="'+brand._id+'" key="'+brand.key+'"  name="'+brand.name+'"/> <label class="label" for="'+brand.name+'Query"> <div class="name"> '+brand.name+'</div> </label></li>';
            })
        }
        loading.slideUp();
        $('#brandSelectionQuery').html(html);

    });
    function brandQueryCallback() {
        var q = $('#brandQueryInput').val()

        var brandSelector= $('#brandSelectionQuery');

        var mainSection = $('#brandSelectionList');
        var searchSection = $('#brandSelectionQuery');


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
    $('#brandQueryInput').keyup(function(e) {
            e.preventDefault();
            if (e.which == 13)
                brandQueryCallback();
    });
    $('#mainSection').on( 'change', '#brandSelectionQuery input[type=checkbox], #brandSelectionList input[type=checkbox]', function(){
        var selector = $(this);
        if( selector.is(':checked') ){
            addBrand({name: selector.attr('name'),key: selector.attr('key'), id: selector.attr('_id')}, userAddedBrands);
        }
        else{
            removeBrand({name: selector.attr('name'),key: selector.attr('key'), id: selector.attr('_id')}, userAddedBrands );
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
            removeBrand( {name: selector.attr('name'),key: selector.attr('key'), id: selector.attr('_id')} , userRemovedBrands );
        }
        else{
            addBrand({name: selector.attr('name'),key: selector.attr('key'), id: selector.attr('_id')} , userRemovedBrands );
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
    $('#addBrandsCancel').on( 'click',function(){
        window.location = '/settings/brands';
    })
    $('#goToTop').on( 'click',function(){;
       if(!isMobile) $(document).scrollTop(0);
        else $('.page-container').scrollTop(0);
    })

    $(window).scroll(function(event){
        if(!isMobile){
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
        }

    });
    $('.page-container').scroll(function(event){
        if(isMobile){
            var s = $('.page-container').scrollTop(),
                g = $(document).scrollTop(),
                d = $('.page-content-wrapper').height(),
                f =  $(window).height();

            var scrollPercentage = (s / d) * 100;
            console.log(scrollPercentage)
            if( !fetching &&  scrollPercentage > 70 )
            {
                if((pageRef + 1) <= totalPages) {
                    loading.slideDown();
                    fetching = true;
                    pageRef += 1;
                    brandListAlgolia.setPage( pageRef ).search();
                }
            }
        }

    });
})




