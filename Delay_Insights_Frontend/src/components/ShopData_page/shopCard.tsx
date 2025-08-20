import type { LucideProps } from "lucide-react";
import React from "react";

interface MasterShopDataItem {
  shop_code: number;
  shop: string;
  abbreviation: string;
  total_delays: number;
  downtime: string;
  eqpts: string[];
  iconComponent: IconComponent;
} 

interface IconComponent {
  icon: React.ComponentType<LucideProps>;
  color: string;
}

interface ShopCardProps {
  shop_data: MasterShopDataItem;
}

const ShopCard = (props: ShopCardProps) => {
  const {
    shop,
    abbreviation,
    shop_code,
    downtime,
    total_delays,
    eqpts,
    iconComponent,
  } = props.shop_data;

  return (
    <div className="rounded-xl border border-gray-300 shadow-md p-6 flex flex-col space-y-4 transition hover:shadow-lg">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full ${iconComponent.color}`}>
          <iconComponent.icon className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{shop}</h2>
          <p className="text-sm text-gray-700">{abbreviation}</p>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-700">
        <DetailRow label="Shop Code" value={shop_code} />
        <DetailRow label="Downtime" value={`${downtime} hrs`} />
        <DetailRow label="Total Delays" value={total_delays} />
        <div>
          <span className="font-medium text-gray-600">Eqpts:</span>
          <div className="mt-1 flex flex-wrap gap-2">
            {eqpts.map((eqpt, index) => (
              <span
                key={index}
                className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-xs border border-yellow-300"
              >
                {eqpt}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-600 w-36 font-medium">{label}:</span>
      <span className="text-gray-800">{value}</span>
    </div>
  );
};

export default ShopCard;
