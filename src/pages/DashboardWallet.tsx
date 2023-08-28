import BalanceInfo from '../components/dashboard/BalanceInfo';
import PaymentsHistory from '../components/dashboard/PaymentsHistory';

function DashboardWallet() {
  return (
    <main className="text-stellar-ghostwhite" data-cy="dashboard-main-container">
      <section className="my-8 p-8 bg-[#303448]" data-cy="dashboard-balance-section-container">
        <BalanceInfo />
      </section>
      <PaymentsHistory />
    </main>
  );
}

export default DashboardWallet;
