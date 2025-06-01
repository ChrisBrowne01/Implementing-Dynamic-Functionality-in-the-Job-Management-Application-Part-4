import React from 'react';
import './JobItem.css';

const JobItem = ({job, updateJobStatus, status}) => {
  return (
      <div className={`ticket-item status-${job.status.toLowerCase() === "in progress" ? "in-progress" 
        : job.status.toLowerCase() === "completed" ? "completed" 
        : "start"
      }`} >
        <div className="card-body">
          <h5 className="card-title">
            {job.title}
          </h5>
          <p className="card-task">{job.task}</p>
          <p className="card-status">{status}</p>
        </div>
        <div className="card-footer">
          <div className="button-group">
            <button onClick={() => updateJobStatus(job.id)} className="job-action-button" >
              {job.status === "Need to Start" ? "Start Job" : job.status === "In Progress" ? "Complete Job" : "Mark as Incomplete"}
            </button>
          </div>
        </div>
      </div>
  )
}

export default JobItem
