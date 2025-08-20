import { Award, Calendar, Factory, Zap } from "lucide-react";

const History = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Journey
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From vision to reality - Four decades of steel manufacturing
            excellence
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-full p-3 flex-shrink-0">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Foundation (1982)
                </h3>
                <p className="text-gray-600">
                  Established as a public sector enterprise under the Ministry
                  of Steel, Government of India. Envisioned as India's first
                  shore-based integrated steel plant, marking a revolutionary
                  approach to steel manufacturing in the country.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-green-600 text-white rounded-full p-3 flex-shrink-0">
                <Factory className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Plant Commissioning (1992)
                </h3>
                <p className="text-gray-600">
                  The first blast furnace was commissioned, marking the
                  beginning of commercial steel production. Initial capacity of
                  3.0 MTPA established with state-of-the-art technology and
                  modern infrastructure, setting new benchmarks in the Indian
                  steel industry.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-purple-600 text-white rounded-full p-3 flex-shrink-0">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Navratna Status Achievement
                </h3>
                <p className="text-gray-600">
                  Achieved prestigious "Navratna" status, recognizing
                  operational excellence and financial performance. This
                  milestone granted greater operational autonomy and strategic
                  decision-making capabilities, enabling faster growth and
                  expansion initiatives.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-orange-600 text-white rounded-full p-3 flex-shrink-0">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Capacity Expansion (Present)
                </h3>
                <p className="text-gray-600">
                  Successfully expanded production capacity from 3.0 MTPA to 7.3
                  MTPA through strategic modernization and expansion projects.
                  Implemented cutting-edge technologies and automation systems
                  to enhance productivity and quality standards.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-300 rounded-xl p-6 text-black mb-6">
              <h3 className="text-2xl font-bold mb-2">Historic Significance</h3>
              <p className="text-neutral-900">
                India's First Shore-Based Integrated Steel Plant
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-700 font-medium">Established</span>
                <span className="font-semibold text-black">1982</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-700 font-medium">
                  Production Started
                </span>
                <span className="font-semibold text-black">1992</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-700 font-medium">
                  Initial Capacity
                </span>
                <span className="font-semibold text-black">3.0 MTPA</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-700 font-medium">
                  Current Capacity
                </span>
                <span className="font-semibold text-yellow-600 text-lg">
                  7.3 MTPA
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Status</span>
                <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                  Navratna PSU
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default History;