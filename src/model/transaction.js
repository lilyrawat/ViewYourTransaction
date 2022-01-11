// Date, Transaction ID, Amount, IsApproved, Reward, Net Amount.

class Transaction {
  constructor(
    userId,
    Date,
    TransactionId,
    amount,
    isApproved,
    Reward,
    NetAmount
  ) {
    this.UserID = userId;
    this.Date = Date;
    this.TransactionId = TransactionId;
    this.Amount = amount;
    this.isApproved = isApproved;
    this.Reward = Reward;
    this.NetAmount = NetAmount;
  }
}

export default Transaction;
