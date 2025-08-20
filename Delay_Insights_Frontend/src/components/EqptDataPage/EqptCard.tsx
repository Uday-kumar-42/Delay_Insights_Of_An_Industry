import React from "react";

interface MasterEqptDataItem {
  eqpt_code: number;
  eqpt: string;
  total_delays: number;
  downtime: string;
  sub_eqpts: string[];
  iconComponent: IconComponent;
}

interface IconComponent {
  icon: React.ComponentType<any>;
  color: string;
}

interface EqptCardProps {
  eqpt_data: MasterEqptDataItem;
}

const EqptCard = (props: EqptCardProps) => {
  const { eqpt_code, eqpt, total_delays, downtime, sub_eqpts, iconComponent } =
    props.eqpt_data;

  return (
    <div className="rounded-xl border border-gray-300 shadow-md p-6 flex flex-col space-y-4 transition hover:shadow-lg">
      {/* Header with icon */}
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full ${iconComponent.color}`}>
          <iconComponent.icon className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{eqpt}</h2>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 text-sm text-gray-700">
        <DetailRow label="Eqpt Code" value={eqpt_code} />
        <DetailRow label="Downtime" value={`${downtime} hrs`} />
        <DetailRow label="Total Delays" value={total_delays} />
        <div>
          <span className="font-medium text-gray-600">Sub Eqpts:</span>
          {sub_eqpts.length > 0 ? (
            <div className="mt-1 flex flex-wrap gap-2">
              {sub_eqpts.map((sub_eqpt, index) => (
                <span
                  key={index}
                  className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-xs border border-yellow-300"
                >
                  {sub_eqpt}
                </span>
              ))}
            </div>
          ) : (
            <span className="italic text-md mx-2">N/A</span>
          )}
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

export default EqptCard;
