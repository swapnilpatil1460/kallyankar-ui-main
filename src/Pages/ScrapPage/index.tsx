import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { getScrapList, deleteScrapById } from "../../backend/scrap";
import { Scrap } from "../../store/type";
import useAnimation from "../../hooks/useAnimation";

const ScrapPage: React.FC = () => {
  const [scrapList, setScrapList] = useState<Scrap[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

  const totalScrapValue = scrapList.reduce((acc, curr) => acc + (curr.exchange_value || 0), 0);

  return (
    <Layout>
      <div className="p-4 bg-white rounded shadow min-h-[80vh]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Scrap Inventory</h1>
          <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg font-bold border border-red-200">
            Total Scrap Value: ₹{totalScrapValue}
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
      </div>
    </Layout>
  );
};

export default ScrapPage;
