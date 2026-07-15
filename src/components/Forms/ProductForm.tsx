import { Product, Severity } from "../../store/type";
import Heading from "../UI/Heading";
import useHandlevalueChange from "../../hooks/useHandleValueChange";

import useAppContext from "../../hooks/useAppContext";

import AmphereSelect from "../UI/select/AmphereSelect";
import BatterySelect from "../UI/select/BatterySelect";
import GstSelect from "../UI/select/GstSelect";
import React, { useEffect, useRef, useState } from "react";
import ButtonSave from "../UI/Button/ButtonSave";
import { ProductSchema } from "../../zod";
import useAnimation from "../../hooks/useAnimation";
import { ERRORS } from "../../zod/zod_error";
import { updateProductById } from "../../backend/product";
import { postCheckStockAvailability } from "../../backend/stock";
const ProductForm: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [isStockNotPresent, setStockNotPresent] = useState(false);
  const [productInfo, setProductInfo] = useState({
    available: 0,
    product_code: "",
  });
  const [serial_numbers, setSerialNumbers] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { storedCartItems } = state;
  const { formProps } = state;
  const { data: _product, title, mode } = formProps;
  const { setValue, data } = useHandlevalueChange(_product as Product);
  const { snackbarAnimation, spinnerAnimationStart, spinnerAnimationStop } =
    useAnimation();

  const {
    _id,
    name,
    type,
    GST,
    price,
    vehicle_name,
    vehicle_number,
    quantity,
  } = data as Product;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isStockNotPresent) {
      snackbarAnimation(
        "No stock item present for " + name + " & " + type,
        "error"
      );
      return;
    }
    const productData = {
      ...data,
      serial_number: serial_numbers?.join(", ") ?? [],
      product_code: productInfo.product_code,
    };
    const validate = ProductSchema.safeParse(productData as Product);
    if (!validate.success) {
      const errors = validate.error.flatten();
      const { name, price, type, serial_number, GST } = errors.fieldErrors;
      name && snackbarAnimation(ERRORS.NAME, "error");
      price && snackbarAnimation(ERRORS.PRICE, "error");
      type && snackbarAnimation(ERRORS.TYPE, "error");
      serial_number && snackbarAnimation(ERRORS.SERIAL_NO, "error");
      GST && snackbarAnimation(ERRORS.GST, "error");
      return;
    }
    if (quantity != serial_numbers.length) {
      snackbarAnimation(ERRORS.SERIAL_NUMBER, "error");
      return;
    }

    console.log(productData);
    if (mode === "ADD_RECORD") {
      const customerId = window.location.href.split("/").pop() ?? null;
      dispatch({
        type: "ADD_STORED_CART_ITEMS",
        payload: [
          ...storedCartItems,
          { ...productData, customer: customerId } as Product,
        ],
      });
      dispatch({ type: "HIDE_SHOW_FORM", payload: false });
    } else {
      try {
        spinnerAnimationStart();
        await updateProductById(productData as Product, _id ?? "");
        spinnerAnimationStop();
        snackbarAnimation(ERRORS.SUCCESS, "success");
        dispatch({ type: "REFRESH_EFFECT", payload: !state.refreshEffect });
        dispatch({ type: "HIDE_SHOW_FORM", payload: false });
      } catch (err) {
        spinnerAnimationStop();
        snackbarAnimation(ERRORS.FAILURE, "error");
      }
    }
  };

  useEffect(() => {
    setSerialNumbers(
      _product && "serial_number" in _product && _product.serial_number
        ? _product.serial_number.split(",").map((serial) => serial.trim())
        : []
    );
  }, [_product]);

  useEffect(() => {
    (async () => {
      try {
        if (name.length > 1 && type.length > 1) {
          const response = await postCheckStockAvailability(name, type);
          const { available, product_code } = response;
          setProductInfo({ available: +available, product_code });
          let severtyType: Severity = "success";
          setStockNotPresent(false);
          if (+available === 0) {
            severtyType = "error";
            setStockNotPresent(true);
          } else if (+available < 10) {
            severtyType = "warning";
          }
          snackbarAnimation(`${available} Items are in stock`, severtyType);
        }
      } catch (err) {
        console.log(err);
        snackbarAnimation(
          "No stock item present for " + name + " & " + type,
          "error"
        );
        setStockNotPresent(true);
      }
    })();
  }, [name, type, setProductInfo]);

  useEffect(() => {
    if (quantity && quantity != 0) {
      const { available } = productInfo;
      if (quantity > available) {
        snackbarAnimation(`${available} Items are in stock`, "error");
        setStockNotPresent(true);
      } else {
        setStockNotPresent(false);
      }
    }
  }, [quantity, productInfo]);

  const handleSerialNumbers = () => {
    const value = inputRef.current?.value;
    if (value && inputRef.current?.value) {
      const itemIndex = serial_numbers.findIndex((serial) => serial === value);
      if (itemIndex !== -1) {
        snackbarAnimation("Serial number already added!-", "error");
        return;
      }
      setSerialNumbers((prev) => {
        if (prev) {
          return [...prev, value];
        }
        return [value];
      });
      inputRef.current.value = "";
    }
  };

  return (
    <>
      <Heading heading={title ?? "Add Item to cart"} />
      <div className="w-full  bg-white p-5 rounded-lg lg:rounded-l-none">
        <form
          className="px-8 pt-6 pb-4 bg-white rounded"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 md:flex md:justify-between">
            <AmphereSelect setValue={setValue} value={type} />
            <BatterySelect value={name} setValue={setValue} />
          </div>
          <div className="mb-4 md:flex md:justify-between">
            <div className="mb-4 md:mr-2 md:mb-0 md:flex-grow">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="serial_number"
              >
                Qty
              </label>
              <input
                className="w-full px-3 py-2 mb-3 text-sm leading-tight border-theme-c3 rounded-lg bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-theme-c1 focus:border-theme-c1"
                id="quantity"
                type="number"
                placeholder="Quantity"
                onChange={setValue}
                value={quantity}
                name="quantity"
              />
            </div>
            <div className="mb-4 md:mr-2 md:mb-0 md:flex-grow">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="serial_number"
              >
                Serial Number
              </label>
              <div className="flex">
                <input
                  className="w-full px-3 py-2 mb-3 text-sm leading-tight border-theme-c3 rounded-lg bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-theme-c1 focus:border-theme-c1"
                  id="serial_number"
                  type="text"
                  placeholder="Serial Number"
                  ref={inputRef}
                  name="serial_number"
                  disabled={quantity == serial_numbers?.length}
                />
                <div className="-ml-10 -mt-3 flex justify-center items-center md:flex-grow">
                  <button
                    disabled={quantity == serial_numbers?.length}
                    type="button"
                    onClick={handleSerialNumbers}
                    className="bg-slate-500 hover:bg-slate-600 text-gray-700 font-bold py-2 px-4 rounded-r-md shadow-lg transition-all animate-fadeInUp text-sm"
                  >
                    +{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4 md:flex md:justify-between">
            <GstSelect setValue={setValue} value={GST} />
            <div className="mb-4 md:mr-2 md:mb-0 md:flex-grow">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="v_number"
              >
                Price
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight border-theme-c3 rounded-lg bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-theme-c1 focus:border-theme-c1"
                id="v_number"
                type="number"
                placeholder="Price"
                name="price"
                onChange={setValue}
                value={price}
              />
            </div>
          </div>

          <div className="mb-4 md:flex md:justify-between">
            <div className="mb-4 md:mr-2 md:mb-0 md:flex-grow">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="vehicle_name"
              >
                Vehicle Name
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight border-theme-c3 rounded-lg bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-theme-c1 focus:border-theme-c1"
                id="vehicle_name"
                type="text"
                name="vehicle_name"
                placeholder="Vehicle Name"
                onChange={setValue}
                value={vehicle_name}
              />
            </div>
            <div className="mb-4 md:mr-2 md:mb-0 md:flex-grow">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="v_number"
              >
                Vehicle Number
              </label>
              <input
                className="w-full px-3 py-2 text-sm leading-tight border-theme-c3 rounded-lg bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-theme-c1 focus:border-theme-c1"
                id="v_number"
                type="text"
                name="vehicle_number"
                placeholder="Vehicle Number"
                onChange={setValue}
                value={vehicle_number}
              />
            </div>
          </div>

          <ButtonSave type="submit" />
          <hr className="mb-6 border-t" />
        </form>
      </div>
    </>
  );
};

export default ProductForm;
