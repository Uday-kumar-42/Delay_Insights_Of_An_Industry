### **Steel Plant Production Delay Analysis** 

A real-time web application designed to analyze and visualize production delays in a steel plant. Built with **React** and leveraging **React Router DOM**, this application provides key insights into industrial process delays, their causes, and performance bottlenecks using real-world steel industry data.

-----

### **Features**

  * **User Authentication:** Secure login functionality for employees to access the dashboard.
  * **Comprehensive Dashboard:** A protected dashboard with various components for visualizing production data.
  * **Production Metrics:** `SummaryCards` provide a quick overview of key performance indicators.
  * **Data Visualization:** Interactive graphs and charts, including `ShopGraph`, `TimeRangeGraph`, and `DelayCodePieChart`, help identify delay trends and root causes.
  * **Detailed Data Views:** Dedicated pages for viewing and analyzing `ShopData` and `Equipment Data`.
  * **Drill-Down Capabilities:** The ability to explore sub-equipment details and specific delay causes.
  * **Delay Reporting:** An `AddDelayForm` component for reporting new production delays.
  * **Calendar View:** A `CalendarComponent` for a chronological overview of delays.

-----

### **Tech Stack** 

  * **Frontend:** [React](https://reactjs.org/)
  * **Routing:** [React Router DOM](https://reactrouter.com/en/main)
  * **State Management:** (Implied, e.g., Context API or Redux)
  * **Backend:** (A separate backend is implied for data and authentication. **Note: this README focuses on the frontend.**)
  * **Data Visualization:** (Implied libraries like Chart.js or D3.js)

-----

### **Project Structure**

```
/steel-plant-analysis
├── src/
│   ├── components/
│   │   ├── Dashboard_page/
│   │   │   ├── CalendarComponent.jsx
│   │   │   ├── DelayCodePieChart.jsx
│   │   │   └── ... (other dashboard components)
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── SignInPage.jsx
│   │   │   └── ... (other page components)
│   │   └── ...
│   ├── App.jsx             # Main application component with router setup
│   └── main.jsx
├── package.json
└── README.md
```

-----

### **Setup & Installation** 

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/[your-username]/[your-repo-name].git
    cd [your-repo-name]
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the application:**
    ```bash
    npm run dev
    ```
    (Note: If your project uses `npm start`, use that command instead.)

-----

### **Authentication Flow**

The application features a `ProtectedPage` component that wraps the dashboard and its child routes. When a user tries to access a protected route (`/dashboard` and its sub-routes), the `ProtectedPage` checks for an authenticated session. If the user is not logged in, they are redirected to the `SignIn` page.

-----

### **Dashboard Overview** 

The dashboard is the central hub for data analysis. It combines multiple components to provide a comprehensive view of production delays:

  * `SummaryCards`: High-level metrics for quick insights.
  * `ShopGraph` & `ShopGraph2`: Visualizations of delay data by shop floor.
  * `TimeRangeGraph`: Displays delays over a specific period.
  * `DelayCodePieChart`: A breakdown of delay causes by code.
  * `DescrDetails` & `EqptDetails`: Detailed information on specific delays and equipment.
  * `CalendarComponent`: A calendar view of all reported delays.

-----

### **Routing** 

The application uses `react-router-dom` for navigation, with a nested routing structure for the dashboard to manage different sections effectively.

  * `/`: Main landing page
  * `/about`: About page
  * `/signin`: Employee login page
  * `/dashboard`: The main protected dashboard page
  * `/dashboard/shop-data`: View shop-floor data
  * `/dashboard/shop-data/view`: Detailed view of shop data
  * `/dashboard/eqpt-data`: View equipment data
  * `/dashboard/eqpt-data/view`: Detailed view of equipment data
  * `/dashboard/sub-eqpt-data`: View sub-equipment details
  * `/dashboard/add-delay`: Form to add new delay records

-----

### **Author**

Developed by **[Uday Kumar Pampana]** [GitHub Profile](https://github.com/Uday-kumar-42)
