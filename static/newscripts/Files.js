// import { FileUIElement } from './FileUIElement.js'

class MyFile {

    // Fields
    name;
    extension;
    size;

    constructor(name, size) {
        this.name = name;
        this.size = size;
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
        return FileUIElement(this).render();
    }
};