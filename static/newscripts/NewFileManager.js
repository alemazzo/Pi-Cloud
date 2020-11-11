
class FileManager {

    // HTML Container
    static container;

    static rootFolder;
    static actualFolder;
    static parentFolder;

    static files = [];
    static subfolders = []


    constructor(container) {
        FileManager.container = container;
        FileManager.getRootFolder();
        FileManager.actualFolder = FileManager.rootFolder;
    }

    getRootFolder() {
        // TODO implement
        FileManager.rootFolder = null;
    }

    openFolder(folderId) {

        $.get(Api.getFolderByIdUrl(folderId), function (item) {
            FileManager.actualFolder =
                new Folder(item.id, item.name, item.parent_id);

        }).success(function () {


            $.get(Api.getFoldersInFolderByIdUrl(FileManager.actualFolder.id),
                function (items) {
                    FileManager.subfolders = [];
                    items.forEach(item => {
                        FileManager.subfolders.add(
                            new MyFolder(item.id, item.name, item.parent_id)
                        );
                    });

                }).success(function () {


                    $.get(Api.getFilesInFolderByIdUrl(FileManager.actualFolder.id),
                        function (items) {
                            FileManager.files = [];
                            items.forEach(item => {
                                FileManager.files.add(
                                    new MyFile(item.id, item.name, 1024 * 1024 * 2)
                                );
                            });
                        });
                })
        });
    }

}