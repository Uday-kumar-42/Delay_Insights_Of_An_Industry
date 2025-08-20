import type { LucideProps } from "lucide-react";
import React from "react";

interface IconComponent {
  icon: React.ComponentType<LucideProps>;
  color: string;
}

interface MatserSubEqptDataItem {
  sub_eqpt_code: number;
  sub_eqpt: string;
  shops: string[];
  eqpts: string[];
  icon: IconComponent;
}

interface SubEqptCardProps {
  data: MatserSubEqptDataItem;
}

const SubEqptCard = ({ data }: SubEqptCardProps) => {
  const { sub_eqpt_code, sub_eqpt, shops, eqpts, icon } = data;
  const Icon = icon.icon;

  return (
    <div className="rounded-xl border border-gray-300 shadow-md p-6 flex flex-col space-y-4 transition hover:shadow-lg bg-white">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full ${icon.color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{sub_eqpt}</h2>
          <p className="text-sm text-gray-600">Code: {sub_eqpt_code}</p>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-700">
        <DetailRow label="Associated Shops" />
        <BadgeList items={shops} badgeColor="bg-yellow-200 text-yellow-900 border-yellow-400" />

        <DetailRow label="Linked Equipment" />
        <BadgeList items={eqpts} badgeColor="bg-blue-100 text-blue-800 border-blue-300" />
      </div>
    </div>
  );
};

const DetailRow = ({ label }: { label: string }) => (
  <div className="text-gray-600 font-medium mt-2">{label}:</div>
);

const BadgeList = ({
  items,
  badgeColor,
}: {
  items: string[];
  badgeColor: string;
}) => (
  <div className="mt-1 flex flex-wrap gap-2">
    {items.map((item, index) => (
      <span
        key={index}
        className={`px-3 py-1 rounded-full text-xs border ${badgeColor}`}
      >
        {item}
      </span>
    ))}
  </div>
);

export default SubEqptCard;
