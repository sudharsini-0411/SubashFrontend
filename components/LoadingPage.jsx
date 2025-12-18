import React from 'react';
import { motion } from 'framer-motion';
import { Wifi } from 'lucide-react';

const LoadingPage = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center mb-8"
            >
                <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-400 to-pink-500 text-white shadow-lg mr-3">
                    <Wifi size={48} />
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                    Recharge<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-500">Hub</span>
                </h1>
            </motion.div>

            <motion.div
                initial={{ width: 0 }}
                animate={{ width: 200 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="h-2 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full"
            />

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 text-gray-500 font-medium"
            >
                Loading...
            </motion.p>
        </div>
    );
};

export default LoadingPage;
