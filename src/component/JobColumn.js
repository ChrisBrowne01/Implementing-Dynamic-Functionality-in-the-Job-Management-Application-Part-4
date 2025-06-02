import React from 'react'
import { JobStatus } from './JobStatus';
import './JobColumn.css';

export const JobColumn = ({ jobs, title, image, alt, statusName, search, updateJobStatus, deleteJob}) => {

  // Filter jobs: first filter by status, then by search query
  const filteredByStatus = jobs.filter(job => job.status === statusName);
  const filteredJobs = filteredByStatus.filter((job) => {
    return Object.keys(job).some((key) =>
      job[key].toString().toLowerCase()
        .includes(search.toString().toLowerCase())
    );
  });

  return (
    <section>
      <div className={`job-column status-${statusName.toLowerCase() === "in progress" ? "in-progress"
        : statusName.toLowerCase() === "completed" ? "completed"
          : "start"}
      }`}>
        <h2 className='heading-status'>{title}</h2>
        <img className="status-image" src={image} alt={alt} />
        <p>Below are jobs that {statusName === "Need to Start" ? "need to be started:" : `are ${statusName}:`}</p>
      </div>

        {/* List the job under each status */}
      <ul className='status-board'>
        {filteredJobs.map((job) => (
          <JobStatus
            key={job.id}
            job={job}
            updateJobStatus={updateJobStatus}
            status={title}
            deleteJob={deleteJob}
          />
        ))
        }
      </ul>
    </section>
  )
}
