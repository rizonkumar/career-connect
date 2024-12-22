import { Briefcase } from "lucide-react";
import JobCard from "./JobCard";
import { useContext } from "react";
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
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
