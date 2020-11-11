// import { FileUIElement } from './FileUIElement.js'

class MyFile {

    // Fields
    id;
    name;
    extension;
    size;
    folder;

    constructor(id, name, size, folder) {
        this.id = id;
        this.name = name;
        this.size = size;
        this.folder = folder;
    }
    /*
    constructor(name, extension, size) {
        this.name = name;
        this.extension = extension;
        this.size = size;
    }
    */

    // *** Getters *** //

    getName() {
        return this.name;
    }

    getExtension() {
        return this.extension;
    }

    getSize() {
        return this.size;
    }

    // *** Call to render *** //

    render() {
        return new FileUIElement(this).render();
    }
};