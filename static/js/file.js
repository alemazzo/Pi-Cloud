
class Size {
    static BYTES = 1;
    static KILOBYTES = 1024;
    static MEGABYTES = KILOBYTES * 1024;
    static GIGABYTES = MEGABYTES * 1024;
}

class File {

    // Fields
    name;
    extension;
    size;

    constructor(name, extension, size) {
        this.name = name;
        this.extension = extension;
        this.size = size;
    }

    // *** Getters *** //

    getName() {
        return this.name;
    }

    getExtension() {
        return this.extension;
    }

    getSize(format = Size.BYTES) {
        return this.size / format;
    }



    render() {

        return `
            <div onclick="openFile(' + item.id + ');" class="item-div  col-xl-3 col-lg-6 mb-4 mb-xl-0">\
                <div class="item bg-white shadow roundy p-4 h-100 d-flex align-items-center justify-content-between">\
                    <div class="flex-grow-1 d-flex align-items-center">\
                        <div class="dot mr-3 bg-secondary"></div>\
                        <div class="mytext">\
                            <h6 class="truncate">' + item.name + '</h6><span class="text-gray">' + item.size + '</span>\
                        </div>\
                    </div>\
                    <div class="icon text-white bg-secondary"><i class="fas fa-file"></i></div>\
                </div>\
            </div>
            `
    }
};