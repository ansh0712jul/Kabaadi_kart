import LandingPage from "@/pages/landingPage";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import HomePage from "@/pages/HomePage";
import ProfilePage from "@/pages/ProfilePage";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { UserProvider } from "@/contexts/UserContext";
import PickupRequestPage from "@/pages/PickupRequestPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/pickup-request" element={<PickupRequestPage />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;