import { Briefcase, ChevronLeft, ChevronRight } from "lucide-react";
import JobCard from "./JobCard";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import Loader from "./Loader";

const JobListing = () => {
  const {
    jobs,
    searchFilter,
    isSearch,
    selectedCategories,
    selectedLocations,
    isLoading,
  } = useContext(AppContext);

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  // Filter jobs based on all criteria
  const filteredJobs = jobs.filter((job) => {
    const titleMatch = searchFilter.title
      ? job.title.toLowerCase().includes(searchFilter.title.toLowerCase())
      : true;

    const locationMatch = searchFilter.location
      ? job.location.toLowerCase().includes(searchFilter.location.toLowerCase())
      : true;

    const categoryMatch =
      selectedCategories.length === 0
        ? true
        : selectedCategories.includes(job.category);

    const locationFilterMatch =
      selectedLocations.length === 0
        ? true
        : selectedLocations.includes(job.location);

    return titleMatch && locationMatch && categoryMatch && locationFilterMatch;
  });

  // Basic pagination calculations
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="w-full space-y-6 lg:w-3/4">
      <div>
        <div className="flex items-center gap-3">
          <Briefcase className="h-8 w-8 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-900">
            {isSearch ||
            selectedCategories.length > 0 ||
            selectedLocations.length > 0
              ? "Search Results"
              : "Featured Positions"}
          </h2>
        </div>
        <p className="mt-4 text-lg text-gray-600">
          {isSearch ||
          selectedCategories.length > 0 ||
          selectedLocations.length > 0
            ? `Found ${filteredJobs.length} jobs matching your criteria`
            : "Discover your next career move with our curated list of opportunities from leading companies."}
        </p>
      </div>

      {filteredJobs.length > 0 ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>

          {/* Simple Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>

              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex h-60 flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200">
          <Briefcase className="h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No jobs found
          </h3>
          <p className="mt-2 text-center text-gray-600">
            Try adjusting your search criteria or explore other opportunities
          </p>
        </div>
      )}
    </section>
  );
};

export default JobListing;
