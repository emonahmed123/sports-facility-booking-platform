import { Booking } from '../Booking/booking.model';
import { verifyPayment } from './Payment.utlis';
import { join } from 'path';
import { readFileSync } from 'fs';
const paymentIntoDb = async (payload) => {
  const { transactionId, status } = payload;

  const verifyresponse = await verifyPayment(transactionId);
  let message = '';
  // console.log(verifyresponse);
  let result;
  if (verifyresponse && verifyresponse.pay_status === 'Successful') {
    result = await Booking.findOneAndUpdate(
      {
        transactionId: transactionId,
      },
      { isBooked: 'confirmed' },
    );
    message = 'Successfully Paid!';
  } else {
    message = 'Payment Failed!';
  }

  console.log(result);

  const filePath = join(__dirname, '../../../views/confirmation.html');
  let template = readFileSync(filePath, 'utf-8');

  template = template.replace('{{message}}', message);

  return template;
};

export const paymentService = {
  paymentIntoDb,
};
