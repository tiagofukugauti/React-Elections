import { get } from './httpService';

export async function apiGetCities() {
  const allCities = await get('/cities');
  //console.log(allCities);
  return allCities;
}

export async function apiGetCandidates() {
  const allCandidates = await get('/candidates');
  //console.log(allCandidates);
  return allCandidates;
}

export async function apiGetElections() {
  const allElections = await get('/election');
  //console.log(allElections);
  return allElections;
}
