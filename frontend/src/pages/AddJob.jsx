import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import {
  Briefcase,
  MapPin,
  Building2,
  Users,
  DollarSign,
  Send,
} from "lucide-react";
import { JobCategories, JobLocations } from "../assets/assets";

const AddJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    location: JobLocations[0],
    category: JobCategories[0],
    level: "Beginner Level",
    salary: "",
  });

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const experienceLevels = [
    "Beginner Level",
    "Intermediate Level",
    "Senior Level",
  ];

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write detailed job description...",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["link"],
            ["clean"],
          ],
        },
      });
    }

    return () => {
      if (quillRef.current) {
        // Clean up Quill instance
        quillRef.current = null;
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const description = quillRef.current?.root.innerHTML;
    const jobData = {
      ...formData,
      description,
    };
    console.log("Job Data:", jobData);
  };

  return (
    <div className="mx-auto max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-urbanist text-2xl font-bold text-gray-900">
          Post a New Job
        </h1>
        <p className="mt-2 text-gray-600">
          Fill in the details below to create a new job posting
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Job Title */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <label className="mb-2 block font-medium text-gray-700">
            Job Title
          </label>
          <div className="flex rounded-lg border border-gray-300 transition-all focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
            <div className="flex items-center pl-3">
              <Briefcase className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g. Senior Frontend Developer"
              className="w-full rounded-r-lg border-0 px-3 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-0"
              required
            />
          </div>
        </div>

        {/* Location and Category */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <label className="mb-2 block font-medium text-gray-700">
              Location
            </label>
            <div className="flex rounded-lg border border-gray-300">
              <div className="flex items-center pl-3">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <select
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full rounded-r-lg border-0 px-3 py-3 focus:outline-none focus:ring-0"
              >
                {JobLocations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <label className="mb-2 block font-medium text-gray-700">
              Category
            </label>
            <div className="flex rounded-lg border border-gray-300">
              <div className="flex items-center pl-3">
                <Building2 className="h-5 w-5 text-gray-400" />
              </div>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full rounded-r-lg border-0 px-3 py-3 focus:outline-none focus:ring-0"
              >
                {JobCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Experience Level and Salary */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <label className="mb-2 block font-medium text-gray-700">
              Experience Level
            </label>
            <div className="flex rounded-lg border border-gray-300">
              <div className="flex items-center pl-3">
                <Users className="h-5 w-5 text-gray-400" />
              </div>
              <select
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                className="w-full rounded-r-lg border-0 px-3 py-3 focus:outline-none focus:ring-0"
              >
                {experienceLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <label className="mb-2 block font-medium text-gray-700">
              Annual Salary (USD)
            </label>
            <div className="flex rounded-lg border border-gray-300 transition-all focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
              <div className="flex items-center pl-3">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                placeholder="e.g. 100000"
                className="w-full rounded-r-lg border-0 px-3 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-0"
                required
              />
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <label className="mb-2 block font-medium text-gray-700">
            Job Description
          </label>
          <div ref={editorRef} className="min-h-[200px]" />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3 font-medium text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Send className="h-5 w-5" />
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
