const UPLOAD_FILE_URL = '/api/file/upload/';
var UPLOAD_QUEUE = [];
var UPLOADING = false;
var FOLDER = null;
var UPLOAD_DIV;



function randomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


function uploadFile(item) {

    console.log("Uplaoding file : '" + item.file.name + "'");
    var form_data = new FormData();
    form_data.append('file', item.file);
    form_data.append('folder', item.folder);
    form_data.append('csrfmiddlewaretoken', getCookie('csrftoken'));
    $.ajax({
        xhr: function() {
            var xhr = new window.XMLHttpRequest();

            xhr.upload.addEventListener("progress", function(evt) {
                if (evt.lengthComputable) {
                    var percentComplete = evt.loaded / evt.total;
                    percentComplete = parseInt(percentComplete * 100);
                    item.onprogress(percentComplete);
                    $("#" + item.id + "-progress").html(percentComplete + "%");
                    $("#" + item.id + "-progress").width(percentComplete + "%");

                    if (percentComplete == 100) {
                        $("#" + item.id + "-progress").html("Saving...");
                    }
                }
            }, false);

            return xhr;
        },
        url: UPLOAD_FILE_URL,
        type: "POST",
        data: form_data,
        processData: false,
        contentType: false,
        success: function(result) {
            UPLOADING = false;
            $("#" + item.id + "-progress").html("Completed");
            $("#" + item.id + "-progress").removeClass('progress-bar-animated');
            setTimeout(UploadQueueProcess, 100);
            if (UPLOAD_QUEUE.length == 0)
                openFolder(FOLDER)
        },
        error: function(err) {
            $("#" + item.id + "-progress").html("Error");
            $("#" + item.id + "-progress").removeClass('progress-bar-animated');
        }
    });
}


function UploadQueueProcess() {
    if (UPLOAD_QUEUE.length > 0 && !UPLOADING) {
        UPLOADING = true;
        var item = UPLOAD_QUEUE.shift();
        uploadFile(item);
    } else {
        setTimeout(UploadQueueProcess, 500);
    }
}

function addFileToUploadQueue(file, folder, onprogress = function() {}, onfinished = function() {}) {
    const item = {
        'id': randomString(10),
        'file': file,
        'folder': folder,
        'onprogress': onprogress,
        'onfinished': onfinished
    }
    addUploadToDivList(item);
    UPLOAD_QUEUE.push(item);
}

function updateUploadFolder(folder) {
    FOLDER = folder;
}


function createUploadListItem(file) {
    var htmlstring = '\
    <a href="#" class="dropdown-item upload-item">\
    <div class="d-flex align-items-center">\
        <div id="' + file.id + '-icon" class="icon icon-sm badge-primary text-white"><i class="fas fa-upload"></i></div>\
            <div class="text ml-3">\
                <p class="mb-0">' + file.file.name + '</p>\
            </div>\
        </div>\
        <div class="progress" style="margin:10px">\
            <div id="' + file.id + '-progress" class="progress-bar progress-bar-striped progress-bar-animated" style="width:0%">0%</div>\
        </div>\
    </a>';

    return htmlstring;
}

function addUploadToDivList(file) {
    $("#" + UPLOAD_DIV).append(createUploadListItem(file));
}

function StartUploadQueueListener(dropzoneId, uploadDivId, folder) {
    UPLOAD_DIV = uploadDivId;
    updateUploadFolder(folder);
    setTimeout(UploadQueueProcess, 500);

    var dropZone = document.getElementById(dropzoneId);

    dropZone.ondrop = function(e) {
        e.preventDefault();
        this.className = 'upload-drop-zone';
        $("#uploads-dropdown").click();
        for (let index = 0; index < e.dataTransfer.files.length; index++) {
            addFileToUploadQueue(e.dataTransfer.files[index], FOLDER);
        }
    }

    dropZone.ondragover = function() {
        return false;
    }

    dropZone.ondragleave = function() {
        return false;
    }
}