import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

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
      const { data } = await axios.get(`${backendURL}/api/jobs`);

      if (data.success) {
        setJobs(data.jobs);
      } else {
        console.error("Failed to fetch jobs:", data.message);
        notify("Failed to fetch jobs", "error");
        setJobs([]);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      notify(error.response?.data?.message || "Failed to fetch jobs", "error");
      setJobs([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Funtion to fetch company data
  const fetchCompanyData = async () => {
    try {
      const { data } = await axios.get(
        `${backendURL}/api/company/company-profile`,
        {
          headers: { Authorization: `Bearer ${companyToken}` },
        },
      );

      console.log("Company Data", data);
      if (data.success) {
        setCompanyData(data.company);
      } else {
        notify(data.message, "error");
      }
    } catch (error) {
      console.error("Error fetching company data:", error);
      notify(
        error.response?.data?.message || "Failed to fetch company data",
        "error",
      );

      if (error.response?.status === 401) {
        localStorage.removeItem("companyToken");
        setCompanyToken(null);
        setCompanyData(null);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("companyToken");
    localStorage.removeItem("companyData");
    setCompanyToken(null);
    setCompanyData(null);
    notify("Logged out successfully");
  };

  useEffect(() => {
    fetchJobs();
    const storedCompanyToken = localStorage.getItem("companyToken");
    if (storedCompanyToken) {
      setCompanyToken(storedCompanyToken);
    }

    return () => {
      // Cleanup on unmount
      setCompanyData(null);
      setCompanyToken(null);
    };
  }, []);

  useEffect(() => {
    if (companyToken) {
      fetchCompanyData();
    }
  }, [companyToken]);

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
    logout,
  };

  return (
    // eslint-disable-next-line react/prop-types
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
