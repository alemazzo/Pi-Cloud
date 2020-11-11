class MyFolder {

    // Fields
    id;
    name;

    constructor(id, name) {
        this.id = id;
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