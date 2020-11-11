
class Size {
    static BYTES = 1;
    static KILOBYTES = 1024;
    static MEGABYTES = Size.KILOBYTES * 1024;
    static GIGABYTES = Size.MEGABYTES * 1024;

    static getSize(size, type = BYTES) {
        return size / type;
    }
}
