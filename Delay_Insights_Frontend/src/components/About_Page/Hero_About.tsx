import { Award, Globe, Shield, Zap } from "lucide-react";

const Hero = () => {
  return (
    <>
      <div className="relative bg-neutral-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-70"></div>
        <div className="relative container mx-auto px-6 pt-20 pb-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
              RINL-Rashtriya Ispat Nigam Limited
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-yellow-200">
              Visakhapatnam Steel Plant
            </p>
            <p className="text-lg md:text-xl mb-8 text-gray-200 italic">
              "Forging the Future with Quality Steel and Sustainable Practices"
            </p>
            <p className="text-base md:text-lg text-gray-200 max-w-3xl mx-auto">
              The Steel Backbone of India's Growth – Pioneering excellence in
              steel manufacturing since 1982
            </p>
          </div>
        </div>
        <div className="absolute top-0 w-full h-16 bg-gradient-to-t from-transparent to-white"></div>
      </div>

      {/* Mission Statement Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 p-4 rounded-full">
                <Globe className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              To be India's premier integrated steel producer, committed to
              delivering world-class quality steel products while maintaining
              the highest standards of environmental stewardship, technological
              innovation, and social responsibility. We strive to contribute
              significantly to India's industrial growth and infrastructure
              development.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
                <Award className="h-8 w-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">
                  Quality Excellence
                </h3>
                <p className="text-sm text-gray-600">
                  Unwavering commitment to producing superior quality steel
                  products
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl">
                <Shield className="h-8 w-8 text-green-600 mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">
                  Sustainability
                </h3>
                <p className="text-sm text-gray-600">
                  Environmental responsibility and sustainable manufacturing
                  practices
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl">
                <Zap className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">Innovation</h3>
                <p className="text-sm text-gray-600">
                  Continuous technological advancement and process optimization
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
