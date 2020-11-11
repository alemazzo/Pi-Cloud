class UIElement {

    name;
    icon;
    size;

    constructor(name, icon, size) {
        this.name = name;
        this.icon = icon;
        this.size = size;
    }

    _renderName() {
        return `${this.name}`;
    }

    _renderSize() {
        if (Size.getSize(this.size, Size.GIGABYTES) >= 1) return `${Size.getSize(this.size, Size.GIGABYTES)} GB`
        if (Size.getSize(this.size, Size.MEGABYTES) >= 1) return `${Size.getSize(this.size, Size.MEGABYTES)} MB`
        if (Size.getSize(this.size, Size.KILOBYTES) >= 1) return `${Size.getSize(this.size, Size.KILOBYTES)} KB`
        return `${Size.getSize(this.size, Size.BYTES)} B`
    }

    render() {
        return `
            <div class="item-div col-xl-3 col-lg-6 mb-4 mb-xl-0"
                onclick="">

                <div class="item bg-white shadow roundy p-4 h-100 d-flex align-items-center justify-content-between">
                    
                    <div class="flex-grow-1 d-flex align-items-center">

                        <div class="dot mr-3 bg-secondary"></div>

                        <div class="mytext">
                            <p class="truncate">${this._renderName()}</p>
                            <span class="text-gray">${this._renderSize()}</span>
                        </div>

                    </div>

                    <div class="icon text-white bg-secondary"><i class="${this.icon}}"></i></div>
                
                </div>

            </div>
            `
    }
}
