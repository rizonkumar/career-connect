import JobListing from "./JobListing";
import Sidebar from "./Sidebar";

const JobSearch = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-8">
      <div className="container mx-auto flex flex-col gap-8 lg:flex-row lg:gap-10 2xl:px-20">
        <Sidebar />
        <JobListing />
      </div>
    </div>
  );
};

export default JobSearch;
