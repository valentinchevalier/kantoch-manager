export default {
  moneyDepositsTotalAmount(regularCustomer) {
    return !regularCustomer.moneyDeposits ? 0 : Object.values(regularCustomer.moneyDeposits)
      .reduce((total, deposit) => total + deposit.amount, 0);
  },
  ordersPrice(regularCustomer) {
    return Object.values(regularCustomer.orders)
      .reduce((total, order) => total + order.amount, 0);
  },
  creditTotalAmount(regularCustomer) {
    return regularCustomer.startAmount + this.moneyDepositsTotalAmount(regularCustomer);
  },
  debitTotalAmount(regularCustomer) {
    return this.ordersPrice(regularCustomer);
  },
  balanceAmount(regularCustomer) {
    return this.creditTotalAmount(regularCustomer) - this.debitTotalAmount(regularCustomer);
  },
};
