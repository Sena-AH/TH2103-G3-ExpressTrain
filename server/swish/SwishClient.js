const { default: axios } = require("axios");
const { nextTick } = require("process");
const { v4: uuidv4 } = require("uuid");

// possible mss endpoints
// [x] /v1/paymentrequests
// [x] /v2/paymentrequests/<id> (patch missing)
// [ ] /v1/refunds
// [ ] /v2/refunds/<id>
// [ ] /v1/payouts

class SwishClient {
  #client;

  constructor(certificatePath = "server/swish/ssl") {
    const fs = require("fs");
    const https = require("https");
    const axios = require("axios");

    const agent = new https.Agent({
      cert: fs.readFileSync(
        `${certificatePath}/Swish_Merchant_TestCertificate_1234679304.pem`,
        { encoding: "utf8" }
      ),
      key: fs.readFileSync(
        `${certificatePath}/Swish_Merchant_TestCertificate_1234679304.key`,
        { encoding: "utf8" }
      ),
      ca: fs.readFileSync(`${certificatePath}/Swish_TLS_RootCA.pem`, {
        encoding: "utf8",
      }),
      passphrase: "swish",
    });
    this.#client = axios.create({
      baseURL: "https://mss.cpc.getswish.net/swish-cpcapi/api/",
      httpsAgent: agent,
    });
  }

  async cancelPaymentResultAsync(res, id) {
    await this.#client
      .patch(
        `v1/paymentrequests/${id}`,
        [{ op: "replace", path: "/status", value: "cancelled" }],
        { headers: { "Content-Type": "application/json-patch+json" } }
      )
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch((err) => {
        this.#getErrorDetails(res, err);
      });
  }

  async getPaymentResultAsync(res, id) {
    await this.#client
      .get(`v1/paymentrequests/${id}`)
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch((err) => {
        this.#getErrorDetails(res, err);
      });
  }

  async createPaymentRequestV1Async(res, data) {
    await this.#client
      .post(`v1/paymentrequests`, data)
      .then((response) => {
        res.status(200).json(response.headers.location);
      })
      .catch((err) => {
        this.#getErrorDetails(res, err);
      });
  }

  async createPaymentRequestV2Async(res, uuid, data) {
    await this.#client
      .put(`v2/paymentrequests/${uuid}`, data, { headers: { "Content-Type": "application/json" } })
      .then((response) => {
        res.status(200).json(response.headers.location);
      })
      .catch((err) => {
        this.#getErrorDetails(res, err);
      });
  }

  async createRefundRequestV1() {
    // TODO: implement
  }

  async createRefundRequestV2() {
    // TODO: implement
  }

  async getRefundResult() {
    // TODO: implement
  }

  async createPayoutRequest() {
    // TODO: implement
  }

  async getPayoutResult() {
    // TODO: implement
  }

  async #getErrorDetails(res, err) {
    const statusCode = err.response.status;
    const content = err.response.data;
    console.log(content);
    res.status(statusCode).json(content);
  }
}

module.exports = SwishClient;
