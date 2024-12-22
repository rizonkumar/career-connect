import { Mail, Linkedin, Github, Twitter, Code, Trophy } from "lucide-react";

const Contact = () => {
  const handleStartConversation = () => {
    window.location.href = "mailto:rizon.kumar.rahi@gmail.com";
  };

  const socialLinks = [
    {
      icon: <Linkedin className="h-6 w-6" />,
      url: "https://www.linkedin.com/in/rizonkumarrahi/",
      label: "LinkedIn",
    },
    {
      icon: <Github className="h-6 w-6" />,
      url: "https://github.com/rizonkumar",
      label: "GitHub",
    },
    {
      icon: <Twitter className="h-6 w-6" />,
      url: "https://twitter.com/RizonKumar",
      label: "Twitter",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl 2xl:px-20">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="font-urbanist mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
            Let's collaborate on your next digital venture
          </p>
        </div>

        {/* Main Contact Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white sm:p-12">
          <div className="flex flex-col items-start gap-8 md:flex-row md:gap-16">
            <div className="flex-1">
              <h2 className="font-urbanist mb-6 text-2xl font-bold sm:text-3xl">
                Ready to Bring Your Ideas to Life?
              </h2>
              <div className="space-y-4 text-blue-50">
                <p>
                  I'm a full-stack developer who's been building web apps for a
                  couple of years. I'm really into React, Redux, Tailwind CSS,
                  Express JS, and Prisma. I've used these tools to create some
                  awesome websites. I also have experience working with
                  Salesforce Commerce Cloud (SFCC) to build e-commerce
                  platforms.
                </p>
                <ul className="ml-5 list-disc space-y-2">
                  <li>Skilled in React, Next.js, Node.js, and more</li>
                  <li>Experienced with MySQL, MongoDB, and Prisma</li>
                  <li>Proficient in various development tools and platforms</li>
                </ul>
                <p>
                  Let's discuss how I can contribute to your project's success!
                </p>
              </div>
            </div>
            <div className="w-full md:w-auto">
              <button
                onClick={handleStartConversation}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-blue-600 transition-all hover:bg-blue-50 md:w-auto"
              >
                <span>Start a Conversation</span>
                <Mail className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-16 text-center">
          <h3 className="font-urbanist mb-8 text-2xl font-bold text-gray-900">
            Connect with me on:
          </h3>
          <div className="flex justify-center gap-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-gray-200 bg-white p-4 text-gray-600 transition-all hover:border-blue-600 hover:text-blue-600 hover:shadow-md"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Coding Achievements */}
        <div className="mt-16">
          <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <Trophy className="mx-auto mb-6 h-12 w-12 text-blue-600" />
            <h3 className="font-urbanist mb-6 text-2xl font-bold text-gray-900">
              Coding Achievements
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li>
                Built various projects, checkout my github profile for more
                details
              </li>
              <li>Ranked 96th Worldwide in LeetCode Weekly Contest 294</li>
              <li>Solved 700+ problems on LeetCode, GFG, and CodeStudio</li>
              <li>
                Achieved #1 GFG Rank at SRM Institute of Science and Technology
              </li>
            </ul>
          </div>
        </div>

        {/* Career Interest */}
        <div className="mt-8 text-center">
          <div className="mx-auto max-w-2xl rounded-xl bg-blue-50 p-6">
            <Code className="mx-auto mb-4 h-8 w-8 text-blue-600" />
            <p className="text-gray-600">
              I'm seeking full-time opportunities as a Software Engineer or Full
              Stack Developer. Let's discuss how I can contribute to your team's
              success!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
