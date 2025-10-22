import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Providers from "./providers";
import Auth from "./auth";
import "./css/style.css";
import "./charts/ChartjsConfig";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/auth/signin/index";
import SignUp from "./pages/auth/signup/index";
import Users from "./pages/users/index";
import { Toaster } from "react-hot-toast";
import Tags from "./pages/tags";
import Posts from "./pages/posts";
import PostInfo from "./pages/posts/info/index";
import AddPost from "./pages/posts/add";
import Blogs from "./pages/blogs";
import AddBlog from "./pages/blogs/add";
import Galleries from "./pages/galleries";
import Units from "./pages/units";
import Categories from "./pages/categories";
import Brands from "./pages/brands";
import AddBrand from "./pages/brands/add";
import Icons from "./pages/icons";
import Insurancies from "./pages/insurancies";
import AddInsurancies from "./pages/insurancies/add";
import InsuranceCompanies from "./pages/insuranceCompanies";
import AddInsuranceCompany from "./pages/insuranceCompanies/add";
import Warranties from "./pages/warranties";
import AddWarranty from "./pages/warranties/add";
import WarrantyCompanies from "./pages/warrantyCompanies";
import AddWarrantyCompany from "./pages/warrantyCompanies/add";
import AddCategory from "./pages/categories/add";
import Products from "./pages/products";
import AddProduct from "./pages/products/add";
import UpdateProduct from "./pages/products/update/index";
import Colors from "./pages/colors";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
    document.querySelector("html").setAttribute("dir", "rtl");
  }, [location.pathname]);
  return (
    <Providers>
      <Toaster />
      <Auth>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/users" element={<Users />} />
          <Route exact path="/tags" element={<Tags />} />
          <Route exact path="/categories" element={<Categories />} />
          <Route exact path="/units" element={<Units />} />
          <Route exact path="/icons" element={<Icons />} />
          <Route exact path="/posts" element={<Posts />} />
          <Route exact path="/posts/add" element={<AddPost />} />
          <Route exact path="/blogs" element={<Blogs />} />
          <Route exact path="/blogs/add" element={<AddBlog />} />
          <Route exact path="/galleries" element={<Galleries />} />
          <Route exact path="/categories/add" element={<AddCategory />} />
          <Route exact path="/brands" element={<Brands />} />
          <Route exact path="/brands/add" element={<AddBrand />} />
          <Route exact path="/colors" element={<Colors />} />
          <Route exact path="/insurancies" element={<Insurancies />} />
          <Route exact path="/insurancies/add" element={<AddInsurancies />} />
          <Route exact path="/insuranceCompanies" element={<InsuranceCompanies />} />
          <Route exact path="/insuranceCompanies/add" element={<AddInsuranceCompany />} />
          <Route exact path="/warranties" element={<Warranties />} />
          <Route exact path="/warranties/add" element={<AddWarranty />} />
          <Route exact path="/warrantyCompanies" element={<WarrantyCompanies />} />
          <Route exact path="/warrantyCompanies/add" element={<AddWarrantyCompany />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/products/add" element={<AddProduct />} />
          <Route
            exact
            path="/products/update/:product_id"
            element={<UpdateProduct />}
          />
          <Route path="/posts/info/:id" element={<PostInfo />} />
        </Routes>
      </Auth>
    </Providers>
  );
}

export default App;
