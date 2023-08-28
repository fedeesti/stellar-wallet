function PaymentsHistory() {
  return (
    <section className="bg-[#292d3e] px-8 mb-12">
      <div className="mb-8">
        <h3 className="mb-4 font-medium text-4xl">Payments History</h3>
        <p className="text-sm mb-4">Hiding payments smaller than 0.5 XLM</p>
      </div>
      <div className="relative overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase">
            <tr className="border-b border-[#3a3e4d]">
              <th scope="col" className="px-6 py-4 bg-[#303448]">
                DATE/TIME
              </th>
              <th scope="col" className="px-6 py-3">
                ADDRESS
              </th>
              <th scope="col" className="px-6 py-3">
                AMOUNT
              </th>
              <th scope="col" className="px-6 py-3">
                MEMO
              </th>
              <th scope="col" className="pl-6 py-3">
                OPERATION ID
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#3a3e4d]">
              <td className="px-6 py-4 text-sm bg-[#303448]">8/2/1992 17:00</td>
              <td className="px-6 py-4 text-xs">GAAAA…AAAAA</td>
              <td className="px-6 py-4 text-xs">+50,61 XLM</td>
              <td className="px-6 py-4 text-xs"></td>
              <td className="pl-6 py-4 text-xs">$2999</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default PaymentsHistory;
