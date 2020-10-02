import { get, post } from "./index"

export const getMedicineList = () => {
  return get("getMedicineList", "")
}

export const getMedicineDetail = (id) => {
  return post("getMedicineDetails", {
    fullName: id
  }, { 'Content-Type': 'application/json' })
}

export const addMedicine = (data) => {
  return post("addMedicine", data, { 'Content-Type': 'application/json' })
}