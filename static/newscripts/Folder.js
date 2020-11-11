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

    // *** Call to render *** //

    render() {
        return FolderUIElement(this).render();
    }
};