export class Transfer {
  public subject:string;
  public contacts: Array<string>;
  public id:string;

  constructor(_subject: string, _contacts: Array<string>, _id: string) {
    this.subject = _subject;
    this.contacts = _contacts;
    this.id = _id;
  }
}
