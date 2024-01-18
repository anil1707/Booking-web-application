import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./pages/Layout";
import { UserContextProvider } from "./UserContext";
import Account from "./pages/account/Account";
import PlaceForm from "./pages/account/PlaceForm";
import Profile from "./pages/account/Profile";
import Booking from "./pages/account/Booking";
import Accommodation from "./pages/account/Accommodation";
import SinglePlacePage from "./pages/SinglePlacePage";
import SingleBookingPage from "./pages/account/SingleBookingPage";
const App = () => {
  return (
    <UserContextProvider>
      <Layout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/accomodation" element={<Accommodation />} />
        <Route path="/account/profile" element={<Profile />} />
        <Route path="/account/booking" element={<Booking />} />
        <Route path="/account/booking/:id" element={<SingleBookingPage />} />
        <Route path="/account/accomodation/:id" element={<PlaceForm />} />
        <Route path="/place/:id" element={<SinglePlacePage />} />
      </Routes>
    </UserContextProvider>
  );
};
export default App;
