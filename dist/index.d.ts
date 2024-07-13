export declare enum MessageType {
    Entry = "entry",
    Step = "step",
    Value = "value",
    Exit = "exit"
}
export declare class Debug {
    private readonly source;
    private static on;
    private static sourcePattern;
    private static messageTypeMask;
    constructor(source: string);
    static initialise(value: any): void;
    write(messageType: MessageType, message?: string): void;
    private static _sourcePattern;
}
