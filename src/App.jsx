
import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './component/navbar'
import { Card1, Card2 } from './component/card'
import { FinancialSection1, FinancialSection2 } from './component/card'
import { FAQPage } from './component/FAQPage'
import LoginPage from "./component/LoginPage";
import LearningApp from "./component/Learning/Learning_app"
import { LevelApp } from './component/Learning/levels'
import { LevelFinishApp } from './component/Learning/Finish'
import { Practice } from './component/Learning/Practice';
import { AboutModule } from './component/Learning/About_Modules';
import { LevelFinishApp2 } from './component/Learning/FInishModule';
import { SignInPage } from './component/SigninPage'
import QuestionnaireApp from './component/Analysis/Analysis_Home';
import SelectionApp from './component/Analysis/SelectionPage'
import PortfolioAnalyzerApp from './component/Analysis/PortfolioAnalyzer';
import TrendAnalyzer from './component/Analysis/TrendAnalyzer';
import { AuthProvider } from './context/AuthContext';
import { FooterPage } from './component/LearningEnd'
import { SlideSensex } from './component/SlideSensex'
import { Dashboard } from './component/Dashboard'
import { ProtectedRoute } from './component/ProtectedRoute'
import { TranslationProvider } from './context/TranslationContext';
import { Contact } from './component/Contact/Contact'
import { Policies } from './component/Policies/Policies'
import About from './component/About/About' // Changed this line
import My_modules from './component/Learning/My_modules';
import MainContent from './component/Learning/Modules';


function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
      <TranslationProvider> 
        <Router>
          <Routes>
            <Route path='/' element={
              <div className="w-[px] h-[px] bg-[#F1F2F4]">
               <Navbar/>
                <br />
                <div className="flex bg-[#F1F2F4] h-[calc(100vh-80px)] px-5">
                  <Card1/>
                  <div className='px-2'></div>
                  <Card2/>
                  
                </div>
                
                <br />
                <div className='min-h-screen px-5 flex rounded-2xl'>
                  <div>
                    <FinancialSection1/>
                    <br />
                    <FinancialSection2/>
                  </div>
                </div>
                <FAQPage/>
                <FooterPage/>
              </div>
            }/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/signIn' element={<SignInPage/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/policies' element={<Policies/>}/>
            <Route path='/about' element={<About/>}/>

            <Route element={<ProtectedRoute />}>
            <Route path='/login/learning' element={<LearningApp/>}/>
  <Route path='/login/learning/modules' element={<MainContent/>}/>
  <Route path='/login/learning/my_modules' element={<My_modules/>}/>
  <Route path='/login/learning/my_modules/about/:moduleId' element={<AboutModule/>}/>
              <Route path='/login/learning/module/:moduleId/level/:levelId' element={<LevelApp />}/>
              <Route path='/login/learning/module/:moduleId/level/:levelId/practice' element={<Practice/>}/>
              <Route path='login/learning/module/level/finish' element={<LevelFinishApp/>}/>
              <Route path='login/learning/module/finish' element={<LevelFinishApp2/>}/>
              <Route path='/login/analysis' element={<QuestionnaireApp/>}/>
              <Route path='/login/analysis/selection' element={<SelectionApp/>}/>
              <Route path='/login/analysis/portfolioAnalyzer' element={<PortfolioAnalyzerApp/>}/>
              <Route path='/login/analysis/trendAnalyzer' element={<TrendAnalyzer/>}/>
              <Route path='/login/slidesensex' element={<SlideSensex/>}/>
              <Route path='/login/Dashboard' element={<Dashboard/>}/>
            </Route>
          </Routes>
        </Router>
      </TranslationProvider>
    </AuthProvider>
  )
}

export default App