import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Add from "./components/Add";
import Edit from "./components/Edit";
import View from "./components/View";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/add" element={<Add />}></Route>
        <Route path="/edit/:id" element={<Edit />}></Route>
        <Route path="/view/:id" element={<View />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
