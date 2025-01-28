import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
  const [companyToken, setCompanyToken] = useState(null);
  const [companyData, setCompanyData] = useState(null);

  const notify = (message, type = "success") => {
    toast[type](message, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  // Funtions to fetch jobs
  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setJobs(jobsData);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const value = {
    searchFilter,
    setSearchFilter,
    isSearch,
    setIsSearch,
    jobs,
    setJobs,
    selectedCategories,
    setSelectedCategories,
    selectedLocations,
    setSelectedLocations,
    isLoading,
    showRecruiterLogin,
    setShowRecruiterLogin,
    companyToken,
    setCompanyToken,
    companyData,
    setCompanyData,
    backendURL,
    notify,
  };

  return (
    // eslint-disable-next-line react/prop-types
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
