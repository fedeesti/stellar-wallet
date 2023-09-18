import Transaction from '../../domain/Transaction';

interface IProps {
  transactions: Transaction[];
}

function TransactionHistory(transactions: IProps) {
  const { transactions: records } = transactions;
  return (
    <section className="bg-[#292d3e] px-8 mb-12" data-cy="dashboard-payment-container">
      <h3 className="mb-4 font-medium text-4xl">Payments History</h3>
      {records.length === 0 ? (
        <p className="text-base mb-8" data-cy="dashboard-payment-info-without-transaction">
          There are no payments to show
        </p>
      ) : (
        <div className="relative overflow-x-auto sm:rounded-lg">
          <p className="text-sm mb-8" data-cy="dashboard-payment-header-info-with-transaction">
            Hiding payments smaller than 0.5 XLM
          </p>
          <table
            className="w-full text-sm text-left text-gray-500"
            data-cy="dashboard-payment-table-container"
          >
            <thead className="text-xs text-gray-700 uppercase">
              <tr className="border-b border-[#3a3e4d]" data-cy="dashboard-payment-thead">
                <th scope="col" className="px-6 py-4 bg-[#303448]">
                  DATE/TIME
                </th>
                <th scope="col" className="px-6 py-3">
                  ADDRESS
                </th>
                <th scope="col" className="px-6 py-3">
                  AMOUNT
                </th>
                <th scope="col" className="pl-6 py-3">
                  OPERATION ID
                </th>
              </tr>
            </thead>
            <tbody data-cy="dashboard-payment-tbody">
              {records.map((transaction: Transaction) => {
                return (
                  <tr className="border-b border-[#3a3e4d]" key={transaction.operationId}>
                    <td className="px-6 py-4 text-sm bg-[#303448]">{transaction.date}</td>
                    <td className="px-6 py-4 text-xs flex flex-row items-center gap-2">
                      <div className="w-11 h-11 bg-stellar-bg-secondary border border-stellar-border-primary rounded-full flex items-center justify-center">
                        <img
                          src={transaction.profile}
                          alt="Transaction icon"
                          className="w-[45%] h-[45%]"
                          data-cy="dashboard-payment-tbody-icon-profile"
                        />
                      </div>
                      {transaction.address}
                    </td>
                    <td className="px-6 py-4 text-xs">{transaction.amount}</td>
                    <td className="pl-6 py-4 text-xs">{transaction.operationId}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default TransactionHistory;
