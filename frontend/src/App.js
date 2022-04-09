import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LogInPage from './pages/login/login.component';
import SignUpPage from './pages/register/signup.component';
import Dashboard from './pages/dashboard/dashboard.component';
import UserDashboard from './pages/udashboard/udashboard.component';
import EmployeePage from './pages/employees/employees.component';
import QuarantinePage from './pages/quarantine/quarantine.component';
import ReportPage from './pages/creports/reports.component';
import WorkSpacePage from './pages/workspace/workspace.component';
import DashboardReportPage from './pages/reportpage/reportpage.component';
import EditUserPage from './pages/edituser/edituser.component';
import HomePage from './pages/homepage/homepage.page';
function App() {
  return (
    <Router>
    <div className="App">
    
    <Routes>
    <Route exact path='/' element={<HomePage/>} />
      <Route exact path='/login' element={<LogInPage/>} />
      <Route exact path='/register' element={<SignUpPage/>} />
      <Route exact path='/dashboard' element={<Dashboard/>} />
      <Route exact path='/user-dashboard' element={<UserDashboard/>} />
      <Route exact path='/corona-reports' element={<ReportPage/>} />
      <Route exact path='/employee' element={<EmployeePage/>} />
      <Route exact path='/quarantine' element={<QuarantinePage/>} />
      <Route exact path='/reports' element={<DashboardReportPage/>} />
      <Route exact path='/workspace' element={<WorkSpacePage/>} />
      <Route exact path='/edit-user/:id' element={<EditUserPage/>} />
    </Routes>

    </div>
    </Router>
  );
}

export default App;
