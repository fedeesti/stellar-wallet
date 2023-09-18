export default class Transaction {
  constructor(
    public date: string,
    public profile: string,
    public address: string,
    public amount: string,
    public operationId: string,
  ) {}
}
