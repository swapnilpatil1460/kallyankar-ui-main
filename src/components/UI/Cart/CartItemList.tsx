import useAppContext from "../../../hooks/useAppContext";
import React, { useCallback, useEffect } from "react";
import { Product } from "../../../store/type";

type CartListPs = {
  setTotal: React.Dispatch<
    React.SetStateAction<{
      total: number;
      gst: number;
    }>
  >;
  exchangeDiscount?: number;
};
const CartItemsList: React.FC<CartListPs> = ({ setTotal, exchangeDiscount = 0 }) => {
  const { state } = useAppContext();
  const { storedCartItems } = state;
  useEffect(() => {
    const { total, GST } = calculateGSTAndTotal();
    setTotal({ total, gst: +GST });
  }, []);

  const calculateNetAmountAndGST = useCallback((price: string, GST: string) => {
    const itemGST =
      Math.round(
        ((parseInt(price) / (1 + (parseInt(GST) * 2) / 100)) * parseInt(GST)) /
          100
      ) * 2;
    const itemPrice = parseInt(price) - itemGST;
    return { itemGST, itemPrice };
  }, []);

  const calculatePriceAndUnitPrice = useCallback(
    (price: string, quantity: number = 1, GST: string) => {
      const { itemGST, itemPrice } = calculateNetAmountAndGST(price, GST);

      return {
        unitPrice: itemPrice,
        itemGST,
        price: itemPrice * quantity,
      };
    },
    [calculateNetAmountAndGST]
  );
  const calculateGSTAndTotal = useCallback(() => {
    const section = { GST: 0, subTotal: 0, total: 0, gst: "" };
    for (const item of storedCartItems) {
      const { price: p, quantity, GST } = item;
      const { price, itemGST } = calculatePriceAndUnitPrice(p, quantity, GST);
      section.GST += itemGST * (item.quantity ?? 1);
      section.subTotal += price;
      section.gst = GST;
    }

    return {
      ...section,
      total: section.GST + section.subTotal,
    };
  }, []);

  return (
    <div className="w-full bg-white shadow-md rounded-md">
      <table className="min-w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-3">Item#</th>
            <th className="border border-gray-300 p-3">Company</th>
            <th className="border border-gray-300 p-3">Model</th>
            <th className="border border-gray-300 p-3">Qty</th>
            <th className="border border-gray-300 p-3">Serial No</th>
            <th className="border border-gray-300 p-3">Unit Price</th>
            <th className="border border-gray-300 p-3">Price</th>
          </tr>
        </thead>
        <tbody>
          {storedCartItems.length > 0 &&
            storedCartItems.map((item: Product, index: number) => (
              <tr
                key={index}
                className="bg-white border-b text-sm dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="border border-gray-300 p-3">{index + 1}</td>
                <td className="border border-gray-300 p-3">{item.name}</td>
                <td className="border border-gray-300 p-3">
                  {item.product_code}
                </td>
                <td className="border border-gray-300 p-3">{item.quantity}</td>
                <td className="border border-gray-300 p-3">
                  {item.serial_number}
                </td>
                <td className="border border-gray-300 p-3">
                  {
                    calculatePriceAndUnitPrice(
                      item.price,
                      item.quantity,
                      item.GST
                    ).unitPrice
                  }
                </td>
                <td className="border border-gray-300 p-3">
                  {
                    calculatePriceAndUnitPrice(
                      item.price,
                      item.quantity,
                      item.GST
                    ).price
                  }
                </td>
              </tr>
            ))}
          {/* Totals Section */}
          <tr>
            <td
              className="border border-gray-300 p-3 text-left"
              align="right"
              colSpan={5}
            >
              Invoice Subtotal:
            </td>
            <td colSpan={5} className="border border-gray-300 p-3 ">
              {calculateGSTAndTotal().subTotal}
            </td>
          </tr>
          <tr>
            <td
              className="border border-gray-300 p-3 text-left"
              align="right"
              colSpan={5}
            >
              {`CGST(${calculateGSTAndTotal().gst}%)`}:
            </td>
            <td colSpan={5} className="border border-gray-300 p-3 ">
              {calculateGSTAndTotal().GST / 2}
            </td>
          </tr>
          <tr>
            <td
              className="border border-gray-300 p-3 text-left"
              align="right"
              colSpan={5}
            >
              {`SGST(${calculateGSTAndTotal().gst}%)`}:
            </td>
            <td colSpan={5} className="border border-gray-300 p-3 ">
              {calculateGSTAndTotal().GST / 2}
            </td>
          </tr>
          {exchangeDiscount > 0 && (
            <tr className="text-red-600">
              <td
                className="border border-gray-300 p-3 text-left"
                align="right"
                colSpan={5}
              >
                Less: Old Battery Exchange Discount:
              </td>
              <td colSpan={5} className="border border-gray-300 p-3 ">
                - {exchangeDiscount}
              </td>
            </tr>
          )}
          <tr className="font-bold">
            <td
              className="border border-gray-300 p-3 text-left"
              align="right"
              colSpan={5}
            >
              GRAND TOTAL:
            </td>
            <td colSpan={5} className="border border-gray-300 p-3 ">
              {calculateGSTAndTotal().total - exchangeDiscount}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CartItemsList;
