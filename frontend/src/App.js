// App.js

import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import StudentDashboard from './pages/StudentDashboard';
import Chatbot from './pages/Chatbot';
import AptitudeLandingPage from './pages/AptitudeLanding';
import LogicalReasoning from './pages/LogicalReasoning';
import Results from './components/Results';
import RoadMap from './pages/RoadMap';
import CareerPredictionForm from './pages/Forms';

import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ExploreCareerOptions from './pages/ExploreCareerOptions';
import ReportUpload from './pages/ReportUpload';
import ProfilePage from './pages/ProfilePage';
import ResultsPage from './pages/ResultsPage';
import Notifications from './pages/Notifications';
import CareerOptions from './pages/CareerOptions';
import SkillGap from './pages/SkillGap';
import VerbalAbility from './pages/VerbalAbility';
import NumericalAbility from './pages/NumericalAbility';
import SkillGapForm from './pages/SkillGapForm';
import StudentProfile from './pages/StudentProfile';
import MockInterview from './pages/MockInterview';
import PreAptitude from './pages/PreAptitude';
import StudentForm from './pages/StudentForm';
import GraduateForm from './pages/GraduateForm';
import ProfessionalForm from './pages/ProfessionalForm';
import Contact from './pages/Contact';
import ResumeUploader from './pages/ProfessionalForm';

function App() {
  const [scores, setScores] = useState({ numerical: 0, verbal: 0, logical: 0 });

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/recommendations" element={<ReportUpload />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/chatbot" element={<Chatbot />} /> 
            <Route path="/student/dashboard" element={<StudentDashboard />} /> 
            <Route path="/numerical-ability/:userType" element={<NumericalAbility setScores={setScores} />} />
            <Route path="/verbal-ability" element={<VerbalAbility setScores={setScores} />} />
            <Route path="/logical-reasoning" element={<LogicalReasoning setScores={setScores} />} />
            <Route path="/results" element={<Results scores={scores} />} />
            <Route path="/aptitude/:userType" element={<AptitudeLandingPage />} />          
            <Route path="/student/dashboard" element={<StudentDashboard />} />  
            <Route path="/roadmap" element={<RoadMap/>}/>   
             
            <Route path="/forms" element={<CareerPredictionForm/>}/>  
            <Route path="/Dashboard" element={<Dashboard/>} />  
            <Route path="/ExploreCareerOptions" element={ <ExploreCareerOptions/>} />
            <Route path="/profile" element={<ProfilePage/>} />
            <Route path="/ResultsPage" element={<ResultsPage/>} />
            <Route path="/Notifications" element={<Notifications />} />
            <Route path="/CareerOptions" element={<CareerOptions />} />
            <Route path="/SkillGap" element={<SkillGap />} /> 
            
            <Route path="/skill-gap" element={<SkillGapForm />} />
            <Route path="/report" element={<ReportUpload />} />
            
            <Route path="/mock-interview" element={<MockInterview />} />
            <Route path="/preaptitude" element={<PreAptitude />} />
            <Route path="/contact" element={<Contact />} />
            

            <Route path="/student-form" element={<StudentForm />} />
            <Route path="/graduate-form" element={<GraduateForm />} />
            <Route path="/student-profile/:userId" element={<StudentProfile />} />
            <Route path="/professional-form" element={<ResumeUploader />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;