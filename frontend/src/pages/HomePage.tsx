
import Navigation from "../components/Navigation";
import { HomeSection } from "../components/HomeSection";
import  Profile  from "../components/Profile";
import { RightBar } from "../components/RightBar";
import { TweetDetails } from "../components/TweetDetails.js";
import { Routes, Route } from "react-router-dom";
export const HomePage = () => {
 
 return (
  <>
    <div className="w-full flex justify-center">
      <div className="w-full max-w-7xl flex">

        <div className="hidden lg:block w-1/3">
          <Navigation />
        </div>

        <div className="w-full md:w-3/5 border-gray-200 border-x p-12">
          <Routes>
            <Route path="/" element={<HomeSection />} />
            <Route path="/home" element={<HomeSection />} />
           <Route path="/tweet/:id" element={<TweetDetails />} />
            <Route path="/user/:userId" element={<Profile />} />
          </Routes>
        </div>

        <div className="hidden md:block w-1/3">
          <RightBar />
        </div>

      </div>
    </div>


  </>
);
};