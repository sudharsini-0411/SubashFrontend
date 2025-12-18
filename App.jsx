import React, { useState, useEffect } from "react";
import { PROVIDERS } from "./constants";

import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
import HistoryPage from "./components/HistoryPage";
import AdminPage from "./components/AdminPage";
import RechargeModal from "./components/RechargeModal";
import AuthModal from "./components/AuthModal";
import LoadingPage from "./components/LoadingPage";

const App = () => {
  // UI & App State
  const [selectedProvider, setSelectedProvider] = useState("JIO");
  const [currentPage, setCurrentPage] = useState("home");
  const [showLanding, setShowLanding] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Recharge State
  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Auth State
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [pendingPlan, setPendingPlan] = useState(null);

  const currentTheme = PROVIDERS[selectedProvider];

  // Splash Screen Loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Recharge Click
  const handleRechargeClick = (plan) => {
    if (!user) {
      setPendingPlan(plan);
      setIsAuthModalOpen(true);
      return;
    }

    if (!mobileNumber || mobileNumber.length !== 10) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    setSelectedPlan(plan);
  };

  // Login Success
  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    setIsAuthModalOpen(false);
    setShowLanding(false);

    if (pendingPlan) {
      setSelectedPlan(pendingPlan);
      setPendingPlan(null);
    }
  };

  // Logout
  const handleLogout = () => {
    setUser(null);
    setShowLanding(true);
    setCurrentPage("home");
  };

  // Loading Screen
  if (isLoading) {
    return <LoadingPage />;
  }

  // Landing Page
  if (showLanding && !user) {
    return (
      <>
        <LandingPage
          theme={currentTheme}
          onGetStarted={() => setShowLanding(false)}
        />

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onLogin={handleLoginSuccess}
          theme={currentTheme}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-gray-50 transition-colors duration-500">
      {/* Navbar Section */}
      <div className="relative pt-6 px-4 bg-white">
        <div className="absolute inset-0 z-0 opacity-10">
          <div
            className={`absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-br ${currentTheme.gradient} blur-3xl`}
          />
          <div
            className={`absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-bl ${currentTheme.gradient} blur-3xl`}
          />
        </div>

        <Navbar
          user={user}
          theme={currentTheme}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onAuthClick={() => setIsAuthModalOpen(true)}
          onLogout={handleLogout}
        />
      </div>

      {/* Pages */}
      {currentPage === "home" && (
        <HomePage
          selectedProvider={selectedProvider}
          onProviderSelect={setSelectedProvider}
          mobileNumber={mobileNumber}
          onMobileNumberChange={setMobileNumber}
          onRechargeClick={handleRechargeClick}
          theme={currentTheme}
          user={user}
        />
      )}

      {currentPage === "history" && (
        <HistoryPage theme={currentTheme} user={user} />
      )}

      {currentPage === "admin" && user?.isAdmin && (
        <AdminPage theme={currentTheme} />
      )}

      {/* Footer */}
      <footer className="mt-20 py-8 text-center text-gray-400 text-sm border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <p>© 2024 RechargeHub. All rights reserved.</p>
        <p className="mt-2">Supported Operators: Jio, Airtel, Vi, BSNL</p>
      </footer>

      {/* Modals */}
      <RechargeModal
        plan={selectedPlan}
        theme={currentTheme}
        onClose={() => setSelectedPlan(null)}
        mobileNumber={mobileNumber}
        user={user}
        selectedProvider={selectedProvider}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLoginSuccess}
        theme={currentTheme}
      />
    </div>
  );
};

export default App;
