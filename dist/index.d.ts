export declare enum MessageType {
    Entry = "entry",
    Step = "step",
    Value = "value",
    Exit = "exit"
}
export declare class Debug {
    private readonly source;
    private readonly level;
    private static on;
    private static depth;
    private static messageTypeMask;
    constructor(source: string, level?: number);
    static initialise(value: any): void;
    write(messageType: MessageType, message?: string): void;
}
