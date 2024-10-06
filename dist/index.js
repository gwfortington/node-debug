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
    /**
     * Initialize the Debug class to enable debug messaging. If `value` is a
     * boolean, it enables or disables debug messaging. If `value` is a string, it
     * specifies a filter to match the source of the messages and an optional
     * message type mask (separated by a colon).
     *
     * The filter is a comma-separated list of glob patterns. The message type
     * mask is a four-character string where each character is a 1 or 0, where 1
     * enables messages of the corresponding type (entry, step, value, exit).
     *
     * For example, to enable all messages for sources starting with `foo` and
     * messages of type `step` and `value`, use `Debug.initialize('foo%:011')`.
     *
     * @param value A boolean to enable or disable debug messaging or a string to
     * specify a filter to match the source of the messages and an optional
     * message type mask.
     */
    static initialize(value = false) {
        if (typeof value == 'boolean' ? value : true) {
            __classPrivateFieldSet(_a, _a, true, "f", _Debug_on);
            if (typeof value == 'string') {
                const [sourceFilter, messageTypeMask = ''] = value.split(':');
                if (sourceFilter) {
                    __classPrivateFieldSet(_a, _a, __classPrivateFieldGet(_a, _a, "f", _Debug_sourcePattern).replace('.*', _a.getSourcePattern(sourceFilter)), "f", _Debug_sourcePattern);
                }
                if (messageTypeMask) {
                    __classPrivateFieldSet(_a, _a, messageTypeMask.padEnd(4, '0'), "f", _Debug_messageTypeMask);
                }
            }
        }
    }
    /**
     * Write a debug message to the console if the class is initialized.
     *
     * @param messageType The type of the message (entry, step, value, exit).
     * @param message An optional message to include in the output.
     */
    write(messageType, message) {
        if (__classPrivateFieldGet(_a, _a, "f", _Debug_on) &&
            this.matchesSourcePattern() &&
            this.matchesMessageType(messageType)) {
            console.log(`[${this.source}:${messageType}]` + (message ? ` ${message}` : ''));
        }
    }
    /**
     * Replace special characters in the given filter string to form a regular
     * expression pattern that matches the source of the messages.
     *
     * @param filter A comma-separated list of glob patterns to match the source
     * of the messages.
     * @returns A regular expression pattern that matches the source of the messages.
     */
    static getSourcePattern(filter) {
        return filter
            .split(',')
            .map((x) => x
            .replace(/\./g, '?')
            .replace(/_/g, '.')
            .replace(/%/g, '.*')
            .replace(/\?/g, '\\.'))
            .join('|');
    }
    /**
     * Test if the current source matches the configured source pattern.
     *
     * @returns If the source matches the pattern.
     */
    matchesSourcePattern() {
        return RegExp(__classPrivateFieldGet(_a, _a, "f", _Debug_sourcePattern)).test(this.source);
    }
    /**
     * Test if the given message type is enabled by the configured message type
     * mask.
     *
     * @param messageType The message type to test.
     * @returns If the message type is enabled.
     */
    matchesMessageType(messageType) {
        return Object.values(MessageType)
            .filter((x, i) => parseInt(__classPrivateFieldGet(_a, _a, "f", _Debug_messageTypeMask).charAt(i)))
            .includes(messageType);
    }
}
exports.Debug = Debug;
_a = Debug;
_Debug_on = { value: false };
_Debug_sourcePattern = { value: '^(.*)$' };
_Debug_messageTypeMask = { value: '1111' };
