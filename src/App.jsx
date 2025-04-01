import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './component/navbar'
import { Card1,Card2 } from './component/card'
import {FinancialSection1,FinancialSection2} from './component/card'
import {FAQPage} from './component/FAQPage'
import LoginPage from "./component/LoginPage";
import LearningApp from "./component/Learning/Learning_app"
import{LevelApp} from './component/Learning/levels'
import{LevelFinishApp} from './component/Learning/Finish'
import { Practice } from './component/Learning/Practice';
import { AboutModule } from './component/Learning/About_Modules';
import {LevelFinishApp2} from './component/Learning/FInishModule';
import {SignInPage} from './component/SigninPage'
import QuestionnaireApp from './component/Analysis/Analysis_Home';
import SelectionApp from './component/Analysis/SelectionPage'
import PortfolioAnalyzerApp from './component/Analysis/PortfolioAnalyzer';
import TrendAnalyzer from './component/Analysis/TrendAnalyzer';
import { AuthProvider } from './context/AuthContext';
import {Fotter_Page} from './component/LearningEnd'
import {SlideSensex} from './component/SlideSensex'
import {Dashboard} from './component/Dashboard'
import {ProtectedRoute} from './component/ProtectedRoute'
import { TranslationProvider } from './context/TranslationContext';
const data = {
  level: 1,
  progress: 50,
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  documentation: 'This is a sample documentation text. Replace this with actual documentation content from JSON.'
};
function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <AuthProvider>
    <TranslationProvider> 
    <Router>
      <Routes>
      <Route path='/' element={
    <div  className="w-[1440px] h-[3698px] bg-[#F1F2F4]"  > <Navbar></Navbar>
    <br />
 
   
    <div className="flex bg-[#F1F2F4] h-[calc(100vh-80px)] px-5 ">    <Card1></Card1>
   <Card2></Card2>
    </div>
    <br />
    <div className='min-h-screen px-5 flex rounded-2xl'>
     
      <div>    <FinancialSection1></FinancialSection1>
      <br />
      <FinancialSection2></FinancialSection2></div>

    </div>
    <FAQPage></FAQPage>
    <Fotter_Page/>
    
   
    
 </div>}/>
 <Route path='/login' element={<LoginPage/>}></Route>
 <Route path='/signIn' element={<SignInPage/>}></Route>

 <Route element={<ProtectedRoute />}>
 <Route path='/login/learning' element={<LearningApp/>}></Route>
 <Route path='/login/learning/module/about' element={<AboutModule/>}></Route>
<Route path='/login/learning/module/level' element={<LevelApp data={data}></LevelApp>}></Route>
<Route path='/login/learning/module/practice' element={<Practice/>}/>
<Route path='login/learning/module/level/finish' element={<LevelFinishApp/>}

  />
  <Route path='login/learning/module/finish' element={<LevelFinishApp2/>}></Route>
  <Route path='/login/analysis' element={<QuestionnaireApp/>}> </Route>
  <Route path='/login/analysis/selection' element={<SelectionApp/>}/>
  <Route path='/login/analysis/portfolioAnalyzer' element={<PortfolioAnalyzerApp/>}/>
  <Route path='/login/analysis/trendAnalyzer' element={<TrendAnalyzer/>}></Route>
  <Route path='/login/slidesensex' element={<SlideSensex/>}></Route>
  <Route path='/login/Dashboard' element={<Dashboard/>}/>
  </Route>
 </Routes>

 </Router>
 </TranslationProvider>
 </AuthProvider>
    </>
  )
}

export default App
