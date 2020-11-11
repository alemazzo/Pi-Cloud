
class FolderUIElement extends UIElement {

    static ICON = "fas fa-folder";

    constructor(folder) {
        super(folder.getName(), FolderUIElement.ICON, 0, `FileManager.openFolder(${folder.id})`);
    }
}