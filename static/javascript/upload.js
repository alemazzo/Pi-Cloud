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
    $("#" + item.id).addClass("active");
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
            $("#" + item.id).removeClass('active');
            setTimeout(UploadQueueProcess, 100);
            item.onfinished(result)
        },
        error: function(err) {
            $("#" + item.id).removeClass('active');
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
    var htmlstring = '';
    htmlstring += '<li class="list-group-item" id="' + file.id + '"><p id="' + file.id + '-progress">0%</p>' + file.file.name + '</li>';
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
        for (let index = 0; index < e.dataTransfer.files.length; index++) {
            addFileToUploadQueue(e.dataTransfer.files[index], FOLDER);
        }
    }

    dropZone.ondragover = function() {
        this.className = 'upload-drop-zone drop';
        return false;
    }

    dropZone.ondragleave = function() {
        this.className = 'upload-drop-zone';
        return false;
    }
}