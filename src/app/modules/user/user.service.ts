import { IUser } from "./user.interface"
import { User } from "./user.model"

const createSingupIntoDb= async(payload:IUser)=>{

  const result =await User.create(payload)

  return result
}



export const userService={
  createSingupIntoDb
}