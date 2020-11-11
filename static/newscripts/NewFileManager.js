
class FileManager {

    // HTML Container
    static container;

    static rootFolder;
    static actualFolder;
    static parentFolder;

    static files = [];
    static subfolders = []


    static start(container) {
        FileManager.container = container;
        FileManager.getRootFolder();
        FileManager.actualFolder = FileManager.rootFolder;
        FileManager.openFolder(FileManager.actualFolder.id);
    }

    static getRootFolder() {
        // TODO implement
        FileManager.rootFolder = new MyFolder(1, "root", null);
    }

    static openFolder(folderId) {

        $.get(Api.getFolderByIdUrl(folderId), function (item) {
            FileManager.actualFolder =
                new MyFolder(item.pk, item.name, item.parent_id);


            $.get(Api.getFoldersInFolderByIdUrl(FileManager.actualFolder.id),
                function (items) {
                    FileManager.subfolders = [];
                    items.forEach(item => {
                        FileManager.subfolders.push(
                            new MyFolder(item.pk, item.name, item.parent_id)
                        );
                    });

                    $.get(Api.getFilesInFolderByIdUrl(FileManager.actualFolder.id),
                        function (items) {
                            FileManager.files = [];
                            items.forEach(item => {
                                FileManager.files.push(
                                    new MyFile(item.id, item.name, 1024 * 1024 * 2)
                                );
                            });

                            FileManager.renderAll();
                        });

                });
        });
    }

    static renderAll() {
        var container = $(`#${FileManager.container}`);
        container.html("");
        FileManager.subfolders.forEach((item) => {
            container.append(item.render());
        });
        FileManager.files.forEach((item) => {
            container.append(item.render());
        });
    }
}