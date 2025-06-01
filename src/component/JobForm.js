import { React } from 'react';
import { FormButton } from './FormButton';

export const JobForm = ({addNewJob, newJob, setNewJob, search, setSearch, error, setError}) => {

  // Handles input fields (title, status) and updates the newJob state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
    if (error) setError("");
  }

  // Handles clicking the category buttons (task)
  const handleTaskClick = (e) => {
    e.preventDefault();
    const taskValue = e.target.value;
    setNewJob({ ...newJob, task: taskValue });
    // Clear error message if user selects a task after an error
    if (error) setError("");
  };

  // Handles form submission to add job
  //  const addNewJob = (title) => {};
  /* const handleSubmit = (e) => {
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
  }; */


  return (
    <div className="form-header">
      <form onSubmit={addNewJob}>
        {/* An input field for entering job titles */}
        <input 
          type="text" 
          name="title"
          value={newJob.title}
          onChange={handleInputChange}
          className="bot-input" 
          placeholder="Enter the job" />
        
        {/* Buttons for selecting job categories */}
        <div className="form-details">
          <div className="bottom-line">
            
            <FormButton
              value="Read Emails"
              newJob={newJob}
              handleTaskClick={handleTaskClick}
            />
            <FormButton
              value="Web Parsing"
              newJob={newJob}
              handleTaskClick={handleTaskClick}
            />
            <FormButton
              value="Send Emails"
              newJob={newJob}
              handleTaskClick={handleTaskClick}
            />

          </div>
        </div>

        {/* A dropdown menu for selecting job status */}
        <select className="job-status" 
          name="status"
          value={newJob.status} 
          onChange={handleInputChange}> 
          <option value="">Select Status</option> {/* Default, non-submittable option */}
          <option value="start">Start Process</option>
          <option value="in-progress">Running</option>
          <option value="completed">Completed</option>
          <option value="stopped">Stopped</option>
        </select>

        {/* A submit button to add the job */}
        <button type="submit" className="submit-data">Add Jobs</button>
        
        {/* Error Handling */}
        {error && <p className="error-message">{error}</p>}
      </form>
      <form className="filter-input">
        <input
          placeholder="Job Filter"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </form>
    </div>
  );
};
