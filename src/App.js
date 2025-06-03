import React, { useState, useEffect } from "react";
import { DragDropContext } from '@hello-pangea/dnd';
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
   * 3.Implement local storage to persist the job list between page reloads. [TO DO]
   * */
  // Initialize job list objects
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem('jobs');
    return savedJobs ? JSON.parse(savedJobs) : [
    { id: 1, title: 'Parse Emails', status: 'Need to Start' },
    { id: 2, title: 'SAP Extraction', status: 'In Progress' },
    { id: 3, title: 'Generate Report', status: 'Completed' }
  ]});

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

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
    const { source, destination, draggableId } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    // If the item is dropped in the same column and same position, do nothing
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const draggedJob = jobs.find(job => job.id === parseInt(draggableId));

    if (!draggedJob) {
      return;
    }

    // Create a new array of jobs to avoid direct mutation
    const newJobs = Array.from(jobs);

    // Remove the dragged job from its original position
    newJobs.splice(newJobs.findIndex(job => job.id === draggedJob.id), 1);

    // Update the status of the dragged job based on the destination column
    let newStatus;
    if (destination.droppableId === "Need to Start") {
      newStatus = "Need to Start";
    } else if (destination.droppableId === "In Progress") {
      newStatus = "In Progress";
    } else if (destination.droppableId === "Completed") {
      newStatus = "Completed";
    } else if (destination.droppableId === "Stopped") { // If you want to allow dropping into "Stopped"
      newStatus = "Stopped";
    }


    const updatedDraggedJob = { ...draggedJob, status: newStatus };

    // Insert the dragged job into its new position in the destination column
    // For simplicity, we are just changing the status and re-filtering in JobColumn.
    // If you wanted to maintain order within columns, you'd insert at destination.index
    // after filtering, and then combine the arrays. For this setup, simply update status.
    newJobs.push(updatedDraggedJob);

    setJobs(newJobs);
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
          
          {/* update state & delete functionality */}
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
            droppableId="Need to Start"
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
            droppableId="In Progress"
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
            droppableId="Completed"
          />

        </main>
        <Footer /> 
      </div>
    </DragDropContext>
  );
}

export default App;
