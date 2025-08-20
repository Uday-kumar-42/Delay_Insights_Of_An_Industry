const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-600 to-yellow-400 text-gray-900 py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Building India's Steel Future
        </h2>
        <p className="text-xl text-gray-800 mb-8 max-w-2xl mx-auto">
          Four decades of excellence, innovation, and commitment to quality.
          Discover how RINL-VSP continues to forge the path forward for India's
          steel industry.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Explore Our Products
          </button>
          <button className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};


export default Footer;