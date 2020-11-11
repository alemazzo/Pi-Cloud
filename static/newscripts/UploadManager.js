
class UploadManager {

    static interval;
    static interval_time = 500;

    static Queue = [];
    static uploading;

    static container;

    static start(container) {

        UploadManager.container = document.getElementById(container);;

        UploadManager.container.ondrop = function (e) {
            e.preventDefault();
            this.className = 'upload-drop-zone';
            $("#uploads-dropdown").click();
            for (let index = 0; index < e.dataTransfer.files.length; index++) {
                UploadManager.addFileToUploadQueue(e.dataTransfer.files[index]);
            }
        }

        // TODO : vedere se sono inutili o meno

        UploadManager.container.ondragover = function () {
            return false;
        }

        UploadManager.container.ondragleave = function () {
            return false;
        }


        UploadManager.interval = setInterval(UploadManager.queueHandler, UploadManager.interval_time);
    }

    static uploadFile(file) {

        var form_data = new FormData();
        form_data.append('file', file.data);
        form_data.append('folder', file.folder);
        form_data.append('csrfmiddlewaretoken', UploadManager.getCookie('csrftoken'));

        $.ajax({
            xhr: function () {
                var xhr = new window.XMLHttpRequest();

                /*
                xhr.upload.addEventListener("progress", function (evt) {
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
                */
                return xhr;
            },

            // *** data format *** //
            url: Api.getUploadFileUrl(),
            type: "POST",
            data: form_data,
            processData: false,
            contentType: false,

            // *** handling state *** //
            success: function (result) {
                setTimeout(
                    () => UploadManager.uploading = false,
                    100
                );

                /*
                $("#" + item.id + "-progress").html("Completed");
                $("#" + item.id + "-progress").removeClass('progress-bar-animated');
                setTimeout(UploadQueueProcess, 100);
                */

                if (UploadManager.Queue.length == 0)
                    FileManager.openFolder(FileManager.actualFolder.id);
            },
            error: function (err) {
                setTimeout(
                    () => UploadManager.uploading = false,
                    100
                );

                /*
                $("#" + item.id + "-progress").html("Error");
                $("#" + item.id + "-progress").removeClass('progress-bar-animated');
                */
            },
        });

    }

    static queueHandler() {
        if (!UploadManager.uploading && UploadManager.Queue.length > 0) {
            UploadManager.uploading = true;
            var file = UploadManager.Queue.shift();
            UploadManager.uploadFile(file);
        }
    }

    static addFileToUploadQueue(data) {

        var file = {
            'data': data,
            'folder': FileManager.actualFolder.id,
            // 'onprogress': onprogress,
            // 'onfinished': onfinished
        }

        UploadManager.Queue.push(file);
    }






    // *** usefull functions *** //

    static getCookie(name) {
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

    static randomString(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

}