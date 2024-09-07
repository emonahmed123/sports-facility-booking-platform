/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import config from '../../config';

export const initiatePayment = async (paymentdata: any) => {
  console.log(config.payment_url, config.signature_key);

  try {
    const res = await axios.post('https://sandbox.aamarpay.com/jsonpost.php', {
      store_id: config.Store_id,
      signature_key: config.signature_key,
      tran_id: paymentdata.transactionId,
      success_url: `https://sports-facility-booking-platform-sable.vercel.app/api/payment/success?transactionId=${paymentdata.transactionId}&status=success`,
      fail_url: `https://sports-facility-booking-platform-sable.vercel.app/api/payment/success?status=false`,
      cancel_url: 'https://lustrous-dragon-dfa7f2.netlify.app/',
      amount: paymentdata.payableAmount,
      currency: 'BDT',

      desc: 'Merchant Registration Payment',
      cus_name: paymentdata.CustomerName,
      cus_email: paymentdata.CustomerEmail,
      cus_add1: 'N/A',
      cus_add2: 'N/A',
      cus_city: 'N/A',
      cus_state: 'N/A',
      cus_postcode: 'N/A',
      cus_country: 'Bangladesh',
      cus_phone: paymentdata.CustomerPhone,
      type: 'json',
    });

    return res.data;
  } catch (error: any) {
    throw new Error('Payment  failed!');
  }
};

export const verifyPayment = async (tnxId: string) => {
  try {
    const response = await axios.get(
      'https://sandbox.aamarpay.com/api/v1/trxcheck/request.php',
      {
        params: {
          store_id: config.Store_id,
          signature_key: config.signature_key,
          type: 'json',
          request_id: tnxId,
        },
      },
    );

    return response.data;
  } catch (err: any) {
    throw new Error('Payment validation failed!');
  }
};
