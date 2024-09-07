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
};
