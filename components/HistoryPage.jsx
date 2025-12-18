import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Smartphone, Calendar } from 'lucide-react';
import { api } from '../api';

const HistoryPage = ({ theme, user }) => {
  const [history, setHistory] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    const fetchHistory = async () => {
      if (!user) {
        setHistory([]);
        setLoading(false);
        return;
      }
      
      try {
        const data = await api.getUserRecharges(user._id || user.id);
        const normalised = (data || []).map((item) => {
          const plan = item.planId || item.plan;
          return {
            id: item._id || item.id,
            provider: plan?.operator || item.operator || item.provider || "N/A",
            mobileNumber: item.mobileNumber,
            planDetails: item.planDetails || {
              data: plan?.data || "N/A",
              validity: plan?.validity || "N/A",
              calls: plan?.calls || "N/A"
            },
            amount: item.planAmount ?? plan?.price ?? item.amount ?? 0,
            status: item.status || "SUCCESS",
            referenceId: item.referenceId || item._id || "N/A",
            date: item.createdAt || item.date || new Date().toISOString()
          };
        });
        setHistory(normalised);
      } catch (error) {
        console.error('Failed to fetch history:', error);
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHistory();
  }, [user]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'SUCCESS': return 'text-green-600 bg-green-50';
      case 'PENDING': return 'text-yellow-600 bg-yellow-50';
      case 'FAILED': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'SUCCESS': return <CheckCircle size={16} />;
      case 'PENDING': return <Clock size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-6">
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Recharge <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.gradient}`}>History</span>
          </h1>
          <p className="text-gray-500 text-lg">Track all your recharge transactions</p>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading history...</p>
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
              <Smartphone size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Recharge History</h3>
            <p className="text-gray-500">Your recharge transactions will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-r ${theme.gradient}`}>
                        {item.provider?.[0] || "R"}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{item.provider}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Smartphone size={14} />
                          <span>+91 {item.mobileNumber}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                      <div>
                        <span className="text-gray-500">Data:</span>
                        <span className="ml-1 font-medium">{item.planDetails.data}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Validity:</span>
                        <span className="ml-1 font-medium">{item.planDetails.validity}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Calls:</span>
                        <span className="ml-1 font-medium">{item.planDetails.calls}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end gap-2">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">₹{item.amount}</div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar size={14} />
                        <span>{formatDate(item.date)}</span>
                      </div>
                    </div>

                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                      {getStatusIcon(item.status)}
                      {item.status}
                    </div>

                    <div className="text-xs text-gray-400">
                      Ref: {item.referenceId}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
