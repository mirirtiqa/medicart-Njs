// // src/app/components/Header.js
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-[#033B4A] shadow-md h-[7vh]">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center h-full px-4">
        {/* Left side: GPS icon, Doctor's office (as a link) and timings */}
        <div className="flex flex-col sm:flex-col md:flex-row items-center sm:items-start w-full sm:w-auto md:space-x-4">
          <a 
            href="https://www.google.com/maps/place/Doctor's+Office+Location" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Google Maps"
            className="flex items-center text-white hover:text-gray-300"
          >
            <FaMapMarkerAlt size="1em" />
            <span className="ml-2 md:text-sm font-montserrat">Doctor's Office</span>
          </a>
          <div className="flex items-center mt-2 sm:mt-2 md:mt-0 space-x-2">
            <FaClock size="1em" className="text-white" />
            <p className="text-sm md:text-sm text-white font-montserrat">Open: Mon-Fri, 9:00 AM - 5:00 PM</p>
          </div>
        </div>
        
        {/* Right side: Social media icons and Get an Appointment button */}
        <div className="flex items-center justify-end w-full sm:w-auto space-x-4 mt-2 sm:mt-0">
          {/* Social media icons: hidden below 640px */}
          <div className="hidden sm:flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white hover:text-gray-300">
              <FaFacebookF size="1em" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-white hover:text-gray-300">
              <FaTwitter size="1em" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white hover:text-gray-300">
              <FaInstagram size="1em" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white hover:text-gray-300">
              <FaLinkedinIn size="1em" />
            </a>
          </div>

          {/* "Get an Appointment" button: stays on the right side */}
          <button className="bg-[#01D6A3] text-white px-4 py-1 rounded hover:bg-opacity-90 transition text-sm w-full sm:w-auto min-w-[130px]">
            Get an Appointment
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;






