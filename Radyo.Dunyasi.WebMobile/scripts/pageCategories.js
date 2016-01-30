$(document).on('pageinit', '#pageCategories', function () {
    //açılışta tüm kategorileri getirme
    getlistViewAllCategories();

    //category item basıldığı zaman
    $(document).on('vclick', '.categoryItem', function () {
        audioPlayStop(false,'');

        category.categoryId = $(this).attr('categoryId');
        category.categoryName = $(this).attr('categoryName');
        isAllCategory = false;
        isWorkAllRadio = false;

        $.mobile.changePage("#pageAllRadios", { transition: 'slide' });
    });
});

function getlistViewAllCategories() {
    $.ajax({
        url: serviceURL + 'radio/GetCategories',
        dataType: 'json',
        success: function (data) {
            if (data.IsSuccess) {
                $('#listViewCategories li').remove();

                $.each(data.Value, function (index, category) {
                    $('#listViewCategories').append(getCategoryItem(category));
                });
                
                $('#listViewCategories').listview('refresh');
                myScrollCategories = new IScroll('#wrapperCategoriesList', { mouseWheel: true });
                //document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

                setTimeout(function () {
                    myScrollCategories.refresh();
                }, 100);
            }
            else
                alert('kategoriler alınamadı!');
        },
        error: function (xhr, ajaxOptions, thrownError) {
        },
        timeout: 30000 
    });
}

function getCategoryItem(category) {
    var categoryItem = "<li><a >Sent <span class='ui-li-count'>328</span></a></li>";

    return categoryItem;
}
