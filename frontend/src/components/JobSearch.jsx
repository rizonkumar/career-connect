import JobListing from "./JobListing";
import Sidebar from "./Sidebar";

const JobSearch = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="container mx-auto flex flex-col gap-6 lg:flex-row lg:gap-8 2xl:px-20">
        <Sidebar />
        <JobListing />
      </div>
    </div>
  );
};

export default JobSearch;
