import CalendarComponent from "../Dashboard_page/CalendarComponent";
import DelayCodePieChart from "../Dashboard_page/DelayCodePieChart";
import DescrDetails from "../Dashboard_page/DescrDetails";
import EqptDetails from "../Dashboard_page/EqptDetails";
import ShopGraph from "../Dashboard_page/ShopGraph";
import ShopGraph2 from "../Dashboard_page/ShopGraph2";
import SummaryCards from "../Dashboard_page/SummaryCards";
import TimeRangeGraph from "../Dashboard_page/TimeRangeGraph";

const Dashboard = () => {
  return (
    <>
      {/* <LineChartElement /> */}
      <SummaryCards />
      <div className="md:flex items-start justify-center mt-5 space-y-5">
        <ShopGraph />
        <TimeRangeGraph />
      </div>
      <div className="md:flex items-start justify-center mx-auto space-y-5">
        <ShopGraph2 />
        <DelayCodePieChart />
      </div>
      <div className="lg:flex ">
        <DescrDetails />
        <EqptDetails />
      </div>
      <CalendarComponent />
    </>
  );
};

export default Dashboard;
