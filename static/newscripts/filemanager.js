FOLDER_IN_FOLDER_URL = '/api/folder/in_folder/';
FOLDER_URL = '/api/folder/'

FILE_IN_FOLDER_URL = '/api/file/in_folder/'
FILEMANAGER_DIV = '';

FILES = [];



function openFolder(id) {

    updateUploadFolder(id);

    $("#" + FILEMANAGER_DIV).html("");

    $.get(FOLDER_URL + id, function (res) {
        if (res.parent_id != null) {
            const item = {
                'id': res.parent_id,
                'name': '../',
                'size': ""
            }
            var el = CreateElementDiv(item, false);
            $("#" + FILEMANAGER_DIV).append(el);
        }
        $.get(FOLDER_IN_FOLDER_URL + id, function (res) {
            for (var i = 0; i < res.length; i++) {
                const item = {
                    'id': res[i].pk,
                    'name': res[i].name,
                    'size': "1,00 GB"
                }
                var el = CreateElementDiv(item, false);
                $("#" + FILEMANAGER_DIV).append(el);

            }
            $.get(FILE_IN_FOLDER_URL + id, function (res) {
                for (var i = 0; i < res.length; i++) {
                    const item = {
                        'id': res[i].pk,
                        'name': res[i].name + '.' + res[i].extension,
                        'size': "1,00 GB"
                    }
                    var el = CreateElementDiv(item, true);
                    $("#" + FILEMANAGER_DIV).append(el);

                }
                UpdateActualFolder(id);



            })
        })


    })





}

function CreateElementDiv(item, isfile) {
    if (!isfile)
        return new FolderUIElement(new MyFolder(item.id, item.name)).render();
    else
        return new FileUIElement(new MyFile(item.id, item.name, item.size)).render();
}




