import { Formik, Form, Field } from 'formik';
import { sendPayments } from '../../service/payments';
import { TransactionError } from '../../utils/constants';

interface IProps {
  signerAccountPublicKey: string;
  closeModal: () => void;
}

function SendPayment({ signerAccountPublicKey, closeModal }: IProps) {
  const INITIAL_VALUES = {
    destinationId: '',
    amount: '',
  };

  const validate = (values: any) => {
    const errors: { destinationId?: string; amount?: string } = {};
    const regExOnlyNumbersAndUppercaseLetters = /^[0-9A-Z]+$/;
    const minNumberOfCharacters = 56;
    const initialLetterOfPublicKey = 'G';

    if (!values.destinationId) {
      errors.destinationId = TransactionError.DESTINATION_ID_EMPTY;
    } else if (
      !regExOnlyNumbersAndUppercaseLetters.test(values.destinationId) ||
      values.destinationId.length !== minNumberOfCharacters ||
      values.destinationId[0] !== initialLetterOfPublicKey
    ) {
      errors.destinationId = TransactionError.INVALID_DESTINATION_ID;
    }

    if (!values.amount) {
      errors.amount = TransactionError.AMOUNT_EMPTY;
    }

    return errors;
  };

  const onSubmit = (values: any) => {
    console.log(values);
    const { destinationId, amount } = values;
    sendPayments({ signerAccountPublicKey, destinationId, amount });
  };

  return (
    <div
      className="fixed w-full z-30 min-w-[360px] min-h-screen overflow-hidden left-0 inset-y-0 text-stellar-text-primary bg-stellar-black/90"
      onClick={closeModal}
    >
      <div
        data-cy="modal-container"
        onClick={(e) => e.stopPropagation()}
        className="absolute w-4/5 max-w-[600px] bg-stellar-bg-primary z-[calc(30+1)] overflow-hidden -translate-x-2/4 translate-y-[-35%] mt-0 pt-14 pb-8 px-6 rounded-lg left-2/4 top-[35%]"
      >
        <div className="absolute cursor-pointer right-3 top-4">
          <button
            type="button"
            className="bg-transparent text-stellar-text-primary hover:text-stellar-text-tertiary rounded-lg text-sm w-8 h-8 ml-auto"
            data-cy="modal-btn-close"
            onClick={closeModal}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="overflow-y-auto max-h-[70vh] space-y-6" data-cy="send-payment-container">
          <h3 className="text-4xl text-center font-normal" data-cy="send-payment-title">
            Send Lumens
          </h3>
          <Formik initialValues={INITIAL_VALUES} onSubmit={onSubmit} validate={validate}>
            {({ errors, touched }) => (
              <Form data-cy="send-payment-form">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div className="sm:col-span-2" data-cy="send-payment-destination-id">
                    <label
                      htmlFor="destinationId"
                      className="block mb-2 text-sm font-medium text-stellar-text-primary"
                    >
                      SENDING TO
                    </label>
                    <Field
                      type="text"
                      name="destinationId"
                      placeholder="Recipient's public key or federation address"
                      className="bg-transparent border border-stellar-border-primary text-sm font-medium rounded-lg focus:ring-primary-600 focus:outline-none focus:border-stellar-btn-primary block w-full p-2.5 hover:border-stellar-text-tertiary"
                    />
                    {errors.destinationId && touched.destinationId ? (
                      <p
                        className="text-stellar-error text-sm mt-2"
                        data-cy="send-payment-destination-id-error"
                      >
                        {errors.destinationId}
                      </p>
                    ) : null}
                  </div>
                  <div className="w-full" data-cy="send-payment-amount">
                    <label
                      htmlFor="amount"
                      className="block mb-2 text-sm font-medium text-stellar-text-primary"
                    >
                      AMOUNT
                    </label>
                    <div className="flex flex-row items-center gap-4">
                      <Field
                        type="number"
                        name="amount"
                        placeholder="Amount to send"
                        className="bg-transparent border border-stellar-border-primary text-sm font-medium rounded-lg focus:ring-primary-600 focus:outline-none focus:border-stellar-btn-primary block w-full p-2.5 hover:border-stellar-text-tertiary"
                      />
                      <p className="text-base">lumens</p>
                    </div>
                    {errors.amount && touched.amount ? (
                      <p
                        className="text-stellar-error text-sm mt-2"
                        data-cy="send-payment-amount-error"
                      >
                        {errors.amount}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="flex items-center pt-6 space-x-2 justify-end">
                  <button
                    type="submit"
                    data-cy="send-payment-btn-send"
                    className="text-stellar-text-primary bg-stellar-btn-primary font-medium rounded text-sm px-5 py-2.5 text-center hover:bg-stellar-btn-hover cursor-pointer"
                  >
                    Send
                  </button>
                  <button
                    type="button"
                    data-cy="send-payment-btn-cancel"
                    onClick={closeModal}
                    className="text-stellar-link hover:bg-stellar-btn-primary hover:text-stellar-text-primary rounded border border-stellar-link text-sm font-medium px-5 py-2.5"
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default SendPayment;
