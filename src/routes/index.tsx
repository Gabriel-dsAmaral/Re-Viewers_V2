import { Route, Routes } from "react-router-dom";
import { AboutUs } from "../pages/AboutUs";
import { AnimePage } from "../pages/Animes";
import { Developers } from "../pages/Devs";
import { Home } from "../pages/Home";
import { Search } from "../pages/Search";
import { User } from "../pages/User";

export const Router = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/animepage/:id" element={<AnimePage />} />
      <Route path="/search/:id" element={<Search />} />
      <Route path="/user" element={<User />} />
      <Route path="/aboutUs" element={<AboutUs />} />
      <Route path="/developers" element={<Developers />} />
      <Route path={"/*"} element={<Home />} />
    </Routes>
  );
};
