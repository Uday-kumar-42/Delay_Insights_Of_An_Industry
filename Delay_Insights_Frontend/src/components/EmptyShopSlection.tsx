import { useNavigate } from "react-router-dom";
import emptyCart from "../assets/empty-cart.png";
import { StoreIcon } from "lucide-react";

interface EmptySelectionProps {
  variant: "shop" | "eqpt";
}

const EmptySelection = ({ variant }: EmptySelectionProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] min-w-[50vw] flex items-center justify-center mx-auto mt-20">
      <div className="bg-gray-50 border border-neutral-200 shadow-md rounded-xl p-8 w-full max-w-md text-center space-y-6">
        <img
          src={emptyCart}
          alt="No Shops Selected"
          className="w-48 h-48 mx-auto opacity-80"
        />
        <h2 className="text-2xl font-semibold text-gray-700">
          No {variant} selected
        </h2>
        Shop
        <p className="text-gray-500 text-sm">
          You haven’t selected any {variant} yet. Please go back and choose at
          least one.
        </p>
        <button
          onClick={() => navigate("/dashboard/shop-data")}
          className="flex items-center justify-center gap-2 mx-auto bg-yellow-400 hover:bg-yellow-300 text-neutral-700 px-6 py-2 rounded-md w-[80%] font-medium shadow transition-all duration-300"
        >
          <StoreIcon className="w-6 h-5 text-neutral-600 " />
          Select {variant}s
        </button>
      </div>
    </div>
  );
};

export default EmptySelection;
