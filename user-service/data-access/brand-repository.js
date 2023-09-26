import { Brand } from './models/brand-model.js'
import { formatResponse } from '../helper.js';

export async function addBrand(brandDetails) {
  const addingResponse = await Brand.create(brandDetails);
  const formattedResponse = formatResponse(
    'Error with adding record',
    addingResponse
  );
  return formattedResponse;
}

export async function getBrand(brandDetails) {
  const gettingResponse = await Brand.findOne(brandDetails);
  const formattedResponse = formatResponse(
    'Error with getting record',
    gettingResponse
  );
  return formattedResponse;
}

export async function getAllBrands() {
  const gettingResponse = await Brand.find();
  const formattedResponse = formatResponse(
    'Error with getting record',
    gettingResponse
  );
  return formattedResponse;
}

export async function updateBrand(brandDetails) {
  const updatingResponse = await Brand.findOneAndUpdate(brandDetails);
  const formattedResponse = formatResponse(
    'Error with updating record',
    updatingResponse
  );
  return formattedResponse;
}

export async function deleteBrand(brandDetails) {
  const deletingResponse = await Brand.findOneAndRemove(brandDetails);
  const formattedResponse = formatResponse(
    'Error with deleting record',
    deletingResponse
  );
  return formattedResponse;
}
