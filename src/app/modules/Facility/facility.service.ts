import { Booking } from '../Booking/booking.model';
import { User } from '../user/user.model';
import { TFacility } from './Facility.interface';
import { Facility } from './facility.model';

const creatFacilityIntoDb = async (payload: TFacility) => {
  const result = await Facility.create(payload);

  return result;
};
const getFacilityIntoDb = async () => {
  const result = await Facility.find({ isDeleted: false });

  return result;
};
const getSingleFacilityIntoDb = async (id: string) => {
  // console.log(id);
  const result = await Facility.findById(id);

  return result;
};

const getoverViewIntoDb = async () => {
  const TotalUser = await User.find().countDocuments();
  const TotalProdct = await Facility.find({
    isDeleted: false,
  }).countDocuments();
  const TotalBooking = await Booking.find({
    isBooked: 'confirmed',
  }).countDocuments();

  const profit = await Booking.aggregate([
    { $match: { isBooked: 'confirmed' } },
    { $group: { _id: 0, Profit: { $sum: '$payableAmount' } } },
  ]);

  const TotalProfilt = profit[0].Profit;

  return { TotalUser, TotalProdct, TotalBooking, TotalProfilt };
};

const updateFacilityIntoDb = async (id: string, payload: TFacility) => {
  const result = await Facility.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};
const deleteFacilityIntoDb = async (id: string) => {
  const result = await Facility.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    },
  );

  return result;
};

export const FacilityService = {
  creatFacilityIntoDb,
  updateFacilityIntoDb,
  deleteFacilityIntoDb,
  getFacilityIntoDb,
  getSingleFacilityIntoDb,
  getoverViewIntoDb,
};
