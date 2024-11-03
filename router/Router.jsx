import { useState } from "react";
import RegisterPage from "pages/RegisterPage";
import LoginPage from "pages/LoginPage";
import ProductsPage from "pages/ProductsPage";
import PageNotFound from "pages/404";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "router/ProtectedRoutes";

function Router() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route
            path="/register"
            element={
              <RegisterPage formData={formData} setFormData={setFormData} />
            }
          />
          <Route
            path="/login"
            element={
              <LoginPage formData={formData} setFormData={setFormData} />
            }
          />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/products" element={<ProductsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
