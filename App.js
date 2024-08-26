// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './src/context/AuthContext';
import OktaProvider from './src/components/OktaProvider';
import { Footer, Blog, Possibility, Features, WhatGPT3, Header } from './src/containers';
import { CTA, Brand, Navbar, Translation, Translateapp, Gpt } from './src/components';
import Signin from './src/components/Signin';
import Signup from './src/components/Signup';
import Account from './src/components/Account;'
import ProtectedRoute from './src/components/ProtectedRoute';
import './src/App.css';

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
