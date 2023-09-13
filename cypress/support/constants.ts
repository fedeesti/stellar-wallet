export const URL_HORIZON = Cypress.env('URL_HORIZON');
export const privateKey = 'SANEPI74NFPALZ4JOUTRBOUJGVFOFRKRQT2BZN3UR5ULVEN4FJKT7GRF';
export const signerAccountPublicKey = 'GA3I3AZQQXV7PSGOZ74JLDV7VEIUDEBMWHUTTTZLIBW3ZIJFWORTL2HF';
export const destinationId = 'GBLIWVH4PMJDPGOO7BOHI53GTTL6XXL6EMQP7USWTQOWOK4UZEGDB2S3';
export const amount = '10';
export const urlAccountViewer = 'https://accountviewer.stellar.org';

export const URL_TRANSACTION_HISTORY = `${URL_HORIZON}/accounts/${signerAccountPublicKey}/payments?order=desc&limit=100`;
