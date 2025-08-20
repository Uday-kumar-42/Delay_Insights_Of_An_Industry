import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./components/pages/HomePage";
import { SignIn } from "./components/pages/SignInPage";
import About from "./components/pages/AboutPage";
import DashboardLayout from "./components/pages/DashboardLayoutPage";
import Dashboard from "./components/pages/Dashboard";
import ProtectedPage from "./components/ProtectedPage";
import ShopDataMain from "./components/ShopData_page/ShopDataMain";
import ShopDataView from "./components/ShopData_page/ShopDataView";
import EqptDataMain from "./components/EqptDataPage/EqptDataMain";
import EqptDataView from "./components/EqptDataPage/EqptDataView";
import SubEqptCardsSection from "./components/SubEqptDataPage/SubEqptCardsSection";
import AddDelayForm from "./components/AddDelay";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedPage>
        <DashboardLayout />
      </ProtectedPage>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "shop-data",
        children: [
          {
            index: true,
            element: <ShopDataMain />,
          },
          {
            path: "view",
            element: <ShopDataView />,
          },
        ],
      },

      {
        path: "eqpt-data",
        children: [
          {
            index: true,
            element: <EqptDataMain />,
          },
          {
            path: "view",
            element: <EqptDataView />,
          },
        ],
      },
      {
        path : "sub-eqpt-data",
        element : <SubEqptCardsSection />
      },{
        path : "add-delay",
        element  : <AddDelayForm />
      }
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
