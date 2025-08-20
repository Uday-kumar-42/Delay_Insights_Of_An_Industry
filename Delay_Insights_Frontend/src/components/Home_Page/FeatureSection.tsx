import {
  Database,
  ShieldCheck,
  LayoutDashboard,
  SearchCheck,
  Building2,
  Users2,
} from "lucide-react";

const features = [
  {
    title: "Add Delay Data",
    description:
      "Easily log and manage delay incidents across various departments with structured forms.",
    icon: <Database className="w-8 h-8 text-yellow-500" />,
  },
  {
    title: "Dashboard Overview",
    description:
      "Get a comprehensive view of delays with charts, summaries, and real-time analytics.",
    icon: <LayoutDashboard className="w-8 h-8 text-yellow-500" />,
  },
  {
    title: "Shop-wise Data",
    description:
      "Access and analyze delays department-wise to identify patterns and bottlenecks.",
    icon: <Building2 className="w-8 h-8 text-yellow-500" />,
  },
  {
    title: "Advanced Querying",
    description:
      "Search and filter delay data using flexible query tools and export results if needed.",
    icon: <SearchCheck className="w-8 h-8 text-yellow-500" />,
  },
  {
    title: "Secure Access",
    description:
      "Only authorized personnel can access the system ensuring safety and integrity of data.",
    icon: <ShieldCheck className="w-8 h-8 text-yellow-500" />,
  },
  {
    title: "User Management",
    description:
      "Manage authenticated users, roles, and permissions for streamlined access control.",
    icon: <Users2 className="w-8 h-8 text-yellow-500" />,
  },
];

export const FeaturesSection = () => {
  return (
    <section className="bg-white py-20 px-6 md:px-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          System Features
        </h2>
        <p className="mt-2 text-gray-600">
          Explore how the VSP Delay Management System streamlines operations and
          boosts efficiency.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="p-6 bg-slate-100 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02] box-border"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
