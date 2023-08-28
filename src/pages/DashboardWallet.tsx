import BalanceInfo from '../components/dashboard/BalanceInfo';
import PaymentsHistory from '../components/dashboard/PaymentsHistory';
import Transactions from '../components/dashboard/Transactions';

function DashboardWallet() {
  return (
    <main className="text-stellar-ghostwhite bg-[#292d3e]" data-cy="dashboard-main-container">
      <BalanceInfo />
      <PaymentsHistory />
      <Transactions />
    </main>
  );
}

export default DashboardWallet;
