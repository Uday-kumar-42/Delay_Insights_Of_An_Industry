import { MapPin } from "lucide-react";

const Location = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Location & Infrastructure
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Strategically located on India's eastern coast with world-class
            infrastructure
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Map Section */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-300 p-6 text-gray-900">
              <div className="flex items-center space-x-3">
                <MapPin className="h-6 w-6 text-gray-900" />
                <h3 className="text-xl font-semibold">Strategic Location</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center mb-6">
                <iframe
                  title="Custom Map Location - Vizag"
                  className="w-full h-64  rounded-xl shadow-lg border"
                  src="https://www.google.com/maps?q=17.618467,83.1547039&z=13&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-1">Latitude</h4>
                  <p className="text-sm text-gray-600">17.6184° N</p>
                </div>
                <div className="bg-slate-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-1">
                    Longitude
                  </h4>
                  <p className="text-sm text-gray-600">83.1547° E</p>
                </div>
              </div>
            </div>
          </div>

          {/* Infrastructure Details */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Infrastructure Highlights
              </h3>
              <div className="space-y-6">
                <div className="border-l-4 border-yellow-500 pl-6">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Plant & Township
                  </h4>
                  <p className="text-gray-600 mb-2">
                    Sprawling across thousands of acres, the plant is
                    complemented by the modern township of Ukkunagaram,
                    providing comprehensive residential and social amenities.
                  </p>
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <p className="text-sm text-yellow-900">
                      <strong>Ukkunagaram:</strong> A planned township with
                      modern infrastructure, schools, hospitals, and
                      recreational facilities for employees and their families.
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-yellow-500 pl-6">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Captive Mines
                  </h4>
                  <p className="text-gray-600 mb-2">
                    Strategic ownership of captive mines ensures consistent
                    supply of essential raw materials:
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-yellow-100 p-2 rounded text-center">
                      <p className="text-xs font-semibold text-yellow-900">
                        Limestone
                      </p>
                    </div>
                    <div className="bg-yellow-100 p-2 rounded text-center">
                      <p className="text-xs font-semibold text-yellow-900">
                        Dolomite
                      </p>
                    </div>
                    <div className="bg-yellow-100 p-2 rounded text-center">
                      <p className="text-xs font-semibold text-yellow-900">
                        Manganese Ore
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-yellow-500 pl-6">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Logistics Excellence
                  </h4>
                  <p className="text-gray-600">
                    Prime coastal location provides unparalleled logistics
                    advantages with direct access to Visakhapatnam Port,
                    extensive rail connectivity, and proximity to major
                    industrial corridors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
