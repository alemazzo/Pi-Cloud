
class FileManager {

    // HTML Container
    container;

    rootFolder;
    actualFolder;
    parentFolder;

    files = [];
    subfolders = []


    constructor(container) {
        this.container = container;
        this.getRootFolder();
        this.actualFolder = this.rootFolder;
    }

    getRootFolder() {
        // TODO implement
        this.rootFolder = null;
    }

    openFolder() {

    }
}