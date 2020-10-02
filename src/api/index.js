const BASE_URL = 'https://localhost:44360/api/Medicine';

const getAPIPath = (apiName) => {
  switch (apiName) {
    case 'getMedicineList':
      return '/GetMedicineList';
    case 'getMedicineDetails':
      return '/getMedicineDetails';
    case 'addMedicine':
        return '/addMedicine';
    case 'updateNotes':
        return '/updateMedicineRoute';
    default:
      return '';
  }
};

export const get = (apiName, queryString, headers = {}) => {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}${getAPIPath(apiName)}?${queryString}`, {headers})
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });
};

export const post = (apiName, data, headers = {}) => {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}${getAPIPath(apiName)}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });
};
