import BalanceInfo from '../components/dashboard/BalanceInfo';

function DashboardWallet() {
  return (
    <main className="text-stellar-ghostwhite" data-cy="dashboard-main-container">
      <section className="my-8 px-8 bg-[#303448]" data-cy="dashboard-balance-section-container">
        <div className="px-12 my-o mx-auto max-w-7xl w-full">
          <BalanceInfo />
        </div>
      </section>
    </main>
  );
}

export default DashboardWallet;
