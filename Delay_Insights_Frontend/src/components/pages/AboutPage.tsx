import Navbar from "../Navbar";
import Hero from "../About_Page/Hero_About";
import History from "../About_Page/History_About";
import Location from "../About_Page/Location_About";
import KeyDifferences from "../About_Page/KeyDifferences_About";
import { Footer } from "../Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-blue-50">
      {/* Hero Section */}
      <Navbar variant="primary" />
      <Hero />
      <History />
      <Location />
      <KeyDifferences />
      <Footer/>
    </div>
  );
};

export default AboutPage;
