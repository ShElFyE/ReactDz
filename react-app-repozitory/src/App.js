import React, { useEffect, useState } from 'react';
import { getSchools, createSchool, updateSchool, deleteSchool } from './services/apiService';

function App() {
  const [schools, setSchools] = useState([]);
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const fetchedSchools = await getSchools();
        setSchools(fetchedSchools);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSchools();
  }, []);
  const handleCreateSchool = async () => {
    const newSchoolData = {
      name: 'New School',
      latitude: 0,
      longitude: 0,
    };
    try {
      const createdSchool = await createSchool(newSchoolData);
      setSchools(prevSchools => [...prevSchools, createdSchool]);
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdateSchool = async (schoolId, updatedData) => {
    try {
      const updatedSchool = await updateSchool({ ...updatedData, id: schoolId });
      setSchools(prevSchools => prevSchools.map(school => (school.id === schoolId ? updatedSchool : school)));
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteSchool = async (schoolId) => {
    try {
      await deleteSchool(schoolId);
      setSchools(prevSchools => prevSchools.filter(school => school.id !== schoolId));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="App">
      <h1>Schools</h1>
      <button onClick={handleCreateSchool}>Create School</button>
      <ul>
        {schools.map(school => (
          <li key={school.id}>
            <p>{school.name}</p>
            <button onClick={() => handleUpdateSchool(school.id, { name: 'Updated School' })}>Update</button>
            <button onClick={() => handleDeleteSchool(school.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
