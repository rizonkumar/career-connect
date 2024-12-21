import { Briefcase } from "lucide-react";
import { jobsData } from "../assets/assets";
import JobCard from "./JobCard";

const JobListing = () => {
  return (
    <section className="w-full space-y-6 lg:w-3/4">
      <div>
        <div className="flex items-center gap-3">
          <Briefcase className="h-8 w-8 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-900">
            Featured Positions
          </h2>
        </div>
        <p className="mt-4 text-lg text-gray-600">
          Discover your next career move with our curated list of opportunities
          from leading companies.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {jobsData.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </section>
  );
};

export default JobListing;
