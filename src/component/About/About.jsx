import React from 'react';
import { useTranslationContext } from '../../context/TranslationContext';
import TranslatorText from '../Text';
import { FooterPage } from '../LearningEnd';
import Navbar from '../navbar';
import Card2 from '../../../public/Card2.jpeg'
import Card from '../../assets/Card.svg'
import { useNavigate } from 'react-router-dom';
const About = () => {
  const { t } = useTranslationContext();
  const Navigate=useNavigate();
  function submitRating(){
    alert("Rating Submitted")
  }
  return (
    <>
      <Navbar />
      
      <div className="bg-gray-50  min-h-screen  ">



    

        {/* Hero Section with Stat Card */}
      {/* Left Column - Text Content */}
        <div className="w-[1455px] h-screen mx-auto flex  gap-[30px] ">
    {/* first column */}
          <div className='justify-end items-end pl-[108px] h-screen w-[408px]'>
            <div className='h-[129px]'></div>
         <div><img src={Card2} alt="" className='h-[378px] w-[300px] rounded-[10px] '/></div>   

        <div className='p-[30px]'></div>

            
            <div class="bg-white rounded-lg shadow-lg p-6 max-w-xs">
        <h2 class="text-lg font-semibold mb-2">Best ratings</h2>
        <div class="space-y-2 mb-4">
            <div class="h-2 bg-gray-200 rounded-full w-3/4"></div>
            <div class="h-2 bg-gray-200 rounded-full w-1/2"></div>
        </div>
        <div class="flex justify-between">
            <span class="emoji text-3xl  cursor-pointer" onclick="submitRating()">😡</span>
            <span class="emoji text-3xl cursor-pointer" onclick="submitRating()">😟</span>
            <span class="emoji text-3xl cursor-pointer" onclick="submitRating()">😐</span>
            <span class="emoji text-3xl cursor-pointer" onclick="submitRating()">😜</span>
            <span class="emoji text-3xl cursor-pointer" onclick="submitRating()">😁</span>
        </div>
    </div>
          </div>
{/* secondCoulmn */}
<div className='w-[300px]'>
    <div className='h-[64px]'></div>
    <div className='h-[px]'><img src={Card} alt="" className='h-[px]'/></div>
    <div className='h-[30px]'></div>
    <div><img src={Card2} alt="" className='h-[378px] w-[300px] rounded-[10px] '/></div>   


</div>
{/* third column */}
<div className='p-[52px]' >
  <div className='h-[119px]'></div>

<div class="bg-white rounded-lg shadow-lg p-8 h-[411px] w-[512px] mx-auto">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
        <p class="text-gray-600 mb-6">
        Welcome to our platform - your go-to destination for free and accessible finance education. We offer in-depth analysis, personalized insights, and an engaging interface to make financial learning easy and enjoyable. With powerful tools like our portfolio analyzer and an AI-driven trend analyzer chatbot, we help you track your investments and stay ahead of market trends. Whether you're a beginner or a pro, we're here to support your financial journey every step of the way.
        </p>
        
        <button class="bg-black text-white mt-[45px] py-2 px-6 rounded-full flex items-center  hover:bg-gray-500" onClick={()=>{
          Navigate("/login/dashboard")
        }}>
            Explore More <span class="ml-2">→</span>
        </button>
    </div>

        </div>
          

        </div>

      




{/* Team Section */}


        <div class="container mx-auto px-[] py-12">
   <h1 class="text-5xl font-bold mb-4 ">
    Our Team
   </h1>
   <p class="mb-12 text-gray-600 ">
    Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
   </p>


   {/* cards */}
   <div class="flex flex-wrap  justify-left gap-[32px]">
    <div class="bg-white rounded-lg shadow-lg p-6 w-[624px]">
     <div class="mb-4">
      <img alt="Profile picture of Bonnie Green" class="rounded-full mx-auto" height="100" src="https://storage.googleapis.com/a1aa/image/f1OJaWCzzXeoAbSNEr7GiZCdUhbow2qTU9tZ8Pkiz1c.jpg" width="100"/>
     </div>
     <h2 class="text-xl font-bold mb-2">
      Bonnie Green
     </h2>
     <p class="text-gray-600 mb-4">
      Senior Front-end Developer
     </p>
     <p class="text-gray-600 mb-4">
      Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
     </p>
     <div class="flex justify-center space-x-4">
      <a class="text-gray-600 hover:text-gray-900" href="#">
       <i class="fab fa-facebook">
       </i>
      </a>
      <a class="text-gray-600 hover:text-gray-900" href="#">
       <i class="fab fa-twitter">
       </i>
      </a>
      <a class="text-gray-600 hover:text-gray-900" href="#">
       <i class="fab fa-globe">
       </i>
      </a>
      <a class="text-gray-600 hover:text-gray-900" href="#">
       <i class="fab fa-github">
       </i>
      </a>
     </div>
    </div>
    <div class="bg-white rounded-lg shadow-lg p-6 w-[624px]">
     <div class="mb-4">
      <img alt="Profile picture of Thomas Lean" class="rounded-full mx-auto" height="100" src="https://storage.googleapis.com/a1aa/image/iyAwsk8R19UGXEE0B-Nfawn1gZ1eZO6F3ziONfUyBLA.jpg" width="100"/>
     </div>
     <h2 class="text-xl font-bold mb-2">
      Thomas Lean
     </h2>
     <p class="text-gray-600 mb-4">
      Senior Front-end Developer
     </p>
     <p class="text-gray-600 mb-4">
      Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
     </p>
     <div class="flex justify-center space-x-4">
      <a class="text-gray-600 hover:text-gray-900" href="#">
       <i class="fab fa-facebook">
       </i>
      </a>
      <a class="text-gray-600 hover:text-gray-900" href="#">
       <i class="fab fa-twitter">
       </i>
      </a>
      <a class="text-gray-600 hover:text-gray-900" href="#">
       <i class="fab fa-globe">
       </i>
      </a>
      <a class="text-gray-600 hover:text-gray-900" href="#">
       <i class="fab fa-github">
       </i>
      </a>
     </div>
    </div>
   </div>
    <div className='h-[64px]'></div>
   <div class="flex flex-wrap  justify-left gap-[32px]">
    <div class="bg-white rounded-lg shadow-lg p-6 w-[624px]">
     <div class="mb-4">
      <img alt="Profile picture of Bonnie Green" class="rounded-full mx-auto" height="100" src="https://storage.googleapis.com/a1aa/image/f1OJaWCzzXeoAbSNEr7GiZCdUhbow2qTU9tZ8Pkiz1c.jpg" width="100"/>
     </div>
     <h2 class="text-xl font-bold mb-2">
      Bonnie Green
     </h2>
     <p class="text-gray-600 mb-4">
      Senior Front-end Developer
     </p>
     <p class="text-gray-600 mb-4">
      Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
     </p>
     <div class="flex justify-center space-x-4">
      <a class="text-gray-600 hover:text-gray-900" href="#">
       <i class="fab fa-facebook">
       </i>
      </a>
      <a class="text-gray-600 hover:text-gray-900" href="#">
       <i class="fab fa-twitter">
       </i>
      </a>
      <a class="text-gray-600 hover:text-gray-900" href="#">
       <i class="fab fa-globe">
       </i>
      </a>
      <a class="text-gray-600 hover:text-gray-900" href="#">
       <i class="fab fa-github">
       </i>
      </a>
     </div>
    </div>
    <div class="bg-white rounded-lg shadow-lg p-6 w-[624px]">
     <div class="mb-4">
      <img alt="Profile picture of Thomas Lean" class="rounded-full mx-auto" height="100" src="https://storage.googleapis.com/a1aa/image/iyAwsk8R19UGXEE0B-Nfawn1gZ1eZO6F3ziONfUyBLA.jpg" width="100"/>
     </div>
     <h2 class="text-xl font-bold mb-2">
      Thomas Lean
     </h2>
     <p class="text-gray-600 mb-4">
      Senior Front-end Developer
     </p>
     <p class="text-gray-600 mb-4">
      Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
     </p>
     <div class="flex justify-center space-x-4">
      <a class="text-gray-600 hover:text-gray-900" href="#">
       <i class="fab fa-facebook">
       </i>
      </a>
      <a class="text-gray-600 hover:text-gray-900" href="#">
       <i class="fab fa-twitter">
       </i>
      </a>
      <a class="text-gray-600 hover:text-gray-900" href="#">
       <i class="fab fa-globe">
       </i>
      </a>
      <a class="text-gray-600 hover:text-gray-900" href="#">
       <i class="fab fa-github">
       </i>
      </a>
     </div>
    </div>
   </div>
  </div>
 



        {/* Additional Stats Section */}

      </div>
      
      <FooterPage />
    </>
  );
};

export default About;