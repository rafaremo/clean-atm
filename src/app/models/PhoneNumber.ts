export class PhoneNumber {
  country: string;
  area: string;
  line: string;

  // format phone numbers as E.164
  get e164() {
    const num = this.country + this.area + this.line;
    return `+${num}`
  }

}