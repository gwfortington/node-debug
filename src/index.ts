export enum MessageType {
  Entry = 'entry',
  Step = 'step',
  Value = 'value',
  Exit = 'exit',
}

export class Debug {
  static #on: boolean = false;
  static #sourcePattern: string = '^(.*)$';
  static #messageTypeMask: string = '1111';

  constructor(private readonly source: string) {}

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
  static initialize(value: string | boolean = false) {
    if (typeof value == 'boolean' ? value : true) {
      Debug.#on = true;

      if (typeof value == 'string') {
        const [sourceFilter, messageTypeMask = ''] = value.split(':');

        if (sourceFilter) {
          Debug.#sourcePattern = Debug.#sourcePattern.replace(
            '.*',
            sourceFilter
              .split(',')
              .map((x) =>
                x
                  .replace(/\./g, '?')
                  .replace(/_/g, '.')
                  .replace(/%/g, '.*')
                  .replace(/\?/g, '\\.'),
              )
              .join('|'),
          );
        }

        if (messageTypeMask) {
          Debug.#messageTypeMask = messageTypeMask.padEnd(4, '0');
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
  write(messageType: MessageType, message?: string): void {
    if (
      Debug.#on &&
      RegExp(Debug.#sourcePattern).test(this.source) &&
      Object.values(MessageType)
        .filter((x, i) => parseInt(Debug.#messageTypeMask.charAt(i)))
        .includes(messageType)
    ) {
      console.log(
        `[${this.source}:${messageType}]` + (message ? ` ${message}` : ''),
      );
    }
  }
}
