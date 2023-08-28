import BalanceInfo from '../components/dashboard/BalanceInfo';
import PaymentsHistory from '../components/dashboard/PaymentsHistory';
import Transactions from '../components/dashboard/Transactions';

function DashboardWallet() {
  return (
    <main className="text-stellar-ghostwhite bg-[#292d3e]" data-cy="dashboard-main-container">
      <section className="my-8 p-8 bg-[#303448]" data-cy="dashboard-balance-section-container">
        <BalanceInfo />
      </section>
      <PaymentsHistory />
      <Transactions />
    </main>
  );
}

export default DashboardWallet;
