import React, { useState } from "react";
import Navbar from "../navbarModule";
import DashboardLayout from "../DashboardLayout";
import { useNavigate } from "react-router-dom";
export function Practice() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [activeSection, setActiveSection] = useState("Learning Hub");
  const Navigate=useNavigate();
  const quizData = {
    title: "SPENDING WISELY",
    level: 2,
    topic: "Personal Finance",
    questions: [
      {
        id: 1,
        text: "What percentage of your income should you ideally save?",
        options: ["5-10%", "10-20%", "20-30%", "30-50%"],
        correctAnswer: 1,
      },
      {
        id: 2,
        text: "Which of these is an example of a fixed expense?",
        options: ["Groceries", "Rent", "Entertainment", "Clothing"],
        correctAnswer: 1,
      },
      {
        id: 3,
        text: "What is an emergency fund used for?",
        options: [
          "Buying luxury items",
          "Unexpected expenses",
          "Investing in stocks",
          "Vacation trips",
        ],
        correctAnswer: 1,
      },
      {
        id: 4,
        text: "Which of these is considered bad debt?",
        options: [
          "Home mortgage",
          "Student loan",
          "Credit card debt",
          "Business loan",
        ],
        correctAnswer: 2,
      },
      {
        id: 5,
        text: "What does a credit score measure?",
        options: [
          "Your intelligence",
          "Your savings balance",
          "Your borrowing history",
          "Your income level",
        ],
        correctAnswer: 2,
      },
      {
        id: 6,
        text: "What is the '50-30-20' rule?",
        options: [
          "50% needs, 30% wants, 20% savings",
          "50% savings, 30% needs, 20% wants",
          "50% wants, 30% savings, 20% needs",
          "50% expenses, 30% investments, 20% debt",
        ],
        correctAnswer: 0,
      },
      {
        id: 7,
        text: "Which type of account typically has the highest interest rate?",
        options: [
          "Checking account",
          "Savings account",
          "Fixed deposit account",
          "Credit card account",
        ],
        correctAnswer: 2,
      },
      {
        id: 8,
        text: "What is compound interest?",
        options: [
          "Interest earned on the principal amount",
          "Interest earned on interest",
          "A one-time interest payment",
          "A penalty for early withdrawal",
        ],
        correctAnswer: 1,
      },
      {
        id: 9,
        text: "What is the main benefit of budgeting?",
        options: [
          "Spending more on entertainment",
          "Tracking income and expenses",
          "Avoiding paying taxes",
          "Saving only when extra money is available",
        ],
        correctAnswer: 1,
      },
      {
        id: 10,
        text: "Which of these is a smart saving habit?",
        options: [
          "Spending first, saving later",
          "Waiting for a raise before saving",
          "Setting aside a fixed amount regularly",
          "Only saving when extra money is available",
        ],
        correctAnswer: 2,
      },
    ],
  };

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null); // Reset selection for next question
    } else {
      Navigate("/login/learning/module/level/finish");
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setSelectedOption(null); // Reset selection when going back
    }
  };

  const currentQ = quizData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;

  return (
    <div>
      <Navbar />
      <DashboardLayout activeSection={activeSection} setActiveSection={setActiveSection}>
        <div className="bg-gray-100 min-h-screen p-5 w-full">
          <div className="w-full flex flex-col gap-5 mx-auto" style={{ maxWidth: "none" }}>
            {/* Quiz Header */}
            <div className="flex flex-col items-center gap-2.5">
              <h1 className="text-black text-lg font-light tracking-[2.7px] text-center break-words m-0">
                {quizData.title}
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
              Level {quizData.level} - Test your knowledge on {quizData.topic}
            </div>

            {/* Question Box */}
            <div className="w-full bg-white rounded-xl p-6 box-border">
              <div className="text-black text-2xl font-normal break-words mb-4">
                Question {currentQuestion + 1}
              </div>
              <div className="text-black text-lg font-normal break-words">{currentQ.text}</div>
            </div>

            {/* Options Container */}
            <div className="flex flex-col gap-4 w-full mt-5">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  className={`w-[50%] py-[23px] px-[39px] ${
                    selectedOption === index ? "bg-gray-300" : "bg-gray-50"
                  } shadow-md rounded-[70px] flex justify-start items-center gap-2 box-border cursor-pointer transition-all duration-300 ease-in-out border-none text-left hover:bg-gray-200`}
                  onClick={() => handleOptionSelect(index)}
                >
                  <div className="text-black text-base font-normal break-words">{option}</div>
                </button>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {/* Previous Button */}
              <button
                className="p-4 bg-gray-600 rounded-full cursor-pointer w-32 h-12 flex justify-center items-center hover:bg-gray-700 transition-colors text-white font-bold"
                onClick={handlePrevQuestion}
                disabled={currentQuestion === 0}
              >
                ← Previous
              </button>

              {/* Next Button */}
              <button
                className="p-4 bg-black rounded-full cursor-pointer w-32 h-12 flex justify-center items-center hover:bg-gray-800 transition-colors text-white font-bold"
                onClick={handleNextQuestion}
              >
                {currentQuestion === quizData.questions.length - 1 ? "Finish" : "Next →"}
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}
