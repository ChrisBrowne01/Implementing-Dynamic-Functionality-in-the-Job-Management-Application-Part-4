import React from 'react';
import './JobItem.css';

const JobItem = ({job, updateTicketStatus, title}) => {
  return (
      <div className={`ticket-item status-${job.status.toLowerCase() === "in-progress" ? "in-progress" 
        : job.status.toLowerCase() === "completed" ? "completed" 
        : "start"
      }`} >
        <div className="card-body">
          <h5 className="card-title">
            {job.name}
          </h5>
          <p className="card-task">{job.task}</p>
          <p className="card-status">{title}</p>
        </div>
        <div className="card-footer">
          <div className="button-group">
            <button onClick={() => updateTicketStatus(job.id)} className="job-action-button" >
              {job.status === "start" ? "Start Job" : job.status === "in-progress" ? "Complete Job" : "Mark as Incomplete"}
            </button>
          </div>
        </div>
      </div>
  )
}

export default JobItem
