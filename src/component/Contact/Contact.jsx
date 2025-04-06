import React from "react";
import { useTranslationContext } from "../../context/TranslationContext";
import TranslatorText from "../Text";
import { FooterPage } from '../LearningEnd'
import Navbar from '../navbar'

export function Contact() {
  const { t } = useTranslationContext();

  return (
    <>
    <Navbar/>


      <div className="bg-gray-50 min-h-screen py-10 px-4">
        {/* Contact heading outside the box */}
        <div className="max-w-6xl mx-auto mb-10">
          <h1 className="text-4xl font-bold text-[#0C0D0E] mb-4">
            <TranslatorText>Contact Us</TranslatorText>
          </h1>
          <p className="text-xl text-[#667085]">
            <TranslatorText>Any questions or remarks? Just write us a message!</TranslatorText>
          </p>
        </div>

        {/* Contact box container */}
        <div className="flex flex-col md:flex-row max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
          {/* Left Side: Contact Information (Black Background) */}
          <div className="bg-[#0C0D0E] text-white p-8 md:w-1/2 rounded-l-lg relative overflow-hidden">
            {/* Background elements */}
            
            
            <h2 className="text-2xl font-bold mb-4 relative z-10">
              <TranslatorText>Contact Information</TranslatorText>
            </h2>
            <p className="text-gray-300 mb-8 relative z-10">
              <TranslatorText>Say something to start a live chat!</TranslatorText>
            </p>

            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="text-gray-400">
                    <TranslatorText>Phone</TranslatorText>
                  </p>
                  <p className="text-white font-medium">+918767557713</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-gray-400">
                    <TranslatorText>Email</TranslatorText>
                  </p>
                  <p className="text-white font-medium">investiqxvnsxdevs@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pb-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-gray-400">
                    <TranslatorText>Address</TranslatorText>
                  </p>
                  <p className="text-white font-medium">
                    IIT(BHU) Varanasi<br />
                    221005<br />
                    India
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 relative z-10">
              <h3 className="text-xl font-medium mb-6">
                <TranslatorText>Find Us On</TranslatorText>
              </h3>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form (White Background) */}
          <div className="p-8 md:w-1/2">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#667085] mb-2">
                    <TranslatorText>First Name</TranslatorText>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-b border-[#E8E8E8] focus:outline-none focus:border-[#0C0D0E]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#667085] mb-2">
                    <TranslatorText>Last Name</TranslatorText>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-b border-[#E8E8E8] focus:outline-none focus:border-[#0C0D0E]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#667085] mb-2">
                    <TranslatorText>Email</TranslatorText>
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border-b border-[#E8E8E8] focus:outline-none focus:border-[#0C0D0E]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#667085] mb-2">
                    <TranslatorText>Phone Number</TranslatorText>
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border-b border-[#E8E8E8] focus:outline-none focus:border-[#0C0D0E]"
                    placeholder="+91 012 3456 789"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#667085] mb-4">
                  <TranslatorText>Select Subject?</TranslatorText>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="subject" value="general" className="text-[#0C0D0E] focus:ring-[#0C0D0E]" />
                    <span><TranslatorText>General Inquiry</TranslatorText></span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="subject" value="technical" className="text-[#0C0D0E] focus:ring-[#0C0D0E]" />
                    <span><TranslatorText>Technical Support</TranslatorText></span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="subject" value="billing" className="text-[#0C0D0E] focus:ring-[#0C0D0E]" />
                    <span><TranslatorText>Billing Questions</TranslatorText></span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="subject" value="other" className="text-[#0C0D0E] focus:ring-[#0C0D0E]" />
                    <span><TranslatorText>Other</TranslatorText></span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#667085] mb-2">
                  <TranslatorText>Message</TranslatorText>
                </label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-3 border-b border-[#E8E8E8] focus:outline-none focus:border-[#0C0D0E]"
                  placeholder={t("Write your messages.")}
                  required
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#0C0D0E] text-white py-3 px-8 rounded-3xl hover:bg-gray-400 transition-colors"
                >
                  <TranslatorText>Send Message</TranslatorText>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Footer Section */}
      <FooterPage />
    </>
  );
}

export default Contact;