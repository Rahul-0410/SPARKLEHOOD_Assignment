const STORAGE_KEY = 'ai_incidents';

export const getIncidents = () => {
  const storedIncidents = localStorage.getItem(STORAGE_KEY);
  return storedIncidents ? JSON.parse(storedIncidents) : [];
};

export const saveIncidents = (incidents) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(incidents));
};

export const addIncident = (newIncident) => {
  const incidents = getIncidents();
  const updatedIncidents = [...incidents, newIncident];
  saveIncidents(updatedIncidents);
  return updatedIncidents;
}; 