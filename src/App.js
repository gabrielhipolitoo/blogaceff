import React from "react";
import Nav from "./Componentes/Nav";
import Conteudos from "./Pages/Conteudos";
import Header from "./Componentes/Header";
import { HashRouter,Routes,Route } from "react-router-dom";
import Post from "./Pages/Post";
function App() {



  return (
    <main className="blog">
      <HashRouter>
        <Nav/>
      <Routes>
        <Route path="/" element={<Conteudos/>} />
        <Route path="/search" element={<Conteudos/>} />
        <Route path="/post/:slug" element={<Post/>}/>
      </Routes>
      </HashRouter>
    </main>
  );
}

export default App;
