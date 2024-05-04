import axios from 'axios';
const API_BASE_URL = 'https://localhost:7275/swagger/index.html';
const apiService = axios.create({
  baseURL: API_BASE_URL,
});
export const getSchools = async () => {
  try {
    const response = await apiService.get('/schools');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch schools');
  }
};
export const createSchool = async (schoolData) => {
  try {
    const response = await apiService.post('/schools', schoolData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create school');
  }
};
export const updateSchool = async (schoolData) => {
  try {
    const response = await apiService.put('/schools', schoolData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update school');
  }
};
export const deleteSchool = async (schoolId) => {
  try {
    const response = await apiService.delete(`/schools/${schoolId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete school');
  }
};
