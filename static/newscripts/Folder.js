class MyFolder {

    // Fields
    id;
    name;
    parentId;

    constructor(id, name, parentId) {
        this.id = id;
        this.name = name;
        this.parentId = parentId;
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