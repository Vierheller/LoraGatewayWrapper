export class ImageFile {
    public path: string;
    public fileName: string;
    public count: number;
    public appearDate: Date;

    constructor(path: string, fileName: string, count: number, appearDate: Date) {
        this.path = path;
        this.fileName = fileName;
        this.count = count;
        this.appearDate = appearDate;
    }

    public toString(): string {
        return "path: " + this.path + " fileName: " + this.fileName + " count: "
            + this.count + " appeared:" + this.appearDate;
    }
}
