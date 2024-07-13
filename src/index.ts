export enum MessageType {
  Entry = 'entry',
  Step = 'step',
  Value = 'value',
  Exit = 'exit',
}

export class Debug {
  private static on: boolean = false;
  private static sourcePattern: string = '^(.*)$';
  private static messageTypeMask: string = '1111';

  constructor(private readonly source: string) {}

  public static initialise(value: any) {
    if (
      !['undefined', 'boolean'].includes(typeof value) ||
      (typeof value == 'boolean' && value == true)
    ) {
      Debug.on = true;
      if (typeof value !== 'boolean') {
        const groups = /^([%,\-.0-9A-Z_a-z]*):?([01]{0,4})$/.exec(value);
        if (groups) {
          if (groups[1]) {
            Debug.sourcePattern = Debug.sourcePattern.replace(
              '.*',
              this._sourcePattern(groups[1])
            );
          }
          if (groups[2]) {
            Debug.messageTypeMask = groups[2].padEnd(4, '0');
          }
        }
      }
    }
  }

  public write(messageType: MessageType, message?: string) {
    if (
      Debug.on &&
      RegExp(Debug.sourcePattern).test(this.source) &&
      Object.values(MessageType)
        .filter((x, i) => parseInt(Debug.messageTypeMask.charAt(i)))
        .includes(messageType)
    ) {
      console.log(
        `[${this.source}:${messageType}]` + (message ? ` ${message}` : '')
      );
    }
  }

  private static _sourcePattern(filter: string) {
    return filter
      .split(',')
      .map((x) =>
        x
          .replace(/\./g, '?')
          .replace(/_/g, '.')
          .replace(/%/g, '.*')
          .replace(/\?/g, '\\.')
      )
      .join('|');
  }
}
