import React, { useState, useEffect } from "react";
import Navbar from "../navbarModule";
import DashboardLayout from "../DashboardLayout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useXp } from "../../context/XpContext";

export function Practice() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [activeSection, setActiveSection] = useState("Learning Hub");
  const [questions, setQuestions] = useState([]);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [totalXP, setTotalXP] = useState(0);
  const navigate = useNavigate();
  const { moduleId, levelId } = useParams();
  const { xp, setXp, badges, setBadges } = useXp();
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/module/${moduleId}/level/${levelId}/questions`);
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
        // Redirect if error occurs
      }
    };

    fetchQuestions();
  }, [moduleId, levelId, navigate,setXp]);

  const handleOptionSelect = (optionIndex) => {
    if (!isAnswerChecked) {
      setSelectedOption(optionIndex);
    }
  };

  const checkAnswer = () => {
    if (selectedOption === null) return;

 
    const currentQ = questions[currentQuestionIndex];
    const correctAnswerIndex = ['A', 'B', 'C', 'D'].indexOf(currentQ.Answer);
    const correct = selectedOption === correctAnswerIndex;
    setIsCorrect(correct);
    setIsAnswerChecked(true);
    
    // Update XP based on answer
    setTotalXP(prevXP => prevXP + (correct ? 10 : 5));
  };

  const updateUserXP = async () => {
    try {
      const userId = localStorage.getItem("userId");
      await axios.post('http://localhost:5001/api/user/update-xp', {
        xp: totalXP,
        moduleId:moduleId,
        levelId:levelId,
        userId: userId
        
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
    } catch (error) {
      console.error("Error updating XP:", error);
    }
  };

  const handleNextQuestion = async () => {
    if (!isAnswerChecked) {
      checkAnswer();
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
      setIsCorrect(false);
    } else {
      // Update user XP before navigating
      await updateUserXP();
      navigate(`/login/learning/module/${moduleId}/level/${levelId}/finish`, {
        state: { 
          totalXP,
          correctAnswers: Math.floor(totalXP / 10), // Since each correct answer gives 10 XP
          totalQuestions: questions.length
        }
      });
    }
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQ = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const getOptionColor = (index) => {
    if (!isAnswerChecked) return selectedOption === index ? "bg-gray-300" : "bg-gray-50";
    
    const correctAnswerIndex = ['A', 'B', 'C', 'D'].indexOf(currentQ.Answer);
    
    if (index === correctAnswerIndex) {
      return "bg-green-200";
    } else if (index === selectedOption && !isCorrect) {
      return "bg-red-200";
    }
    return "bg-gray-50";
  };

  return (
    <div>
      <Navbar />
      <DashboardLayout activeSection={activeSection} setActiveSection={setActiveSection}>
        <div className="bg-gray-100 min-h-screen p-5 w-full">
          <div className="w-full flex flex-col gap-5 mx-auto" style={{ maxWidth: "none" }}>
            {/* Quiz Header */}
            <div className="flex flex-col items-center gap-2.5">
              <h1 className="text-black text-lg font-light tracking-[2.7px] text-center break-words m-0">
                {currentQ.Module_Name}
              </h1>
              <div className="w-full h-2 bg-amber-100 rounded-[101.55px] mt-2.5">
                <div
                  className="h-full bg-amber-300 rounded-[101.55px] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Level Info */}
            <div className="text-black text-3xl font-bold break-words text-center my-5">
              Level {currentQ.Level_no} - {currentQ.Level_Topic}
            </div>

            {/* Question Box */}
            <div className="w-full bg-white rounded-xl p-6 box-border">
              <div className="text-black text-2xl font-normal break-words mb-4">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
              <div className="text-black text-lg font-normal break-words">{currentQ.Question}</div>
            </div>

            {/* Options Container */}
            <div className="flex flex-col gap-4 w-full mt-5">
              {[
                currentQ.Option_A,
                currentQ.Option_B,
                currentQ.Option_C,
                currentQ.Option_D
              ].map((option, index) => (
                <button
                  key={index}
                  className={`w-[50%] py-[23px] px-[39px] ${getOptionColor(index)} shadow-md rounded-[70px] flex justify-start items-center gap-2 box-border cursor-pointer transition-all duration-300 ease-in-out border-none text-left hover:${!isAnswerChecked ? 'bg-gray-200' : ''}`}
                  onClick={() => handleOptionSelect(index)}
                  disabled={isAnswerChecked}
                >
                  <div className="text-black text-base font-normal break-words">
                    {['A', 'B', 'C', 'D'][index]}. {option}
                  </div>
                </button>
              ))}
            </div>

            {/* Feedback Message */}
            {isAnswerChecked && (
              <div className={`text-center p-4 rounded-lg ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {isCorrect ? "Correct! Well done! (+10 XP)" : `Incorrect. The correct answer is ${currentQ.Answer} (+5 XP)`}
              </div>
            )}

            {/* Confirm/Next/Finish Button */}
            <div className="flex justify-center mt-8">
              <button
                className="p-4 bg-black rounded-full cursor-pointer w-32 h-12 flex justify-center items-center hover:bg-gray-800 transition-colors text-white font-bold"
                onClick={handleNextQuestion}
                disabled={selectedOption === null && !isAnswerChecked}
              >
                {!isAnswerChecked ? "Confirm" : 
                 currentQuestionIndex < questions.length - 1 ? "Next →" : "Finish"}
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}