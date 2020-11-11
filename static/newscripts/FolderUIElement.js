
class FolderUIElement extends UIElement {

    static ICON = "fas fa-folder";

    constructor(folder) {
        super(folder.getName(), FolderUIElement.ICON, folder.getSize());
    }
}