class MyFolder {

    // Fields
    name;

    constructor(name) {
        this.name = name;
    }

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