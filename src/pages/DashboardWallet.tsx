import Balance from '../components/dashboard/Balance';
import TransactionHistory from '../components/dashboard/TransactionHistory';
import Transactions from '../components/dashboard/Transactions';

function DashboardWallet() {
  return (
    <main className="text-stellar-ghostwhite bg-[#292d3e]" data-cy="dashboard-main-container">
      <Balance publicKey="GA3I3AZQQXV7PSGOZ74JLDV7VEIUDEBMWHUTTTZLIBW3ZIJFWORTL2HF" />
      <TransactionHistory />
      <Transactions />
    </main>
  );
}

export default DashboardWallet;
