import { MapPin, Building2, BriefcaseIcon, ArrowRight } from "lucide-react";
import { assets } from "../assets/assets";

const JobCard = ({ job }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg">
      {/* Company Logo & Level Badge */}
      <div className="mb-4 flex items-center justify-between">
        <div className="h-12 w-12 overflow-hidden rounded-xl border border-gray-100 bg-white p-2">
          <img
            src={assets.company_icon}
            alt={`${job.companyId.name} logo`}
            className="h-full w-full object-contain"
          />
        </div>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
          {job.level}
        </span>
      </div>

      {/* Job Title */}
      <h3 className="mb-2 line-clamp-1 text-lg font-semibold text-gray-900">
        {job.title}
      </h3>

      {/* Company & Location */}
      <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1.5">
          <Building2 className="h-4 w-4" />
          <span className="truncate">{job.companyId.name}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="h-4 w-4" />
          <span className="truncate">{job.location}</span>
        </div>
      </div>

      {/* Description */}
      <div
        className="mb-4 line-clamp-2 text-sm text-gray-600"
        dangerouslySetInnerHTML={{
          __html: job.description.replace(/<[^>]*>/g, "").slice(0, 150) + "...",
        }}
      />

      {/* Salary */}

      {job.salary && (
        <div className="mt-4 flex items-center gap-2 text-sm">
          <span className="font-medium text-gray-700">Salary:</span>
          <span className="font-semibold text-green-600">
            ${job.salary.toLocaleString()}/year
          </span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col gap-3">
        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700">
          <BriefcaseIcon className="h-4 w-4" />
          Apply Now
        </button>
        <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
          Learn More
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default JobCard;
