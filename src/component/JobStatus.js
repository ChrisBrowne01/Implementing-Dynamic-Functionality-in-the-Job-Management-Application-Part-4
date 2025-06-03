import React from 'react';
import deleteIcon from '../images/delete.png'
import { Draggable } from 'react-beautiful-dnd'; // Import Draggable
import './JobStatus.css';

export const JobStatus = ({job, updateJobStatus, status, deleteJob, index}) => {
  return (
    <Draggable draggableId={job.id.toString()} index={index}> {/* Use job.id as draggableId */}
      {(provided) => (
        <div className={`ticket-item status-${job.status.toLowerCase() === "in progress" ? "in-progress" 
          : job.status.toLowerCase() === "completed" ? "completed" 
          : "start"}`} 
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps} // Apply drag handle props here
        >
        <div className="card-body">
          <h5 className="card-title">
            {job.title}
          </h5>
          {/* No need to display task or status */}
          {/* <p className="card-task">{job.task}</p> */}
          {/* <p className="card-status">{status}</p> */}
        </div>
        <div className="card-footer">
          <div className="button-group">
            {/* Change or add Delete button icon */}
            <button onClick={() => updateJobStatus(job.id)} className="job-action-button" >
              {job.status === "Need to Start" ? "Start Job" : job.status === "In Progress" ? "Complete Job" : "Mark as Incomplete"}
            </button>
            <div className='jobDelete' onClick={() => deleteJob(job.id)}>
              <img src={deleteIcon} className='deletingImg' alt="Delete" />
            </div>
          </div>
        </div>
      </div>
      )}
    </Draggable>
  )
}
