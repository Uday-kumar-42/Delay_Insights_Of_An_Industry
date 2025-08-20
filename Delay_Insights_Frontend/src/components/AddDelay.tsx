import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { CopyPlus } from "lucide-react";

const AddDelayForm = () => {
  const employee = useSelector((state: RootState) => state.employee);
  const [shop, setShop] = useState("");
  const [eqpts, setEqpts] = useState([]);
  const [subEqpts, setSubEqpts] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [descrs, setDescrs] = useState([]);
  const [contds, setContds] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [delayCodes, setDelayCodes] = useState([]);
  const [showDescrInput, setShowDescrInput] = useState(false);
  const [showDelayCodeInput, setShowDelayCodeInput] = useState(false);

  const [formData, setFormData] = useState({
    delay_date: "",
    shop_code: 0,
    shop: "",
    start: "",
    upto: "",
    eqpt: "",
    sub_eqpt: "",
    agency: "",
    descr: "",
    contd: "",
    material: "",
    rake: 0,
    delay_code: 0,
    freq: 1,
    eff_durn: 0,
    is_completed: 0,
  });

  useEffect(() => {
    async function fetchFormData() {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get(
          `http://localhost:5000/api/form-data/fetch-form-data?shop_code=${encodeURIComponent(
            employee.shop_code as number
          )}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setShop(response.data.shop);
          setAgencies(response.data.agencies);
          setContds(response.data.contds);
          setDescrs(response.data.descrs);
          setEqpts(response.data.eqpts);
          setMaterials(response.data.materials);
        }
      } catch (error) {
        toast.error("Error occurred while fetching form data", {
          position: "bottom-right",
          autoClose: 1500,
          theme: "dark",
          draggable: true,
        });
      }
    }
    fetchFormData();
  }, [employee.shop_code]);

  useEffect(() => {
    if (employee.shop_code) {
      setFormData((prev) => ({
        ...prev,
        shop_code: Number(employee.shop_code),
      }));
    }
  }, [employee.shop_code]);

  useEffect(() => {
    if (shop) {
      setFormData((prev) => ({
        ...prev,
        shop: shop,
      }));
    }
  }, [shop]);

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "eqpt") {
      const token = localStorage.getItem("jwtToken");
      setFormData((prev) => ({ ...prev, sub_eqpt: "", eqpt: value }));
      try {
        if (value.trim() !== "") {
          const response = await axios.get(
            `http://localhost:5000/api/form-data/fetch-form-sub-eqpt-data?shop_code=${encodeURIComponent(
              employee.shop_code as number
            )}&eqpt=${encodeURIComponent(value)}`,
            {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true,
            }
          );

          if (response.status === 200) {
            setSubEqpts(response.data.sub_eqpts);
          }
        }
      } catch (error) {
        console.log(error);
        console.log("Equipment API call failed");
      }
      return;
    }

    if (name === "descr") {
      setFormData((prev) => ({ ...prev, descr: value.toUpperCase() }));
      const match = descrs.find((d: { descr: string }) => d.descr === value);
      setShowDescrInput(!match);
      try {
        const token = localStorage.getItem("jwtToken");
        if (value.trim() !== "") {
          const response = await axios.get(
            `http://localhost:5000/api/form-data/fetch-form-delay-code-data?descr=${encodeURIComponent(
              value.toUpperCase()
            )}`,
            {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true,
            }
          );
          if (
            response.status === 200 &&
            response.data.delay_codes?.length !== 0
          ) {
            console.log(response.data);
            setDelayCodes(response.data.delay_codes);
            setShowDelayCodeInput(false);
          } else {
            setShowDelayCodeInput(true);
          }
        }
      } catch (error) {
        setShowDelayCodeInput(true);
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };

    if (updated.start && updated.upto) {
      const [sh, sm] = updated.start.split(":");
      const [uh, um] = updated.upto.split(":");
      const start = parseFloat(`${sh}.${sm}`);
      const upto = parseFloat(`${uh}.${um}`);
      const startMinutes = Number(sh) * 60 + Number(sm);
      const uptoMinutes = Number(uh) * 60 + Number(um);

      let duration = 0;
      if (startMinutes <= uptoMinutes) {
        duration = (uptoMinutes - startMinutes) / 60;
      } else {
        duration = (uptoMinutes + (1440 - startMinutes)) / 60;
      }

      updated.eff_durn = Number(duration.toFixed(2));
      console.log(uptoMinutes, startMinutes);
      updated.start = start;
      updated.upto = upto;
    }

    setFormData(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const requestBody = {
      ...formData,
      rake: parseInt(formData.rake as any),
      freq: parseInt(formData.freq as any),
      delay_code: parseInt(formData.delay_code as any),
    };

    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.post(
        `http://localhost:5000/api/form-data/add-delay-data`,
        requestBody,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      console.log(response)
      if (response.status === 200) {
        toast.success("Insertion successful..!", {
          position: "bottom-right",
          autoClose: 2000,
          theme: "dark",
          draggable: true,
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          toast.error("Insertion Failed", {
            position: "bottom-right",
            autoClose: 2000,
            theme: "dark",
            draggable: true,
          });
        } else if (error.response?.status === 401) {
          toast.error("Please Fill the details", {
            position: "bottom-right",
            autoClose: 2000,
            theme: "dark",
            draggable: true,
          });
        } else {
          toast.error("Something went wrong!", {
            position: "bottom-right",
            autoClose: 2000,
            theme: "dark",
            draggable: true,
          });
        }
      } else {
        toast.error("Error while Inseting!", {
          position: "bottom-right",
          autoClose: 2000,
          theme: "dark",
          draggable: true,
        });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl lg:my-5 mx-auto p-6 lg:rounded-xl border-2 border-neutral-100 shadow-md"
    >
      <ToastContainer />
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center flex items-center gap-2 justify-center">
        <CopyPlus className="w-6 h-6" />
        Add Delay Entry
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Date */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Delay Date
          </label>
          <input
            name="delay_date"
            type="date"
            onChange={handleChange}
            required
            className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Shop Code */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Shop Code
          </label>
          <input
            name="shop_code"
            type="number"
            value={employee.shop_code as number}
            readOnly
            required
            className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Shop */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Shop</label>
          <input
            name="shop"
            type="text"
            value={shop}
            readOnly
            required
            className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Start Time
          </label>
          <input
            name="start"
            type="time"
            required
            onChange={handleTimeChange}
            className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Upto Time
          </label>
          <input
            name="upto"
            type="time"
            required
            onChange={handleTimeChange}
            className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Equipment
          </label>
          <select
            name="eqpt"
            onChange={handleChange}
            className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">Select Equipment</option>
            {eqpts.map((e: { eqpt: string }, i) => (
              <option key={i} value={e.eqpt}>
                {e.eqpt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Sub Equipment
          </label>
          <select
            name="sub_eqpt"
            value={formData.sub_eqpt}
            onChange={handleChange}
            className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">Select Sub Equipment</option>
            {subEqpts.map((s: { sub_eqpt: string }, i) => (
              <option key={i} value={s.sub_eqpt}>
                {s.sub_eqpt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Agency
          </label>
          <select
            name="agency"
            onChange={handleChange}
            required
            className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">Select Agency</option>
            {agencies.map((a: { agency: string }, i) => (
              <option key={i} value={a.agency}>
                {a.agency}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Material
          </label>
          <select
            name="material"
            onChange={handleChange}
            className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">Select Material</option>
            {materials.map((m: { material: string }, i) => (
              <option key={i} value={m.material}>
                {m.material}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Rake</label>
          <input
            name="rake"
            type="number"
            min={0}
            onChange={handleChange}
            className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Description
          </label>
          {!showDescrInput ? (
            <select
              name="descr"
              onChange={handleChange}
              required
              className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">Other</option>
              {descrs.map((d: { descr: string }, i) => (
                <option key={i} value={d.descr}>
                  {d.descr}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              name="descr"
              placeholder="Enter Description"
              onChange={handleChange}
              required
              className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          )}
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Delay Code
          </label>
          {!showDelayCodeInput ? (
            <select
              name="delay_code"
              onChange={handleChange}
              required
              className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">Select Delay Code</option>
              {delayCodes.map((d: { delay_code: number }, i) => (
                <option key={i} value={d.delay_code}>
                  {d.delay_code}
                </option>
              ))}
            </select>
          ) : (
            <input
              name="delay_code"
              type="number"
              min={0}
              onChange={handleChange}
              className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          )}
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Contd
          </label>
          <select
            name="contd"
            onChange={handleChange}
            className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">Select</option>
            {contds.map((c: { contd: string }, i) => (
              <option key={i} value={c.contd}>
                {c.contd}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Frequency
          </label>
          <input
            name="freq"
            type="number"
            onChange={handleChange}
            min={1}
            className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Is Completed
          </label>
          <select
            name="is_completed"
            onChange={handleChange}
            className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="1">True</option>
            <option value="0">False</option>
          </select>
        </div>
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="bg-yellow-400 text-black font-semibold px-6 py-2 mt-4 rounded-lg shadow-md hover:bg-yellow-300 transition-transform transform hover:scale-105"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddDelayForm;
