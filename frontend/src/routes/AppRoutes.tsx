
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import HomePage from "@/pages/HomePage";
import ProfilePage from "@/pages/ProfilePage";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { UserProvider } from "@/contexts/UserContext";
import PickupRequestPage from "@/pages/PickupRequestPage";
import AboutPage from "@/pages/AboutPage";
import PriceCalculator from "@/pages/PriceCalculator";
import CollectorDashboard from "@/pages/Collector";
import CollectorSignUp from "@/pages/CollectorSignUp";
import CollectorSignIn from "@/pages/CollectorSignIn";


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/" element={<AboutPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/pickup-request" element={<PickupRequestPage />} />
          <Route path="/pricing" element={<PriceCalculator/>} />
          <Route path="about" element={ <AboutPage/> }/>
          <Route path="/collector-dashboard" element={ <CollectorDashboard/> }/>
          <Route path = "/collector/sign-up" element={ <CollectorSignUp/>}/>
          <Route path = "/collector/sign-in" element={ <CollectorSignIn/>}/>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;