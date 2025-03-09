const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section - About */}
        <div>
          <p className="text-gray-400">
            There are many variations of passages of Lorem Ipsum available, but majority have suffered.
          </p>
        </div>

        {/* Middle Section - Navigation */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <a href="#" className="text-gray-400 hover:text-white">Home</a>
          <a href="#" className="text-gray-400 hover:text-white">About</a>
          <a href="#" className="text-gray-400 hover:text-white">Event</a>
          <a href="#" className="text-gray-400 hover:text-white">Blog</a>
        </div>

        {/* Right Section - Contact Info */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold">Contact</h3>
          <p className="text-gray-400 flex items-center">
            📍 263, London Street, British Charles, NYC
          </p>
          <p className="text-gray-400 flex items-center">
            📞 +44 254 896 4556
          </p>
          <p className="text-gray-400 flex items-center">
            ✉ sfrtrrtyutytr@gmail.com
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-6 pt-4 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
        <p>© 2024 All rights reserved by glory</p>
        
        <div className="flex space-x-4">
          <a href="#" className="hover:text-white">Terms & Conditions</a>
          <a href="#" className="hover:text-white">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
