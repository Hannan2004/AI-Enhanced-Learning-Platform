import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import StudentDashboard from './pages/StudentDashboard';
import Chatbot from './pages/Chatbot';
import AptitudeLandingPage from './pages/AptitudeLanding';
//import NumericalAbility from './pages/NumericalAbility';
//import VerbalAbility from './pages/VerbalAbility';
import LogicalReasoning from './pages/LogicalReasoning';
import Results from './components/Results';
import RoadMap from './pages/RoadMap';
import CareerPredictionForm from './pages/Forms';
import AfterLogin from './pages/AfterLogin';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import ExploreCareerOptions from './pages/ExploreCareerOptions';
import ProfilePage from './pages/ProfilePage';
import ResultsPage from './pages/ResultsPage';
import Notifications from './pages/Notifications';
import CareerOptions from './pages/CareerOptions';
import SkillGap from './pages/SkillGap';
import VerbalAbility from './pages/VerbalAbility';
import NumericalAbility from './pages/NumericalAbility';
import Test from './pages/Test';
//import MockInterview from './pages/MockInterview';
function App() {
  const [scores, setScores] = useState({ numerical: 0, verbal: 0, logical: 0 });

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/chatbot" element={<Chatbot />} /> 
            <Route path="/student/dashboard" element={<StudentDashboard />} /> 
            <Route path="/numerical-ability" element={<NumericalAbility setScores={setScores} />} />
            <Route path="/verbal-ability" element={<VerbalAbility setScores={setScores} />} />
            <Route path="/logical-reasoning" element={<LogicalReasoning setScores={setScores} />} />
            <Route path="/results" element={<Results scores={scores} />} />
            <Route path="/aptitude" element={<AptitudeLandingPage />} />          
            <Route path="/student/dashboard" element={<StudentDashboard />} />  
            <Route path="/roadmap" element={<RoadMap/>}/>   
            <Route path="/studentorprofessional" element={<AfterLogin/>}/>   
            <Route path="/forms" element={<CareerPredictionForm/>}/>  
            <Route path="/Dashboard" element={<Dashboard/>} />  
            <Route path="/ExploreCareerOptions" element={ <ExploreCareerOptions/>} />
            <Route path="/ProfilesPage" element={<ProfilePage/>} />
            <Route path="/ResultsPage" element={<ResultsPage/>} />
            <Route path="/Notifications" element={<Notifications />} />
            <Route path="/CareerOptions" element={<CareerOptions />} />
            <Route path="/SkillGap" element={<SkillGap />} />
            <Route path="/Test" element={<Test />} />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;