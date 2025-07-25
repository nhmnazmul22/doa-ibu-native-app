import midtransClient from "midtrans-client";
import { MIDTRANS_SERVER_KEY, MIDTRANS_CLIENT_KEY } from "../config/config.js";

export const core = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: MIDTRANS_SERVER_KEY,
  clientKey: MIDTRANS_CLIENT_KEY,
});
