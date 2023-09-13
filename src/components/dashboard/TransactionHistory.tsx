import Transaction from '../../domain/Transaction';

interface IProps {
  transactions: Transaction[];
}

function TransactionHistory(transactions: IProps) {
  return (
    <section className="bg-[#292d3e] px-8 mb-12" data-cy="dashboard-payment-container">
      <div className="mb-8" data-cy="dashboard-payment-header-container">
        <h3 className="mb-4 font-medium text-4xl">Payments History</h3>
        <p className="text-sm mb-4">Hiding payments smaller than 0.5 XLM</p>
      </div>
      <div className="relative overflow-x-auto sm:rounded-lg">
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
            {transactions.transactions.map((transaction: Transaction) => {
              return (
                <tr className="border-b border-[#3a3e4d]" key={transaction.operationId}>
                  <td className="px-6 py-4 text-sm bg-[#303448]">{transaction.date}</td>
                  <td className="px-6 py-4 text-xs">{transaction.address}</td>
                  <td className="px-6 py-4 text-xs">{transaction.amount}</td>
                  <td className="pl-6 py-4 text-xs">{transaction.operationId}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TransactionHistory;
