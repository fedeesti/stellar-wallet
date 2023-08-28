function BalanceInfo() {
  return (
    <section className="my-8 p-8 bg-[#303448]" data-cy="dashboard-balance-section-container">
      <div className="px-12 my-o mx-auto max-w-7xl w-full">
        <div className="flex flex-col items-center lg:flex-row lg:justify-between">
          <div className="mb-8 lg:mb-0 text-center" data-cy="dashboard-balance-information">
            <h3 className="mb-2 font-normal text-4xl">Your Balance</h3>
            <p className="text-4xl font-medium mt-2">0 Lumens (XLM)</p>
          </div>
          <div className="flex items-center gap-6" data-cy="dashboard-balance-btn-container">
            <button
              className="px-6 py-2.5 rounded-sm bg-stellar-dark-violet inline-flex items-center focus:outline-none text-center text-base font-medium"
              data-cy="dashboard-balance-btn-send"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 w-4 h-4"
              >
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path>
              </svg>
              Send
            </button>
            <button
              className="px-6 py-2.5 rounded-sm bg-stellar-dark-violet inline-flex items-center focus:outline-none text-center text-base font-medium"
              data-cy="dashboard-balance-btn-receive"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="mr-2 w-4 h-4"
              >
                <path d="M1.333 0C.597 0 0 .597 0 1.333v5.334C0 7.403.597 8 1.333 8h5.334C7.403 8 8 7.403 8 6.667V1.333C8 .597 7.403 0 6.667 0zm9.334 0v2.667h2.666V0zm6.666 0C16.597 0 16 .597 16 1.333v5.334C16 7.403 16.597 8 17.333 8h5.334C23.403 8 24 7.403 24 6.667V1.333C24 .597 23.403 0 22.667 0zM2.667 2.667h2.666v2.666H2.667zm16 0h2.666v2.666h-2.666zm-8 2.666V8h2.666V5.333zM0 10.667v2.666h2.667v-2.666zm5.333 0v2.666H8v-2.666zm5.334 0v2.666h2.666v-2.666zm2.666 2.666V16H16v-2.667zm2.667 0h2.667v-2.666H16zm2.667 0V16h2.666v-2.667zm2.666 0H24v-2.666h-2.667zm0 2.667v2.667H24V16zm0 2.667h-2.666v2.666h2.666zm0 2.666V24H24v-2.667zm-2.666 0H16V24h2.667zm-2.667 0v-2.666h-2.667v2.666zm-2.667 0h-2.666V24h2.666zm0-2.666V16h-2.666v2.667zm2.667 0h2.667V16H16zM1.333 16C.597 16 0 16.597 0 17.333v5.334C0 23.403.597 24 1.333 24h5.334C7.403 24 8 23.403 8 22.667v-5.334C8 16.597 7.403 16 6.667 16zm1.334 2.667h2.666v2.666H2.667z"></path>
              </svg>
              Receive
            </button>
          </div>
        </div>
        <div
          className="mt-12 font-normal text-3xl"
          data-cy="dashboard-balance-public-key-container"
        >
          <h3 className="mb-2">Your Stellar Public Key</h3>
          <code className="mb-6 font-medium line-break border border-solid border-[#3a3e4d] py-0.5 px-1  ">
            GA3I3AZQQXV7PSGOZ74JLDV7VEIUDEBMWHUTTTZLIBW3ZIJFWORTL2HF
          </code>
        </div>
      </div>
    </section>
  );
}

export default BalanceInfo;
