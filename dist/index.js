"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Debug = exports.MessageType = void 0;
var MessageType;
(function (MessageType) {
    MessageType["Entry"] = "entry";
    MessageType["Step"] = "step";
    MessageType["Value"] = "value";
    MessageType["Exit"] = "exit";
})(MessageType || (exports.MessageType = MessageType = {}));
class Debug {
    constructor(context, level = 1) {
        this.context = context;
        this.level = level;
    }
    static initialise(value) {
        if (typeof value !== 'boolean' || value == true) {
            Debug.on = true;
        }
        if (Debug.on) {
            const groups = /^(\d*):?([01]{0,4})$/.exec(value);
            if (groups) {
                if (groups[1]) {
                    Debug.depth = parseInt(groups[1]);
                }
                if (groups[2]) {
                    Debug.messageTypeMask = groups[2].padEnd(4, '0');
                }
            }
        }
    }
    write(messageType, message) {
        if (Debug.on &&
            this.level <= Debug.depth &&
            Object.values(MessageType)
                .filter((x, i) => parseInt(Debug.messageTypeMask.charAt(i)))
                .includes(messageType)) {
            console.log(`[${this.level}:${this.context}:${messageType}]` +
                (message ? ` ${message}` : ''));
        }
    }
}
exports.Debug = Debug;
Debug.on = false;
Debug.depth = Number.MAX_SAFE_INTEGER;
Debug.messageTypeMask = '1111';
