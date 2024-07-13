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
    constructor(source) {
        this.source = source;
    }
    static initialise(value) {
        if (!['undefined', 'boolean'].includes(typeof value) ||
            (typeof value == 'boolean' && value == true)) {
            Debug.on = true;
            if (typeof value !== 'boolean') {
                const groups = /^([%,\-.0-9A-Z_a-z]*):?([01]{0,4})$/.exec(value);
                if (groups) {
                    if (groups[1]) {
                        Debug.sourcePattern = Debug.sourcePattern.replace('.*', this._sourcePattern(groups[1]));
                    }
                    if (groups[2]) {
                        Debug.messageTypeMask = groups[2].padEnd(4, '0');
                    }
                }
            }
        }
    }
    write(messageType, message) {
        if (Debug.on &&
            RegExp(Debug.sourcePattern).test(this.source) &&
            Object.values(MessageType)
                .filter((x, i) => parseInt(Debug.messageTypeMask.charAt(i)))
                .includes(messageType)) {
            console.log(`[${this.source}:${messageType}]` + (message ? ` ${message}` : ''));
        }
    }
    static _sourcePattern(filter) {
        return filter
            .split(',')
            .map((x) => x
            .replace(/\./g, '?')
            .replace(/_/g, '.')
            .replace(/%/g, '.*')
            .replace(/\?/g, '\\.'))
            .join('|');
    }
}
exports.Debug = Debug;
Debug.on = false;
Debug.sourcePattern = '^(.*)$';
Debug.messageTypeMask = '1111';
