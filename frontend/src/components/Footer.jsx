import {
  Instagram,
  Linkedin,
  Github,
  Twitter,
  Mail,
  Briefcase,
  Heart,
} from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  const socialLinks = [
    {
      icon: <Instagram className="h-5 w-5" />,
      url: "https://www.instagram.com/rizon__kumar/",
      label: "Instagram",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      url: "https://www.linkedin.com/in/rizonkumarrahi/",
      label: "LinkedIn",
    },
    {
      icon: <Github className="h-5 w-5" />,
      url: "https://github.com/rizonkumar",
      label: "GitHub",
    },
    {
      icon: <Twitter className="h-5 w-5" />,
      url: "https://twitter.com/RizonKumar",
      label: "Twitter",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      url: "mailto:rizon.kumar.rahi@gmail.com",
      label: "Email",
    },
    {
      icon: <Briefcase className="h-5 w-5" />,
      url: "https://rizonkumarrahi.in/",
      label: "Portfolio",
    },
  ];

  return (
    <footer className="border-t border-gray-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl 2xl:px-20">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Logo size="large" />
            <p className="mt-4 text-gray-600">
              Connect with top employers and discover opportunities that match
              your skills and aspirations. Your next career move is just a
              search away.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="mb-4 font-urbanist text-lg font-semibold text-gray-900">
              Quick Links
            </h3>
            <ul className="space-y-2 text-gray-600">
              {["Home", "About", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={
                      item === "Home"
                        ? "/"
                        : `/${item.toLowerCase().replace(" ", "-")}`
                    }
                    className="transition-colors duration-200 hover:text-blue-600"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="md:col-span-1">
            <h3 className="mb-4 font-urbanist text-lg font-semibold text-gray-900">
              Connect With Us
            </h3>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-gray-200 p-2 text-gray-600 transition-colors duration-200 hover:border-blue-600 hover:text-blue-600"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <hr className="mb-6 border-gray-200" />
        <div className="text-center text-sm text-gray-600">
          <p className="flex items-center justify-center gap-1">
            © 2024 CareerConnect. Made with{" "}
            <Heart className="h-4 w-4 fill-red-500 text-red-500" /> by{" "}
            <a
              href="https://rizonkumarrahi.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Rizon Kumar Rahi
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
