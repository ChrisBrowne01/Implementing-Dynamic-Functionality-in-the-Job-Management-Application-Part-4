import React, { useState, useEffect } from "react";
import { DragDropContext } from 'react-beautiful-dnd';
import { Header } from "./component/Header";
import { Footer } from './component/Footer';
import { JobColumn } from "./component/JobColumn";
import toDoIcon from './images/to-do-icon.jpg';
import inProgressIcon from './images/in-progress-icon.png';
import doneIcon from './images/done-icon.png';
import './App.css';

function App() {
  /**
   * Bonus Challenges:
   * 1.Implement drag-and-drop functionality to move jobs between columns. [TO DO]
   * 2.Add a search feature to filter jobs by title. [DONE]
   * 3.Implement local storage to persist the job list between page reloads. [DONE]
   * */
  // Initialize job list objects
  // Implement local storage to persist the job list between page reloads
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem('jobs');
    return savedJobs ? JSON.parse(savedJobs) : [
    { id: 1, title: 'Parse Emails', status: 'Need to Start' },
    { id: 2, title: 'SAP Extraction', status: 'In Progress' },
    { id: 3, title: 'Generate Report', status: 'Completed' }
  ]});

  // useEffect hook to save the jobs array to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  const [newJob, setNewJob] = useState({id: '', title: '', status: '', task: ''})
  const [search, setSearch] = useState("");
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

  // Delete job based on ID
  const deleteJob = (id) => {setJobs(jobs.filter((job) => job.id !== id))};

  // Update job status based on condition
  const updateJobStatus = (id) => {
    setJobs(
      jobs.map(job =>
        job.id === id ?
        { ...job, status: (job.status === "Need to Start" || job.status === "stopped") ? "In Progress" : job.status === "In Progress" ? "Completed" : "In Progress" }
          : job
      )
    );
  };

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

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // If dropped outside a droppable area or in the same place
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    setJobs(prevJobs => {
      const newJobs = Array.from(prevJobs);
      const movedJobIndex = newJob.findIndex(job => job.id === parseInt(draggableId));
      const [movedJob] = newJobs.splice(movedJobIndex, 1);

      // Update the status of the moved job based on the new column
      let newStatus = '';
      if (destination.droppableId === "Need to Start") {
        newStatus = "Need to Start";
      } else if (destination.droppableId === "In Progress") {
        newStatus = "In Progress";
      } else if (destination.droppableId === "Completed") {
        newStatus = "Completed";
      }

      movedJob.status = newStatus;
      newJobs.push(movedJob);

      // Sort the jobs by their ID to ensure consistent order after a drag-and-drop
      newJobs.sort((a, b) => a.id - b.id);

      return newJobs;

    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        {/* Dark Mode Toggle Button */}
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode ☀️' : 'Dark Mode 🌙'}
        </button>
        
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
          
          <JobColumn
            title="Need to Start" 
            image={toDoIcon} 
            alt="To-do icon"
            jobs={jobs}
            setJobs={setJobs} 
            statusName="Need to Start" 
            search={search}
            setSearch={setSearch}
            updateJobStatus={updateJobStatus}
            deleteJob={deleteJob}
          />

          <JobColumn 
            title="In Progress" 
            image={inProgressIcon} 
            alt="In-progress icon"
            jobs={jobs}
            setJobs={setJobs}
            statusName="In Progress"
            search={search}
            setSearch={setSearch} 
            updateJobStatus={updateJobStatus}
            deleteJob={deleteJob}
          />

          <JobColumn 
            title="Completed" 
            image={doneIcon} 
            alt="Done icon"
            jobs={jobs}
            setJobs={setJobs}
            statusName="Completed" 
            search={search}
            setSearch={setSearch}
            updateJobStatus={updateJobStatus}
            deleteJob={deleteJob}
          />

        </main>
        <Footer /> 
      </div>
    </DragDropContext>
  );
}

export default App;
