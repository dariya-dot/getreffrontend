import React from 'react';
import {  Route, Routes } from "react-router-dom";
import NavSection from './components/NavSection';
import Fulljobdetails from './components/Fulljobdetails';
import ErrorBoundary from './components/ErrorBoundary'; // Import ErrorBoundary
import Refjobs from './components/Refjobs';

import './index.css'
import UserSignin from './components/UserSignin';
import ReferlSignin from './components/ReferlSignIn';
import RefjobpostForm from './components/RefjobpostForm';
import RefpostedJobs from './components/RefpostedJobs';
import RefjobApplication from './components/RefjobApplication';
import Userdetailspost from './components/Userdetailspost';
import RefDetailsUpload from './components/RefDetailsUpload';
import RefLandingPage from './pages/RefLandingPage';
import Userdashbord from './components/Userdashbord';

import FooterSection from './components/FooterSection';
import Faqs from './components/footer/Faqs';
import TermsAndConditions from './components/footer/TermsAndConditions';
import PrivacyPolicy from './components/footer/PrivacyPolicy';
import UserforgetPassword from './components/UserforgetPassword';
import UserReset from './components/UserReset';
import RefForgetPassword from './components/RefForgetPassword';
import RefReset from './components/RefReset';

const App = () => {
  return (
   
      <ErrorBoundary>
        <NavSection />

        <Routes>
          
          <Route path='/usersignin' element={<UserSignin/>}/>
          <Route path='/updateuser' element={<Userdetailspost/>}/>
          <Route path='/userdashbord/:userId' element={<Userdashbord/>}/>
          <Route path='/refdashbord/:referrerId' element={<RefLandingPage/>}/>
          <Route path='/refjobdetails/:referrerId' element={<RefpostedJobs/>}/>
          <Route path='/jobapplication/:refJobId' element={<RefjobApplication/>}/>
          <Route path='/referlsignin' element={<ReferlSignin/>}/>
          <Route path='/refjobform' element={<RefjobpostForm/>}/>
          <Route path='/userform' element={<Userdetailspost/>}/>
          <Route path='/refdetails' element={<RefDetailsUpload/>}/>
         
          <Route path='/' element={<Refjobs />} />
          <Route path='/get/:refJobId' element={<Fulljobdetails />} />
          <Route path='/faq' element={   <Faqs/>}/>
          <Route path='/terms' element={  <TermsAndConditions/>}/>
          <Route path='/privacy' element={  <PrivacyPolicy/>}/>
          <Route path='/forgetpassword' element={      <UserforgetPassword/>}/>
          <Route path='/forgetpassword/:resetToken' element={<UserReset/>}/>
          <Route path='/refforgetpassword/:resetToken' element={<RefReset/>}/>
          <Route path='/refforgetpassword' element={<RefForgetPassword/>}/>


        </Routes>
     <FooterSection/>
      </ErrorBoundary>
    
  );
};

export default App;
