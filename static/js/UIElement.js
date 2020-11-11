class UIElement {

    name;
    icon;
    size;

    constructor(name, icon, size) {
        this.name = name;
        this.icon = icon;
        this.size = size;
    }

    render() {
        return `
            <div class="item-div col-xl-3 col-lg-6 mb-4 mb-xl-0"
                onclick="openFile(' + item.id + ');">

                <div class="item bg-white shadow roundy p-4 h-100 d-flex align-items-center justify-content-between">
                    
                    <div class="flex-grow-1 d-flex align-items-center">

                        <div class="dot mr-3 bg-secondary"></div>

                        <div class="mytext">
                            <p class="truncate">' + item.name + '</p>
                            <span class="text-gray">${this.size}</span>
                        </div>

                    </div>

                    <div class="icon text-white bg-secondary"><i class="${this.icon}}"></i></div>
                
                </div>

            </div>
            `
    }
}

class FileUIElement extends UIElement {

    static ICON = "fas fa-file";

    constructor(file) {
        if (file.getSize(Size.MEGABYTES))
            super(file.name, FileUIElement.ICON, file.getSize());
    }
}