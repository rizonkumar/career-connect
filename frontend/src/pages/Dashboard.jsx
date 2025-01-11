import { assets } from "../assets/assets";
import Logo from "../components/Logo";

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      {/* Navbar for Recuriter Panel */}
      <div>
        <div>
          <Logo />
          <div>
            <p>Welcome, to Recuriter Panel</p>
            <div>
              {/* Company Icon/Logo */}
              <img src={assets.company_icon} alt="company_icon" />
              <div>
                <ul>
                  <li>Logout</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
