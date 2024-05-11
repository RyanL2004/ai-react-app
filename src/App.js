// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import OktaProvider from './components/OktaProvider';
import { Footer, Blog, Possibility, Features, WhatGPT3, Header } from './containers';
import { CTA, Brand, Navbar, Translation, Translateapp, Gpt } from './components';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Account from './components/Account';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const MainContent = () => (
  <>
    <Navbar />
    <Header />
    <Translation />
    <Brand />
    <WhatGPT3 />
    <Features />
    <Possibility />
    <CTA />
    <Blog />
    <Footer />
  </>
);

 const App = () => {
 return (
  <div className="App">
    <OktaProvider>
      <AuthContextProvider>
        <Routes>
          {/* Your routes go here */}
          <Route
            path="/"
            element={(
              <div>
                <MainContent />
              </div>
            )}
          />
          <Route path="/login" element={(<div className="gradient__bg"><Signin /></div>)} />
          <Route path="/signup" element={(<div className="gradient__bg"><Signup /></div>)} />
          <Route path="/translateapp" element={(<div className="gradient__bg"><Translateapp /></div>)} />
          <Route path="/gpt" element={(<div><Gpt /></div>)} />

          <Route
            path="/account"
            element={(<div className="gradient__bg">
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            </div>)}
          />
        </Routes>
      </AuthContextProvider>
    </OktaProvider>
  </div>
);
};

export default App;
