export enum MessageType {
  Entry = 'entry',
  Step = 'step',
  Value = 'value',
  Exit = 'exit',
}

export class Debug {
  private static on: boolean = false;
  private static depth: number = Number.MAX_SAFE_INTEGER;
  private static messageTypeMask: string = '1111';

  constructor(
    private readonly context: string,
    private readonly level: number = 1
  ) {}

  public static initialise(value: any) {
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

  public write(messageType: MessageType, message?: string) {
    if (
      Debug.on &&
      this.level <= Debug.depth &&
      Object.values(MessageType)
        .filter((x, i) => parseInt(Debug.messageTypeMask.charAt(i)))
        .includes(messageType)
    ) {
      console.log(
        `[${this.level}:${this.context}:${messageType}]` +
          (message ? ` ${message}` : '')
      );
    }
  }
}
