import BalanceInfo from '../components/dashboard/BalanceInfo';

function DashboardWallet() {
  return (
    <main className="text-stellar-ghostwhite" data-cy="dashboard-main-container">
      <section className="my-8 p-8 bg-[#303448]" data-cy="dashboard-balance-section-container">
        <BalanceInfo />
      </section>
    </main>
  );
}

export default DashboardWallet;
