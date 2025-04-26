// Import React hooks and components
import { useState, useEffect } from 'react';
import { mockIncidents } from './data/mockIncidents';
import { useTheme } from './context/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import { IncidentForm } from './components/IncidentForm';
import './App.css';

// Main application component
export default function App() {
  // State management for incidents, filtering, and UI
  const [incidents, setIncidents] = useState(() => {
    const savedIncidents = localStorage.getItem('incidents');
    return savedIncidents ? JSON.parse(savedIncidents) : mockIncidents;
  });
  const [filter, setFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');
  const [expandedIncident, setExpandedIncident] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { isDarkMode } = useTheme();

  // Persist incidents to localStorage
  useEffect(() => {
    localStorage.setItem('incidents', JSON.stringify(incidents));
  }, [incidents]);

  // Filter incidents based on severity
  const filteredIncidents = incidents.filter(incident => 
    filter === 'All' ? true : incident.severity === filter
  );

  // Sort incidents by date
  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    const dateA = new Date(a.reported_at);
    const dateB = new Date(b.reported_at);
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  // Handle new incident submission
  const handleAddIncident = (newIncident) => {
    setIncidents([...incidents, newIncident]);
  };

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      {/* Header section with title and theme toggle */}
      <header className="app-header">
        <h1>AI Safety Incident Dashboard</h1>
        <ThemeToggle />
      </header>
      
      <main className="dashboard">
        {/* Controls section for filtering and sorting */}
        <div className="controls">
          <div className="filter-controls">
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Severities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            
            <select 
              value={sortOrder} 
              onChange={(e) => setSortOrder(e.target.value)}
              className="sort-select"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
          
          <button 
            className="new-incident-btn"
            onClick={() => setShowForm(true)}
          >
            Report New Incident
          </button>
        </div>

        {/* Modal form for new incident */}
        {showForm && (
          <IncidentForm
            onClose={() => setShowForm(false)}
            onSubmit={handleAddIncident}
          />
        )}

        {/* List of incidents */}
        <div className="incidents-list">
          {sortedIncidents.map(incident => (
            <div 
              key={incident.id} 
              className={`incident-card ${incident.severity.toLowerCase()}`}
            >
              <div className="incident-header">
                <h3>{incident.title}</h3>
                <div className="incident-meta">
                  <span className="severity">{incident.severity}</span>
                  <span className="date">
                    {new Date(incident.reported_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <button 
                className="view-details-btn"
                onClick={() => setExpandedIncident(
                  expandedIncident === incident.id ? null : incident.id
                )}
              >
                {expandedIncident === incident.id ? 'Hide Details' : 'View Details'}
              </button>
              
              {expandedIncident === incident.id && (
                <div className="incident-details">
                  <p>{incident.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
