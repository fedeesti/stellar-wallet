import Balance from '../components/dashboard/Balance';
import PaymentsHistory from '../components/dashboard/PaymentsHistory';
import Transactions from '../components/dashboard/Transactions';

function DashboardWallet() {
  return (
    <main className="text-stellar-ghostwhite bg-[#292d3e]" data-cy="dashboard-main-container">
      <Balance />
      <PaymentsHistory />
      <Transactions />
    </main>
  );
}

export default DashboardWallet;
