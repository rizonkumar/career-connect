import {
  Users,
  Building2,
  Briefcase,
  Search,
  Target,
  Rocket,
  Check,
  ArrowRight,
} from "lucide-react";

const About = () => {
  const features = [
    {
      icon: <Search className="h-6 w-6 text-blue-600" />,
      title: "Smart Job Search",
      description:
        "Advanced search functionality with filters for job titles, locations, and categories to help users find their perfect role.",
    },
    {
      icon: <Building2 className="h-6 w-6 text-blue-600" />,
      title: "Top Companies",
      description:
        "Partner with leading companies across various industries to provide high-quality job opportunities.",
    },
    {
      icon: <Target className="h-6 w-6 text-blue-600" />,
      title: "Targeted Matching",
      description:
        "Intelligent matching system that connects candidates with jobs that align with their skills and experience.",
    },
    {
      icon: <Rocket className="h-6 w-6 text-blue-600" />,
      title: "Easy Applications",
      description:
        "Streamlined application process that lets candidates apply to multiple jobs with just a few clicks.",
    },
  ];

  const stats = [
    {
      icon: <Building2 className="h-5 w-5 text-blue-600" />,
      value: "2000+",
      label: "Companies",
    },
    {
      icon: <Briefcase className="h-5 w-5 text-blue-600" />,
      value: "10,000+",
      label: "Active Jobs",
    },
    {
      icon: <Users className="h-5 w-5 text-blue-600" />,
      value: "500K+",
      label: "Users",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl 2xl:px-20">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="font-urbanist mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            About CareerConnect
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
            Your bridge to successful career opportunities. We connect talented
            professionals with leading companies through an innovative and
            user-friendly platform.
          </p>
        </div>

        {/* Stats Section */}
        <div className="mb-16">
          <div className="mx-auto grid max-w-xl grid-cols-1 gap-6 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                {stat.icon}
                <h3 className="mt-4 text-3xl font-bold text-gray-900">
                  {stat.value}
                </h3>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-4 inline-block rounded-xl bg-blue-50 p-3">
                  {feature.icon}
                </div>
                <h3 className="font-urbanist mb-2 text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white sm:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-urbanist mb-6 text-3xl font-bold">
              Our Mission
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-blue-50">
              To revolutionize the job search experience by creating a seamless
              connection between job seekers and employers. We're committed to
              helping individuals find fulfilling careers while assisting
              companies in building strong teams.
            </p>
            <div className="space-y-4">
              {[
                "User-friendly interface for effortless job search",
                "Advanced filtering system for precise matches",
                "Secure and efficient application process",
                "Regular updates with new job opportunities",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center gap-2"
                >
                  <Check className="h-5 w-5 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="font-urbanist mb-6 text-3xl font-bold text-gray-900">
            Ready to Start Your Journey?
          </h2>
          <a
            href="/jobs"
            className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-blue-700"
          >
            Explore Jobs
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
