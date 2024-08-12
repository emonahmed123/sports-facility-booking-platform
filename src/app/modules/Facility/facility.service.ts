import { TFacility } from "./Facility.interface"
import { Facility } from "./facility.model"

const creatFacilityIntoDb=async( payload:TFacility)=>{

 
   const result = await Facility.create(payload)

   return result

}




export  const  FacilityService={
  creatFacilityIntoDb
}