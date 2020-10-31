FOLDER_IN_FOLDER_URL = '/api/folder/in_folder/';
FOLDER_URL = '/api/folder/'

FILE_IN_FOLDER_URL = '/api/file/in_folder/'
FILEMANAGER_DIV = '';
ACTUAL_FOLDER = 1;


function openFolder(id) {

    updateUploadFolder(id);

    $("#" + FILEMANAGER_DIV).html("");

    $.get(FOLDER_URL + id, function(res) {
        if (res.parent_id != null) {
            const item = {
                'id': res.parent_id,
                'name': '../',
                'size': ""
            }
            var el = CreateElementDiv(item, false);
            $("#" + FILEMANAGER_DIV).append(el);
        }
        $.get(FOLDER_IN_FOLDER_URL + id, function(res) {
            for (var i = 0; i < res.length; i++) {
                const item = {
                    'id': res[i].pk,
                    'name': res[i].name,
                    'size': "1,00 GB"
                }
                var el = CreateElementDiv(item, false);
                $("#" + FILEMANAGER_DIV).append(el);

            }
            $.get(FILE_IN_FOLDER_URL + id, function(res) {
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
        return '\
            <div onclick="openFolder(' + item.id + ');" class="item-div col-xl-3 col-lg-6 mb-4 mb-xl-0">\
                <div class="item bg-white shadow roundy p-4 h-100 d-flex align-items-center justify-content-between">\
                    <div class="flex-grow-1 d-flex align-items-center">\
                        <div class="dot mr-3 bg-primary"></div>\
                        <div class="mytext">\
                            <h6 class="truncate">' + item.name + '</h6><span class="text-gray">' + item.size + '</span>\
                        </div>\
                    </div>\
                    <div class="icon text-white bg-primary"><i class="fas fa-folder"></i></div>\
                </div>\
            </div>';
    else
        return '\
            <div onclick="openFile(' + item.id + ');" class="item-div  col-xl-3 col-lg-6 mb-4 mb-xl-0">\
                <div class="item bg-white shadow roundy p-4 h-100 d-flex align-items-center justify-content-between">\
                    <div class="flex-grow-1 d-flex align-items-center">\
                        <div class="dot mr-3 bg-secondary"></div>\
                        <div class="mytext">\
                            <h6 class="truncate">' + item.name + '</h6><span class="text-gray">' + item.size + '</span>\
                        </div>\
                    </div>\
                    <div class="icon text-white bg-secondary"><i class="fas fa-file"></i></div>\
                </div>\
            </div>';
}



function UpdateActualFolder(actualfolder) {
    ACTUAL_FOLDER = actualfolder;
    updateUploadFolder(actualfolder);
}

function SetupFileManager(filemanagerdivId, actualfolder) {
    FILEMANAGER_DIV = filemanagerdivId;
    UpdateActualFolder(actualfolder);
}