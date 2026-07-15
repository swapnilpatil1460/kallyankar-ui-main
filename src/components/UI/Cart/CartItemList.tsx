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
};
const CartItemsList: React.FC<CartListPs> = ({ setTotal }) => {
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
  }, [storedCartItems, calculatePriceAndUnitPrice]);

  return (
    <div className="w-full bg-white px-4">
      <table className="w-full border-2 border-black text-sm text-left border-collapse">
        <thead>
          <tr className="border-b-2 border-black text-black bg-white">
            <th className="border-r border-black p-2 uppercase text-xs w-10 text-center">#</th>
            <th className="border-r border-black p-2 uppercase text-xs">Item Description</th>
            <th className="border-r border-black p-2 uppercase text-xs text-center w-12">Qty</th>
            <th className="border-r border-black p-2 uppercase text-xs w-32">Serial No</th>
            <th className="border-r border-black p-2 uppercase text-xs text-right w-24">Unit Price</th>
            <th className="p-2 uppercase text-xs text-right w-28">Total</th>
          </tr>
        </thead>
        <tbody>
          {storedCartItems.length > 0 &&
            storedCartItems.map((item: Product, index: number) => (
              <tr key={index} className="border-b border-black">
                <td className="border-r border-black p-2 text-center align-top">{index + 1}</td>
                <td className="border-r border-black p-2 align-top">
                  <div className="font-bold text-black">{item.name}</div>
                  <div className="text-xs text-black">Model: {item.product_code}</div>
                </td>
                <td className="border-r border-black p-2 text-center align-top">{item.quantity}</td>
                <td className="border-r border-black p-2 text-xs font-mono align-top max-w-[150px] break-words">
                  {item.serial_number}
                </td>
                <td className="border-r border-black p-2 text-right align-top">
                  {calculatePriceAndUnitPrice(item.price, item.quantity, item.GST).unitPrice}
                </td>
                <td className="p-2 text-right align-top">
                  {calculatePriceAndUnitPrice(item.price, item.quantity, item.GST).price}
                </td>
              </tr>
            ))}

          {/* Totals Section */}
          <tr className="border-b border-black">
            <td colSpan={4} className="border-r border-black p-2 border-b-0"></td>
            <td className="border-r border-black p-2 text-right text-xs uppercase font-semibold">Subtotal:</td>
            <td className="p-2 text-right font-medium">
              {calculateGSTAndTotal().subTotal}
            </td>
          </tr>
          <tr className="border-b border-black">
            <td colSpan={4} className="border-r border-black p-2 border-t-0 border-b-0"></td>
            <td className="border-r border-black p-2 text-right text-xs uppercase font-semibold">
              CGST ({calculateGSTAndTotal().gst}%):
            </td>
            <td className="p-2 text-right font-medium">
              {calculateGSTAndTotal().GST / 2}
            </td>
          </tr>
          <tr className="border-b-2 border-black">
            <td colSpan={4} className="border-r border-black p-2 border-t-0"></td>
            <td className="border-r border-black p-2 text-right text-xs uppercase font-semibold">
              SGST ({calculateGSTAndTotal().gst}%):
            </td>
            <td className="p-2 text-right font-medium">
              {calculateGSTAndTotal().GST / 2}
            </td>
          </tr>
          <tr className="bg-white">
            <td colSpan={4} className="border-r border-black p-2"></td>
            <td className="border-r border-black p-3 text-right uppercase font-bold text-base">
              Grand Total:
            </td>
            <td className="p-3 text-right font-bold text-base">
              ₹ {calculateGSTAndTotal().total}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CartItemsList;
