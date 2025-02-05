
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import HomePage from "@/pages/HomePage";
import ProfilePage from "@/pages/ProfilePage";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { UserProvider } from "@/contexts/UserContext";
import PickupRequestPage from "@/pages/PickupRequestPage";
import AboutPage from "@/pages/AboutPage";
import PriceCalculator from "@/pages/PriceCalculator";
import CollectorDashboard from "@/pages/Collector";
import CollectorSignUp from "@/pages/CollectorSignUp";
import CollectorSignIn from "@/pages/CollectorSignIn";
import ContactPage from "@/pages/ContactPage";


const AppRoutes = () => {
  const auth = localStorage.getItem("accessToken");
  const auth1 = localStorage.getItem("accessTokenCollector");
  console.log(auth);
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/" element={<AboutPage />} />
          <Route path="/home" element={auth? <HomePage /> : <Navigate to = '/sign-in'/>} />
          <Route path="/profile" element={auth? <HomePage />:<ProfilePage />} />
          <Route path="/pickup-request" element={auth? <PickupRequestPage />:<Navigate to = '/sign-in'/>} />
          <Route path="/pricing" element={<PriceCalculator/>} />
          <Route path="about" element={ <AboutPage/> }/>
          <Route path="/collector-dashboard" element={auth1?<CollectorDashboard/>: <Navigate to = '/collector/sign-in'/> }/>
          <Route path = "/collector/sign-up" element={ <CollectorSignUp/>}/>
          <Route path = "/collector/sign-in" element={ <CollectorSignIn/>}/>
          <Route path = "/contact" element={ <ContactPage/>}/>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;