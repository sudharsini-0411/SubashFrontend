import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { api } from '../api';

const AdminPage = ({ theme }) => {
  const [plans, setPlans] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState('JIO');
  const [isAddingPlan, setIsAddingPlan] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [newPlan, setNewPlan] = useState({
    price: 0,
    validity: '',
    data: '',
    calls: '',
    sms: '',
    description: '',
    category: 'POPULAR'
  });

  const fetchPlans = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api.getAllPlans();
      setPlans(data);
    } catch (err) {
      console.error('Failed to fetch plans', err);
      setError('Failed to fetch plans');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleAddPlan = async () => {
    if (!newPlan.price || !newPlan.validity || !newPlan.data) return;
    try {
      await api.createPlan({ ...newPlan, operator: selectedProvider });
      setIsAddingPlan(false);
      setNewPlan({ price: 0, validity: '', data: '', calls: '', sms: '', description: '', category: 'POPULAR' });
      fetchPlans();
    } catch (err) {
      console.error('Create plan failed', err);
      setError('Create plan failed');
    }
  };

  const handleDeletePlan = async (planId) => {
    try {
      await api.deletePlan(planId);
      fetchPlans();
    } catch (err) {
      console.error('Delete plan failed', err);
      setError('Delete plan failed');
    }
  };

  const handleEditPlan = async (planId, updatedPlan) => {
    try {
      await api.updatePlan(planId, { ...updatedPlan, operator: selectedProvider });
      setEditingPlan(null);
      fetchPlans();
    } catch (err) {
      console.error('Update plan failed', err);
      setError('Update plan failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-6">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Admin <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.gradient}`}>Panel</span>
          </h1>
          <p className="text-gray-500 text-lg">Manage recharge plans</p>
        </motion.div>

        <div className="flex justify-center gap-2 mb-8">
          {(['JIO', 'AIRTEL', 'VI', 'BSNL']).map(provider => (
            <button
              key={provider}
              onClick={() => setSelectedProvider(provider)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                selectedProvider === provider
                  ? `bg-gradient-to-r ${theme.gradient} text-white shadow-md`
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {provider}
            </button>
          ))}
        </div>

        <div className="flex justify-end mb-6">
          <button
            onClick={() => setIsAddingPlan(true)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${theme.gradient} hover:opacity-90`}
          >
            <Plus size={20} />
            Add Plan
          </button>
        </div>

        {isAddingPlan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm border mb-6"
          >
            <h3 className="text-xl font-bold mb-4">Add New Plan</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input
                type="number"
                placeholder="Price"
                value={newPlan.price || ''}
                onChange={(e) => setNewPlan({...newPlan, price: Number(e.target.value)})}
                className="p-3 border rounded-xl"
              />
              <input
                type="text"
                placeholder="Validity (e.g., 28 Days)"
                value={newPlan.validity}
                onChange={(e) => setNewPlan({...newPlan, validity: e.target.value})}
                className="p-3 border rounded-xl"
              />
              <input
                type="text"
                placeholder="Data (e.g., 1.5 GB/Day)"
                value={newPlan.data}
                onChange={(e) => setNewPlan({...newPlan, data: e.target.value})}
                className="p-3 border rounded-xl"
              />
              <input
                type="text"
                placeholder="Calls"
                value={newPlan.calls}
                onChange={(e) => setNewPlan({...newPlan, calls: e.target.value})}
                className="p-3 border rounded-xl"
              />
              <select
                value={newPlan.category}
                onChange={(e) => setNewPlan({...newPlan, category: e.target.value})}
                className="p-3 border rounded-xl"
              >
                <option value="POPULAR">Popular</option>
                <option value="DATA_ONLY">Data Only</option>
                <option value="ANNUAL">Annual</option>
                <option value="TOP_UP">Top Up</option>
              </select>
              <input
                type="text"
                placeholder="Description"
                value={newPlan.description}
                onChange={(e) => setNewPlan({...newPlan, description: e.target.value})}
                className="p-3 border rounded-xl"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddPlan}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white bg-gradient-to-r ${theme.gradient}`}
              >
                <Save size={16} />
                Save
              </button>
              <button
                onClick={() => setIsAddingPlan(false)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 text-gray-700"
              >
                <X size={16} />
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {error && <div className="text-center text-red-500 mb-4">{error}</div>}
        {loading && <div className="text-center text-gray-500 mb-4">Loading plans...</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.filter(p => p.operator === selectedProvider).map((plan) => (
            <motion.div
              key={plan._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm border"
            >
              {editingPlan === plan._id ? (
                <EditPlanForm
                  plan={plan}
                  onSave={(updatedPlan) => handleEditPlan(plan._id, updatedPlan)}
                  onCancel={() => setEditingPlan(null)}
                  theme={theme}
                />
              ) : (
                <>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold">₹{plan.price}</h3>
                      <p className="text-sm text-gray-500">{plan.category}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingPlan(plan._id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeletePlan(plan._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-500">Validity:</span> {plan.validity}</p>
                    <p><span className="text-gray-500">Data:</span> {plan.data}</p>
                    <p><span className="text-gray-500">Calls:</span> {plan.calls}</p>
                    <p><span className="text-gray-500">Description:</span> {plan.description}</p>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const EditPlanForm = ({ plan, onSave, onCancel, theme }) => {
  const [editedPlan, setEditedPlan] = useState(plan);

  return (
    <div className="space-y-3">
      <input
        type="number"
        value={editedPlan.price}
        onChange={(e) => setEditedPlan({...editedPlan, price: Number(e.target.value)})}
        className="w-full p-2 border rounded-lg text-sm"
      />
      <input
        type="text"
        value={editedPlan.validity}
        onChange={(e) => setEditedPlan({...editedPlan, validity: e.target.value})}
        className="w-full p-2 border rounded-lg text-sm"
      />
      <input
        type="text"
        value={editedPlan.data}
        onChange={(e) => setEditedPlan({...editedPlan, data: e.target.value})}
        className="w-full p-2 border rounded-lg text-sm"
      />
      <div className="flex gap-2">
        <button
          onClick={() => onSave(editedPlan)}
          className={`flex items-center gap-1 px-3 py-1 rounded-lg text-white text-sm bg-gradient-to-r ${theme.gradient}`}
        >
          <Save size={14} />
          Save
        </button>
        <button
          onClick={onCancel}
          className="flex items-center gap-1 px-3 py-1 rounded-lg bg-gray-100 text-gray-700 text-sm"
        >
          <X size={14} />
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AdminPage;
