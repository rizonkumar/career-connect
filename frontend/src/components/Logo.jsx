import { Briefcase, Link } from "lucide-react";

const Logo = ({ size = "default" }) => {
  const sizes = {
    small: {
      container: "h-8",
      icon: 16,
      text: "text-lg",
    },
    default: {
      container: "h-10",
      icon: 20,
      text: "text-xl",
    },
    large: {
      container: "h-12",
      icon: 24,
      text: "text-2xl",
    },
  };

  const selectedSize = sizes[size] || sizes.default;

  return (
    <div className="flex items-center gap-2">
      {/* Logo Icon Container */}
      <div className={`${selectedSize.container} relative flex items-center`}>
        {/* Primary Icon */}
        <Briefcase
          className="text-blue-600"
          size={selectedSize.icon}
          strokeWidth={2.5}
        />
        {/* Secondary Icon - Slightly Offset */}
        <Link
          className="absolute left-2.5 text-blue-500"
          size={selectedSize.icon}
          strokeWidth={2.5}
        />
      </div>

      {/* Logo Text */}
      <div className="flex flex-col leading-none">
        <span className={`${selectedSize.text} font-bold text-gray-900`}>
          Connect
          <span className="text-blue-600">Career</span>
        </span>
      </div>
    </div>
  );
};

export default Logo;
