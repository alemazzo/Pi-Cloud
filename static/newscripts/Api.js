class Api {

    static FOLDERS = '/api/folder/'
    static FOLDERS_IN_FOLDER = '/api/folder/in_folder/';
    static FILES_IN_FOLDER = '/api/file/in_folder/'

    static getFolderByIdUrl(folderId) {
        return Api.FOLDERS + folderId;
    }

    static getFoldersInFolderByIdUrl(folderId) {
        return Api.FOLDERS_IN_FOLDER + folderId;
    }

    static getFilesInFolderByIdUrl(folderId) {
        return Api.FILES_IN_FOLDER + folderId;
    }

}