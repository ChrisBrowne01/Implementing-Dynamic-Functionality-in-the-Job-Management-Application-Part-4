import React from 'react'
import './JobColumns.css';
import JobItem from './JobItem';

export const JobColumns = ({jobs, title, image, alt, statusName, search, updateJobStatus}) => {

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

      <ul className='status-board'>
        {filteredJobs.map((job) => (
          <JobItem 
            key={job.id} 
            job={job} 
            updateJobStatus={updateJobStatus} 
            status={title}
          />
        ))  
      }
      </ul>
    </section>
  )
}
