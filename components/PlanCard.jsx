import React from "react";
import { motion } from "framer-motion";
import { Smartphone, Calendar, Phone, Zap } from "lucide-react";

const PlanCard = ({ plan, theme, onRecharge }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden group"
    >
      {/* Top Banner for Best Sellers */}
      {plan.category === "POPULAR" && (
        <div
          className={`absolute top-0 right-0 px-3 py-1 bg-gradient-to-r ${theme.gradient} text-white text-xs font-bold rounded-bl-xl`}
        >
          BEST SELLER
        </div>
      )}

      <div>
        <div className="flex items-baseline mb-4">
          <span className="text-3xl font-bold text-gray-800">
            ₹{plan.price}
          </span>
          <span className="text-gray-400 ml-2 text-sm">/ pack</span>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center text-gray-600">
            <div className="p-2 rounded-lg bg-gray-50 mr-3 text-gray-500">
              <Calendar size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">
                Validity
              </p>
              <p className="font-semibold text-sm">
                {plan.validity}
              </p>
            </div>
          </div>

          <div className="flex items-center text-gray-600">
            <div className="p-2 rounded-lg bg-gray-50 mr-3 text-gray-500">
              <Zap size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">
                Data
              </p>
              <p className="font-semibold text-sm">{plan.data}</p>
            </div>
          </div>

          <div className="flex items-center text-gray-600">
            <div className="p-2 rounded-lg bg-gray-50 mr-3 text-gray-500">
              <Phone size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">
                Calls
              </p>
              <p className="font-semibold text-sm">{plan.calls}</p>
            </div>
          </div>
        </div>

        {plan.ottBenefits && plan.ottBenefits.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
              Benefits
            </p>
            <div className="flex flex-wrap gap-2">
              {plan.ottBenefits.map((benefit, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-indigo-50 text-indigo-600 text-xs rounded-md font-medium"
                >
                  {benefit}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => onRecharge(plan)}
        className={`w-full py-3 rounded-xl font-semibold text-white shadow-lg transition-transform active:scale-95 bg-gradient-to-r ${theme.gradient} ${theme.shadow} hover:opacity-90`}
      >
        Recharge Now
      </button>
    </motion.div>
  );
};

export default PlanCard;
