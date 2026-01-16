
import React, { useState } from 'react';
import { X, Plus, Upload, Lock } from 'lucide-react';
import { Shop } from '../types';
import { ADMIN_PASSWORD } from '../constants';
import { fileToBase64 } from '../utils';

interface AdminPanelProps {
  onAddShop: (shop: Shop) => void;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onAddShop, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [newShop, setNewShop] = useState<Partial<Shop>>({
    name: '',
    address: '',
    phone: '',
    lat: -36.8485,
    lng: 174.7633,
    new_girls_last_15_days: false,
    pictures: []
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid admin password');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newShop.name && newShop.address && newShop.phone && newShop.lat && newShop.lng) {
      onAddShop(newShop as Shop);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const base64s = await Promise.all(Array.from(files).map(f => fileToBase64(f)));
      setNewShop(prev => ({ ...prev, pictures: [...(prev.pictures || []), ...base64s] }));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Lock className="w-5 h-5 text-rose-500" />
                Admin Login
              </h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Enter Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                  placeholder="Demo: admin"
                  autoFocus
                />
              </div>
              {error && <p className="text-rose-500 text-xs font-medium">{error}</p>}
              <button type="submit" className="w-full bg-rose-500 text-white font-bold py-3 rounded-xl shadow-lg active:scale-95 transition-transform">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300 max-h-[90vh] flex flex-col">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-900">Add New Shop</h2>
          <button onClick={onClose} className="p-2 -mr-2 text-gray-400">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto no-scrollbar">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Shop Name</label>
              <input
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-rose-500 outline-none transition-all"
                value={newShop.name}
                onChange={e => setNewShop({ ...newShop, name: e.target.value })}
                placeholder="e.g. 268 Neilson Street"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Full Address</label>
              <input
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-rose-500 outline-none transition-all"
                value={newShop.address}
                onChange={e => setNewShop({ ...newShop, address: e.target.value })}
                placeholder="For SMS template"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Latitude</label>
                <input
                  required
                  type="number"
                  step="any"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-rose-500 outline-none transition-all"
                  value={newShop.lat}
                  onChange={e => setNewShop({ ...newShop, lat: parseFloat(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Longitude</label>
                <input
                  required
                  type="number"
                  step="any"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-rose-500 outline-none transition-all"
                  value={newShop.lng}
                  onChange={e => setNewShop({ ...newShop, lng: parseFloat(e.target.value) })}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Phone Number</label>
              <input
                required
                type="tel"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-rose-500 outline-none transition-all"
                value={newShop.phone}
                onChange={e => setNewShop({ ...newShop, phone: e.target.value })}
                placeholder="Mobile number for SMS"
              />
            </div>

            <label className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5 accent-rose-500"
                checked={newShop.new_girls_last_15_days}
                onChange={e => setNewShop({ ...newShop, new_girls_last_15_days: e.target.checked })}
              />
              <span className="text-sm font-semibold text-gray-700">Display 🆕 New Badge</span>
            </label>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Photos</label>
              <div className="flex gap-2 flex-wrap mb-2">
                {newShop.pictures?.map((p, i) => (
                  <img key={i} src={p} className="w-16 h-16 object-cover rounded-lg border border-gray-100" />
                ))}
              </div>
              <label className="flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:text-rose-500 hover:border-rose-500 transition-all cursor-pointer">
                <Upload className="w-5 h-5" />
                <span className="text-sm font-medium">Upload Image</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-rose-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-rose-200 active:scale-95 transition-transform sticky bottom-0"
          >
            Add Shop to Database
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;
