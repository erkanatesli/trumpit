export class Transfer {
  public filename:string;
  public contacts: Array<string>;
  public options: Array<string>;

  constructor(_filename: string, _contacts: Array<string>, _options:Array<string>) {
    this.filename = _filename;
    this.contacts = _contacts;
    this.options = _options;
  }
}
