import { Award, Factory, MapPin, Shield, Users, Zap } from "lucide-react";

const KeyDifferences = () => {
  return (
    <div className="bg-gradient-to-br from-slate-100 to-blue-50 py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            What Sets Us Apart
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Unique advantages and pioneering achievements that define our
            excellence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Quality Leadership
            </h3>
            <p className="text-gray-600 mb-4">
              Renowned for exceptional quality steel products and unmatched
              customer service standards. Market leader in long products with
              consistent quality that exceeds industry benchmarks.
            </p>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-800 font-semibold">
                Market Leader in Long Products
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Unique Positioning
            </h3>
            <p className="text-gray-600 mb-4">
              India's only shore-based integrated steel plant, offering
              strategic advantages in raw material procurement and finished
              goods distribution through coastal shipping.
            </p>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm text-green-800 font-semibold">
                Only Indian Shore-Based Steel Plant
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Technology Pioneer
            </h3>
            <p className="text-gray-600 mb-4">
              High levels of automation and computerization with pioneering
              adoption of advanced technologies including Coke Dry Quenching and
              100% Continuous Casting.
            </p>
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="text-sm text-purple-800 font-semibold">
                Advanced Automation & Technology
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Certified Excellence
            </h3>
            <p className="text-gray-600 mb-4">
              Comprehensive quality and safety certifications ensuring
              world-class standards in manufacturing processes and environmental
              management.
            </p>
            <div className="space-y-2">
              <div className="bg-orange-50 p-2 rounded text-center">
                <p className="text-xs font-semibold text-orange-800">
                  ISO 9001 (Quality)
                </p>
              </div>
              <div className="bg-orange-50 p-2 rounded text-center">
                <p className="text-xs font-semibold text-orange-800">
                  ISO 14001 (Environment)
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
            <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
              <Factory className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Process Innovation
            </h3>
            <p className="text-gray-600 mb-4">
              Industry-first implementations of cutting-edge technologies and
              processes, setting benchmarks for efficiency and environmental
              sustainability.
            </p>
            <div className="bg-teal-50 p-3 rounded-lg">
              <p className="text-sm text-teal-800 font-semibold">
                Pioneer in Coke Dry Quenching
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Customer Focus
            </h3>
            <p className="text-gray-600 mb-4">
              Unwavering commitment to customer satisfaction through superior
              service, timely delivery, and customized steel solutions for
              diverse industrial applications.
            </p>
            <div className="bg-indigo-50 p-3 rounded-lg">
              <p className="text-sm text-indigo-800 font-semibold">
                Excellence in Customer Service
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyDifferences;
