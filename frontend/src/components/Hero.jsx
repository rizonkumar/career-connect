import {
  Search,
  MapPin,
  Briefcase,
  ArrowRight,
  Building2,
  Users,
} from "lucide-react";
import { assets } from "../assets/assets";

const Hero = () => {
  const companyLogos = [
    {
      src: assets.microsoft_logo,
      alt: "Microsoft",
    },
    {
      src: assets.walmart_logo,
      alt: "Walmart",
    },
    {
      src: assets.accenture_logo,
      alt: "Accenture",
    },
    {
      src: assets.samsung_logo,
      alt: "Samsung",
    },
    {
      src: assets.adobe_logo,
      alt: "Adobe",
    },
    {
      src: assets.amazon_logo,
      alt: "Amazon",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-indigo-50 to-white">
      <div className="absolute inset-0 z-0">
        <div className="absolute -left-10 top-20 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl"></div>
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-indigo-100/50 blur-3xl"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 pt-20 md:pt-28 lg:pt-32 2xl:px-20">
        <div className="mx-auto max-w-4xl text-center">
          {/* Stats Banner */}
          <div className="mx-auto mb-8 flex max-w-xl flex-wrap justify-center gap-4 rounded-full bg-white/80 px-6 py-3 shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">2000+ Companies</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">10,000+ Jobs</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium">500K+ Users</span>
            </div>
          </div>

          <h1 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl lg:text-6xl">
            Find Your Dream Job Today
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
            Connect with top employers and discover opportunities that match
            your skills and aspirations. Your next career move is just a search
            away.
          </p>

          {/* Search Section */}
          <div className="mt-8 space-y-4 rounded-2xl bg-white p-4 shadow-xl md:mt-12 md:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <div className="flex flex-1 items-center gap-3 rounded-xl border-2 border-gray-100 bg-gray-50 px-4 py-3 transition-all focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100">
                <Search className="h-6 w-6 text-gray-400" />
                <input
                  placeholder="Search for jobs"
                  className="flex-1 bg-transparent text-base placeholder:text-gray-400 focus:outline-none"
                  type="text"
                />
              </div>

              <div className="flex flex-1 items-center gap-3 rounded-xl border-2 border-gray-100 bg-gray-50 px-4 py-3 transition-all focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100">
                <MapPin className="h-6 w-6 text-gray-400" />
                <input
                  placeholder="Search for location"
                  className="flex-1 bg-transparent text-base placeholder:text-gray-400 focus:outline-none"
                  type="text"
                />
              </div>

              <button className="group flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-3 text-base font-semibold text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 lg:px-12">
                Search Jobs
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Company Logos Section */}
          <div className="mt-16">
            <p className="text-sm font-medium text-gray-500">
              Trusted by leading companies
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
              {companyLogos.map((logo, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center grayscale transition-all duration-200 hover:grayscale-0"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-8 w-auto object-contain md:h-10"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
