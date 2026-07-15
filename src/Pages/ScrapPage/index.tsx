import React, { useEffect, useState } from "react";
import Layout from "../../components/navigation/Layout";
import { getScrapList, deleteScrapById, addScrap } from "../../backend/scrap";
import { Scrap } from "../../store/type";
import useAnimation from "../../hooks/useAnimation";

const ScrapPage: React.FC = () => {
  const [scrapList, setScrapList] = useState<Scrap[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newScrap, setNewScrap] = useState({ battery_name: "", amphere_size: "", exchange_value: 0 });
  const { snackbarAnimation } = useAnimation();

  const fetchScrap = async () => {
    try {
      setIsLoading(true);
      const data = await getScrapList();
      setScrapList(data);
    } catch (err) {
      console.error(err);
      snackbarAnimation("Failed to fetch scrap inventory", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchScrap();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this scrap item?")) return;
    try {
      await deleteScrapById(id);
      snackbarAnimation("Scrap item deleted", "success");
      fetchScrap();
    } catch (err) {
      console.error(err);
      snackbarAnimation("Failed to delete scrap item", "error");
    }
  };

  const handleAddScrap = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addScrap({ ...newScrap, quantity: 1 });
      snackbarAnimation("Scrap item added manually", "success");
      setShowAddModal(false);
      setNewScrap({ battery_name: "", amphere_size: "", exchange_value: 0 });
      fetchScrap();
    } catch (err) {
      console.error(err);
      snackbarAnimation("Failed to add scrap item", "error");
    }
  };

  const totalScrapValue = scrapList.reduce((acc, curr) => acc + (curr.exchange_value || 0), 0);

  return (
    <Layout>
      <div className="p-4 bg-white rounded shadow min-h-[80vh]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Scrap Inventory</h1>
          <div className="flex space-x-4">
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold transition-colors"
            >
              + Add Scrap
            </button>
            <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg font-bold border border-red-200 flex items-center">
              Total Scrap Value: ₹{totalScrapValue}
            </div>
          </div>
        </div>

        {isLoading ? (
          <p>Loading scrap inventory...</p>
        ) : scrapList.length === 0 ? (
          <p className="text-gray-500">No scrap batteries currently in inventory.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Battery Name</th>
                  <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Ampere Size</th>
                  <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Exchange Value</th>
                  <th className="py-2 px-4 border-b text-center text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {scrapList.map((scrap) => (
                  <tr key={scrap._id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b text-sm">
                      {new Date(scrap.createdAt || "").toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b text-sm font-medium">{scrap.battery_name}</td>
                    <td className="py-2 px-4 border-b text-sm">{scrap.amphere_size}</td>
                    <td className="py-2 px-4 border-b text-sm text-green-600 font-bold">₹{scrap.exchange_value}</td>
                    <td className="py-2 px-4 border-b text-center text-sm">
                      <button 
                        onClick={() => handleDelete(scrap._id!)}
                        className="text-red-500 hover:text-red-700 text-xs uppercase font-bold"
                      >
                        Sell / Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Add Scrap Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-96">
              <h2 className="text-xl font-bold mb-4">Add Scrap Battery Manually</h2>
              <form onSubmit={handleAddScrap}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Battery Name</label>
                  <input type="text" required value={newScrap.battery_name} onChange={e => setNewScrap({...newScrap, battery_name: e.target.value})} className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Amaron Inverter" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ampere Size</label>
                  <input type="text" required value={newScrap.amphere_size} onChange={e => setNewScrap({...newScrap, amphere_size: e.target.value})} className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. 150Ah" />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Exchange Value (₹)</label>
                  <input type="number" required value={newScrap.exchange_value === 0 ? '' : newScrap.exchange_value} onChange={e => setNewScrap({...newScrap, exchange_value: parseInt(e.target.value) || 0})} className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="0" />
                </div>
                <div className="flex justify-end space-x-3">
                  <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Scrap</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ScrapPage;
