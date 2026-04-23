import { FaBars, FaTimes } from "react-icons/fa";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/admin-logo.png";
import { useNavigate } from "react-router-dom";
import {
  Bot,
  Briefcase,
  Building2,
  ClipboardList,
  Gauge,
  Mail,
  MailPlus,
  MessagesSquare,
  NotebookPen,
  Users,
  LogOut,
  X,
  LandPlot,
  TowerControl,
} from "lucide-react";
import toast from "react-hot-toast";

const AdminLayout = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navItems = [
    { icon: <Gauge />, label: "Dashboard", to: "/admin" },
    {
      icon: <LandPlot />,
      label: "Property Management",
      to: "property-management",
    },
    {
      icon: <TowerControl />,
      label: "Developer Management",
      to: "developer-management",
    },
    { icon: <Mail />, label: "Newsletter", to: "/admin/newsletter" },
    { icon: <MailPlus />, label: "Emailer", to: "/admin/emailer" },
    { icon: <Users />, label: "Subscriber", to: "/admin/subscriber" },
    // { icon: <MessagesSquare />, label: "Leads", to: "/admin/contacts" },
    { icon: <MessagesSquare />, label: "Leads", to: "/admin/leads" },
    // { icon: <ClipboardList />, label: "Call Back Leads", to: "/admin/request" },
    { icon: <Bot />, label: "Chat Leads", to: "/admin/chatleads" },
    { icon: <NotebookPen />, label: "Blogs", to: "/admin/blogs" },
    { icon: <Building2 />, label: "Listing Requests", to: "/admin/listing" },
    { icon: <Briefcase />, label: "Opportunity", to: "/admin/opportunity" },
  ];

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    toast.success("Logout successfully");
    navigate("/admin-login", { replace: true });
  };

  return (
    <div className="h-screen flex flex-col lg:flex-row overflow-hidden bg-black text-white font-raleway relative">
      {/* Mobile Top Nav */}
      <div className="lg:hidden bg-[#111] flex items-center justify-between px-4 py-3 shadow-md">
        <a href="/admin">
          <img src={logo} alt="logo" className="h-10 w-auto" />
        </a>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white text-xl"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Slide-out Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-0 left-0 w-full h-[90vh] bg-[#111] z-50 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <img src={logo} alt="logo" className="h-12" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-white text-2xl"
            >
              <FaTimes />
            </button>
          </div>
          <nav className="flex flex-col gap-4 text-base">
            {navItems.map(({ icon, label, to }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded ${location.pathname === to
                  ? "bg-[var(--primary-color)] text-black font-semibold"
                  : "hover:bg-[var(--primary-color)] hover:text-black"
                  }`}
              >
                {icon} {label}
              </Link>
            ))}
          </nav>
          <button
            onClick={() => setShowLogoutModal(true)}
            className="mt-6 flex items-center gap-3 px-4 py-3 rounded text-red-400 hover:bg-red-500 hover:text-white"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}

      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-[#111] shadow-md p-4 fixed h-full">
        <a href="/admin" className="py-4">
          <img src={logo} alt="logo" className="h-10 w-auto mx-auto mb-2 invert brightness-0" />
        </a>
        <nav className="flex-1 flex flex-col gap-2 text-sm overflow-y-auto">
          {navItems.map(({ icon, label, to }) => (
            <NavItem
              key={to}
              icon={icon}
              label={label}
              to={to}
              active={location.pathname === to}
            />
          ))}
        </nav>

        <button
          onClick={() => setShowLogoutModal(true)}
          className="mt-auto flex items-center gap-2 px-3 py-2 rounded text-sm text-red-400 hover:bg-red-500 hover:text-white transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* Logout confirmation model */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#111] w-full max-w-sm rounded-lg border border-gray-700 p-6 shadow-xl animate-fadeIn">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Confirm Logout</h2>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <p className="text-sm text-gray-400 mb-6">
              Are you sure you want to logout from the admin panel?
            </p>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded bg-[#222] hover:bg-[#333] transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 overflow-y-auto p-4 sm:p-6 pb-20 lg:pb-6 h-full">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation (optional, you can remove this if using top menu) */}
      {/* <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#111] border-t border-[#222] flex justify-around items-center h-14 z-40">
        {navItems.map(({ icon, label, to }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center justify-center flex-1 text-xs ${
                isActive
                  ? "text-[var(--primary-color)] font-semibold"
                  : "text-gray-400 hover:text-[var(--primary-color)]"
              }`}
            >
              <div className="text-lg">{icon}</div>
              <span className="mt-0.5">{label}</span>
            </Link>
          );
        })}
      </nav> */}
    </div>
  );
};

const NavItem = ({
  icon,
  label,
  to,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
}) => (
  <Link
    to={to}
    className={`flex items-center gap-2 px-3 py-2 rounded whitespace-nowrap ${active
      ? "bg-[var(--primary-color)] text-black font-semibold"
      : "hover:bg-[var(--primary-color)] hover:text-black"
      }`}
  >
    {icon} {label}
  </Link>
);

export default AdminLayout;
