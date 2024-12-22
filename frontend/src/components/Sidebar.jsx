import { useContext, useState } from "react"; // Add useState
import { AppContext } from "../context/AppContext";
import {
  X,
  Search,
  MapPin,
  Briefcase,
  Filter,
  SlidersHorizontal,
} from "lucide-react";
import { JobCategories, JobLocations } from "../assets/assets";

const Sidebar = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false); // Add state for filter visibility

  const {
    isSearch,
    searchFilter,
    setSearchFilter,
    selectedCategories,
    setSelectedCategories,
    selectedLocations,
    setSelectedLocations,
  } = useContext(AppContext);

  // Calculate total active filters
  const activeFiltersCount = [
    ...selectedCategories,
    ...selectedLocations,
    searchFilter.title,
    searchFilter.location,
  ].filter(Boolean).length;

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      }
      return [...prev, category];
    });
  };

  const handleLocationChange = (location) => {
    setSelectedLocations((prev) => {
      if (prev.includes(location)) {
        return prev.filter((l) => l !== location);
      }
      return [...prev, location];
    });
  };

  const clearFilters = () => {
    setSearchFilter({ title: "", location: "" });
    setSelectedCategories([]);
    setSelectedLocations([]);
  };

  // Toggle filter visibility
  const toggleFilters = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <div className="w-full lg:w-1/4">
      {/* Mobile Filter Toggle */}
      <button
        onClick={toggleFilters}
        className="mb-4 flex w-full items-center justify-between rounded-xl border border-gray-100 bg-white p-3 text-gray-700 shadow-sm transition-all hover:shadow-md lg:hidden"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-blue-600" />
          <span className="font-medium">
            {isFilterVisible ? "Hide Filters" : "Show Filters"}
          </span>
        </span>
        {activeFiltersCount > 0 && (
          <span className="rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-2.5 py-0.5 text-sm font-medium text-white">
            {activeFiltersCount}
          </span>
        )}
      </button>

      {/* Filter Content - Show/Hide based on isFilterVisible on mobile */}
      <div
        className={`${!isFilterVisible ? "hidden lg:block" : ""} h-fit rounded-xl border border-gray-100 bg-white p-5 shadow-lg lg:sticky lg:top-20`}
      >
        {/* Search Filters */}
        {isSearch &&
          (searchFilter.title !== "" || searchFilter.location !== "") && (
            <div className="border-b border-gray-100 pb-4">
              <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                <Filter className="h-5 w-5 text-blue-600" />
                Active Filters
              </h3>
              <div className="flex flex-wrap gap-2">
                {searchFilter.title && (
                  <span className="inline-flex items-center gap-2 rounded-lg border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-1.5 text-sm font-medium text-blue-700">
                    <Search className="h-4 w-4" />
                    {searchFilter.title}
                    <button
                      onClick={() =>
                        setSearchFilter((prev) => ({ ...prev, title: "" }))
                      }
                      className="rounded-full p-0.5 transition-colors hover:bg-blue-100"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </span>
                )}
                {searchFilter.location && (
                  <span className="inline-flex items-center gap-2 rounded-lg border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-1.5 text-sm font-medium text-blue-700">
                    <MapPin className="h-4 w-4" />
                    {searchFilter.location}
                    <button
                      onClick={() =>
                        setSearchFilter((prev) => ({ ...prev, location: "" }))
                      }
                      className="rounded-full p-0.5 transition-colors hover:bg-blue-100"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}

        {/* Categories Filter */}
        <div className="border-b border-gray-100 py-4">
          <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Briefcase className="h-5 w-5 text-blue-600" />
            Categories
          </h4>
          <div className="space-y-2">
            {JobCategories.map((category, index) => (
              <label
                key={index}
                className="group flex cursor-pointer items-center gap-3 rounded-lg p-1 transition-colors hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="h-4 w-4 rounded-md border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-600 transition-colors group-hover:text-blue-600">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Locations Filter */}
        <div className="space-y-2 py-4">
          <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
            <MapPin className="h-5 w-5 text-blue-600" />
            Locations
          </h4>
          {JobLocations.map((location, index) => (
            <label
              key={index}
              className="group flex cursor-pointer items-center gap-3 rounded-lg p-1 transition-colors hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={selectedLocations.includes(location)}
                onChange={() => handleLocationChange(location)}
                className="h-4 w-4 rounded-md border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-600 transition-colors group-hover:text-blue-600">
                {location}
              </span>
            </label>
          ))}
        </div>

        {/* Clear Filters button */}
        <button
          onClick={clearFilters}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md"
        >
          <Filter className="h-4 w-4" />
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
