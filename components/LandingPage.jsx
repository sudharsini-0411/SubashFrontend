import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, Smartphone, Shield, Zap, Clock, Star } from 'lucide-react';
import bgImage from '../assets/background-image.jpg';

const LandingPage = ({ theme, onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={bgImage}
            alt="Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-pink-300/20 to-pink-200/20"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 pt-20 pb-32">
          <div className="flex items-center justify-center mb-16">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-pink-400 to-pink-500 text-white shadow-lg mr-3">
              <Wifi size={32} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              Recharge<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-500">Hub</span>
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Fast & Secure <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-500">
                Mobile Recharges
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Instant activation, exclusive offers, and seamless payments for all major operators.
              Recharge your mobile with confidence and convenience.
            </p>
            <button
              onClick={onGetStarted}
              className="px-12 py-4 rounded-2xl font-bold text-lg text-white shadow-xl transition-transform hover:scale-105 active:scale-95 bg-gradient-to-r from-pink-400 to-pink-500"
            >
              Get Started
            </button>
          </motion.div>
        </div>
      </div>

      <div className="py-20 bg-white/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Why Choose RechargeHub?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center p-8 rounded-2xl bg-gray-50 hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-pink-400 to-pink-500 text-white mb-6">
                <Zap size={32} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Instant Recharge</h4>
              <p className="text-gray-600">Lightning-fast recharges with immediate activation across all networks</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center p-8 rounded-2xl bg-gray-50 hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-pink-400 to-pink-500 text-white mb-6">
                <Shield size={32} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">100% Secure</h4>
              <p className="text-gray-600">Bank-grade security with encrypted transactions and secure payment gateway</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center p-8 rounded-2xl bg-gray-50 hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-pink-400 to-pink-500 text-white mb-6">
                <Star size={32} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Best Offers</h4>
              <p className="text-gray-600">Exclusive cashback offers and rewards on every recharge transaction</p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="py-20 bg-gray-50/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-12">Supported Operators</h3>
          <div className="flex justify-center items-center gap-12 flex-wrap">
            {['JIO', 'AIRTEL', 'VI', 'BSNL'].map((operator) => (
              <div key={operator} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-pink-400 to-pink-500 text-white font-bold flex items-center justify-center">
                  {operator[0]}
                </div>
                <span className="text-xl font-semibold text-gray-700">{operator}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 bg-white/90 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Start Recharging?
          </h3>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of satisfied customers who trust RechargeHub for their mobile recharge needs
          </p>
          <button
            onClick={onGetStarted}
            className="px-12 py-4 rounded-2xl font-bold text-lg text-white shadow-xl transition-transform hover:scale-105 active:scale-95 bg-gradient-to-r from-pink-400 to-pink-500"
          >
            Start Recharging Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
