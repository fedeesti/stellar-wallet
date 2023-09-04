function Transactions() {
  return (
    <section className="bg-[#292d3e] px-8 mb-12" data-cy="dashboard-transaction-container">
      <div className="mb-8" data-cy="dashboard-transaction-header-container">
        <h3 className="mb-4 font-medium text-4xl">Liquidity Pool Transactions</h3>
        <p className="text-sm mb-4">There are no recent liquidity pool transactions to show</p>
      </div>
    </section>
  );
}

export default Transactions;
