import * as React from 'react';
import NxWelcome from './nx-welcome';
import { Link, Route, Routes } from 'react-router-dom';

const EmployeePortal = React.lazy(() => import('employee-portal/Module'));
const AttendancePortal = React.lazy(() => import('attendance-portal/Module'));
const Dashboard = React.lazy(() => import('dashboard/Module'));
const PayrollPortal = React.lazy(() => import('payroll-portal/Module'));
const InventoryPortal = React.lazy(() => import('inventory-portal/Module'));
const PostPortal = React.lazy(() => import('post-portal/Module'));
const SalesPortal = React.lazy(() => import('sales-portal/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/employee-portal">EmployeePortal</Link>
        </li>
        <li>
          <Link to="/attendance-portal">AttendancePortal</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/payroll-portal">PayrollPortal</Link>
        </li>
        <li>
          <Link to="/inventory-portal">InventoryPortal</Link>
        </li>
        <li>
          <Link to="/post-portal">PostPortal</Link>
        </li>
        <li>
          <Link to="/sales-portal">SalesPortal</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<NxWelcome title="shell" />} />
        <Route path="/employee-portal" element={<EmployeePortal />} />
        <Route path="/attendance-portal" element={<AttendancePortal />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/payroll-portal" element={<PayrollPortal />} />
        <Route path="/inventory-portal" element={<InventoryPortal />} />
        <Route path="/post-portal" element={<PostPortal />} />
        <Route path="/sales-portal" element={<SalesPortal />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
