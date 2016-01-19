$(document).on('pageinit', '#pageCategories', function () {
    //açılışta tüm kategorileri getirme
    getlistViewAllCategories();

    //category item basıldığı zaman
    $(document).on('vclick', '.categoryItem', function () {
        audioPlayStop(false,'');

        category.categoryId = $(this).attr('categoryId');
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
                AddScroll("wrapperCategoriesList");
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
    var categoryItem = "<li data-icon='false'> \
                    <a class='categoryItem' categoryId=" + category.Id + "> \
                        <h>" + category.Name + "</h> \
                        <p style='background-color:#CCCCFF;font-size:14px'>1 radyo</p>\
                    </a>\
                </li>";

    return categoryItem;
}
