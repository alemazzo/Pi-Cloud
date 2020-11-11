
class FolderUIElement extends UIElement {

    static ICON = "";

    constructor(folder) {
        super(folder.getName(), FolderUIElement.ICON, folder.getSize());
    }
}