import React from 'react'
import './JobColumns.css';
import JobItem from './JobItem';

export const JobColumns = ({jobs, setJobs, title, image, alt, statusName, search, setSearch}) => {

// Filter jobs: first filter by status, then by search query
  const filteredByStatus = jobs.filter(job => job.status === statusName);
  const filteredJobs = filteredByStatus.filter((job) => {
    return Object.keys(job).some((key) =>
      job[key].toString().toLowerCase()
        .includes(search.toString().toLowerCase())
    );
  });
  
  // Update job status based on condition
  const updateTicketStatus = (id) => {
    setJobs(
      jobs.map(job =>
        job.id === id ?
        { ...job, status: (job.status === "start" || job.status === "stopped") ? "in-progress" : job.status === "in-progress" ? "completed" : "in-progress" }
          : job
      )
    );
  };
  
  return (
    <section>
      <div className={`job-column status-${statusName.toLowerCase()}
      }`}>
        <h2 className='heading-status'>{title}</h2>
        <img className="status-image" src={image} alt={alt} />
        <p>Below are jobs that {statusName === "start" ? "need to be started." : `are ${statusName}:`}</p>
      </div>

      <ul className='status-board'>
        {filteredJobs.map((job) => (
          <JobItem 
            key={job.id} 
            job={job} 
            updateTicketStatus={updateTicketStatus} 
            title={title}
          />
        ))  
      }
      </ul>
    </section>
  )
}
