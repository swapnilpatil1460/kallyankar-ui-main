import React from "react";

const TopProducts: React.FC<any> = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Top Products</h2>
      <ul>
        {data.map((product: any, index: number) => (
          <li key={index} className="flex justify-between py-2">
            <span>{product.name}</span>
            <span>{product.sales}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopProducts;
