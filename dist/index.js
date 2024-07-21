"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _Debug_on, _Debug_sourcePattern, _Debug_messageTypeMask;
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
            __classPrivateFieldSet(_a, _a, true, "f", _Debug_on);
            if (typeof value !== 'boolean') {
                const groups = /^([%,\-.0-9A-Z_a-z]*):?([01]{0,4})$/.exec(value);
                if (groups) {
                    if (groups[1]) {
                        __classPrivateFieldSet(_a, _a, __classPrivateFieldGet(_a, _a, "f", _Debug_sourcePattern).replace('.*', this._sourcePattern(groups[1])), "f", _Debug_sourcePattern);
                    }
                    if (groups[2]) {
                        __classPrivateFieldSet(_a, _a, groups[2].padEnd(4, '0'), "f", _Debug_messageTypeMask);
                    }
                }
            }
        }
    }
    write(messageType, message) {
        if (__classPrivateFieldGet(_a, _a, "f", _Debug_on) &&
            RegExp(__classPrivateFieldGet(_a, _a, "f", _Debug_sourcePattern)).test(this.source) &&
            Object.values(MessageType)
                .filter((x, i) => parseInt(__classPrivateFieldGet(_a, _a, "f", _Debug_messageTypeMask).charAt(i)))
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
_a = Debug;
_Debug_on = { value: false };
_Debug_sourcePattern = { value: '^(.*)$' };
_Debug_messageTypeMask = { value: '1111' };
