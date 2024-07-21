export declare enum MessageType {
    Entry = "entry",
    Step = "step",
    Value = "value",
    Exit = "exit"
}
export declare class Debug {
    #private;
    private readonly source;
    constructor(source: string);
    static initialise(value: any): void;
    write(messageType: MessageType, message?: string): void;
    private static _sourcePattern;
}
