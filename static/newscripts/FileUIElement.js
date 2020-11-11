// import { UIElement } from './UIElement.js'

class FileUIElement extends UIElement {

    static ICON = "fas fa-file";

    constructor(file) {
        super(`${file.getName()}.${file.getExtension()}`, FileUIElement.ICON, file.getSize());
    }
}
