import React, { useState, useEffect } from "react";
import { Header } from "./component/Header";
import { Footer } from './component/Footer';
import { JobColumns } from "./component/JobColumns";
import toDoIcon from './images/to-do-icon.jpg';
import inProgressIcon from './images/in-progress-icon.png';
import doneIcon from './images/done-icon.png';
import './App.css';

function App() {
  /** 
   * change setJobValuess to setJobs, checked!!!
   * change name to title, checked!!!
   * status is: 'start' => 'Need to Start'
   *            'in-progress' => 'In Progress'
   *            'completed' => 'Completed',
   * take out task, works still but add task to new objects */
  // Initialize job list objects
  const [jobs, setJobs] = useState([
    { id: 1, title: 'Parse Emails', status: 'Need to Start' },
    { id: 2, title: 'SAP Extraction', status: 'In Progress' },
    { id: 3, title: 'Generate Report', status: 'Completed' }
  ]);
  /* const [jobs, setJobValues] = useState([
    { id: 1, name: 'Email Extractor', status: 'in-progress', task: 'Read Email'},
    { id: 2, name: 'Data Analyzer', status: 'completed', task: 'Web Parsing'},
    { id: 3, name: 'Report Generator', status: 'start', task: 'Writing Email'}
  ]); */

  const [search, setSearch] = useState("");
  const [newJob, setNewJob] = useState({id: '', title: '', status: '', task: ''})
  const [error, setError] = useState("")

  // Initialize dark mode from localStorage or default to false
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true' ? true : false;
  });
  // Effect to apply/remove the 'dark-mode' class on the body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    // Save preference to localStorage
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);
  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(theme => !theme);
  };

  // Implement delete functionality
  const deleteJob = (id) => {};

  // Implement status update functionality
  const updateJobStatus = (id, newStatus) => {};

  // Implement add new job functionality
  // const addNewJob = (title) => {};
  const addNewJob = (e) => {
    e.preventDefault();

    // Basic validation
    if (!newJob.title.trim()) { setError("Job Title cannot be empty.");
      return;
    }
    if (!newJob.task) {
      setError("Please select a job category.");
      return;
    }
    if (!newJob.status || newJob.status === "") {
      setError("Please select a job status.");
      return;
    }

     // Create new job with a unique ID
    // Find the maximum existing ID or start from 0 if no jobs exist
    const maxId = jobs.length > 0 ? Math.max(...jobs.map(job => job.id)) : 0;
    const newId = maxId + 1;

    const newJobListing = {
      id: newId,
      title: newJob.title.trim(),
      status: newJob.status.trim(),
      task: newJob.task.trim()
    };
        
    // Update the 'jobs' state by adding the new job listing
    setJobs([...jobs, newJobListing]);
    
    // Clear the form fields after successful submission
    setNewJob({id: '', title: '',  status: '', task: ''});
    setError("");

    // Log the data here, after the state has been updated
    console.log("Submitting Job:", newJobListing); 
    console.log("All Jobs:", [...jobs, newJobListing]); 
  };

  return (
      <div className="App">
        {/* Dark Mode Toggle Button */}
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode ☀️' : 'Dark Mode 🌙'}
        </button>
        
        {/* Add new job functionality */}
        <Header 
          addNewJob={addNewJob}
          newJob={newJob}
          setNewJob={setNewJob}
          search={search}
          setSearch={setSearch}
          error={error}
          setError={setError}
        />
        <main className="job-columns">
          
          {/* update state & delete functionality */}
          <JobColumns
            title="Need to Start" 
            image={toDoIcon} 
            alt="To-do icon"
            jobs={jobs}
            setJobs={setJobs} 
            statusName="start" 
            search={search}
            setSearch={setSearch}
          />

          <JobColumns 
            title="In Progress" 
            image={inProgressIcon} 
            alt="In-progress icon"
            jobs={jobs}
            setJobs={setJobs}
            statusName="in-progress"
            search={search}
            setSearch={setSearch} 
          />

          <JobColumns 
            title="Completed" 
            image={doneIcon} 
            alt="Done icon"
            jobs={jobs}
            setJobs={setJobs}
            statusName="completed" 
            search={search}
            setSearch={setSearch}
          />

        </main>
        <Footer /> 
      </div>
  );
}

export default App;
