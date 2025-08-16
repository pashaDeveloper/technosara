import { useGetUnitsQuery } from "@/services/unit/unitApi";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import Plus from "@/components/icons/Plus";
import UnitPrice from "./UnitPrice";
import { useFieldArray } from "react-hook-form";
import NavigationButton from "@/components/shared/button/NavigationButton";

// Mock hooks for other reference data (replace with actual hooks or API calls)
const useGetDigiplusQuery = () => ({
  isLoading: false,
  data: { data: [{ _id: "dp1", name: "DigiPlus Plan 1" }] },
  error: null,
});
const useGetWarrantyQuery = () => ({
  isLoading: false,
  data: { data: [{ _id: "w1", name: "1 Year Warranty" }] },
  error: null,
});
const useGetColorQuery = () => ({
  isLoading: false,
  data: { data: [{ _id: "c1", name: "Red" }] },
  error: null,
});
const useGetSellerQuery = () => ({
  isLoading: false,
  data: { data: [{ _id: "s1", name: "Seller A" }] },
  error: null,
});
const useGetInsuranceQuery = () => ({
  isLoading: false,
  data: { data: [{ _id: "i1", name: "Insurance Plan 1" }] },
  error: null,
});
const useGetShipmentMethodQuery = () => ({
  isLoading: false,
  data: { data: [{ _id: "sm1", name: "Express Shipping" }] },
  error: null,
});
const useGetCreatorQuery = () => ({
  isLoading: false,
  data: { data: [{ _id: "a1", name: "Admin 1" }] },
  error: null,
});

const Campaign = ({ register, errors, watch, control, prevStep, nextStep }) => {
  const {
    isLoading: fetchingUnits,
    data: fetchUnitsData,
    error: fetchUnitsError,
  } = useGetUnitsQuery();
  const { data: techplusData } = useGetDigiplusQuery();
  const { data: warrantyData } = useGetWarrantyQuery();
  const { data: colorData } = useGetColorQuery();
  const { data: sellerData } = useGetSellerQuery();
  const { data: insuranceData } = useGetInsuranceQuery();
  const { data: shipmentMethodData } = useGetShipmentMethodQuery();
  const { data: creatorData } = useGetCreatorQuery();

  const {
    fields: variations,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "variations",
  });

  const units = useMemo(() => fetchUnitsData?.data || [], [fetchUnitsData]);
  const techplusOptions = useMemo(() => techplusData?.data || [], [techplusData]);
  const warrantyOptions = useMemo(() => warrantyData?.data || [], [warrantyData]);
  const colorOptions = useMemo(() => colorData?.data || [], [colorData]);
  const sellerOptions = useMemo(() => sellerData?.data || [], [sellerData]);
  const insuranceOptions = useMemo(() => insuranceData?.data || [], [insuranceData]);
  const shipmentMethodOptions = useMemo(() => shipmentMethodData?.data || [], [shipmentMethodData]);
  const creatorOptions = useMemo(() => creatorData?.data || [], [creatorData]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    if (fetchingUnits) {
      toast.loading("در حال دریافت واحد ...", { id: "fetchUnits" });
    }
    if (fetchUnitsData) {
      toast.success(fetchUnitsData?.description, { id: "fetchUnits" });
    }
    if (fetchUnitsError) {
      toast.error(fetchUnitsError?.data?.description, { id: "fetchUnits" });
    }
  }, [fetchingUnits, fetchUnitsData, fetchUnitsError]);

  const campaignState = watch("campaignState");

  const openModal = (index = null) => {
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingIndex(null);
  };

  const handleAddVariation = () => {
    append({
      unit: "",
      price: "",
      stock: 0,
      lowStockThreshold: 10,
      lead_time: 0,
      rank: 0,
      rate: 0,
      status: "",
      properties: {
        is_fast_shipping: false,
        is_ship_by_seller: false,
        is_multi_warehouse: false,
        has_similar_variants: false,
        is_rural: false,
        in_techkala_warehouse: false,
      },
      techplus: "",
      warranty: "",
      color: "",
      seller: "",
      techclub: { point: 0 },
      insurance: "",
      shipment_methods: "",
      has_importer_price: false,
      manufacture_price_not_exist: false,
      has_best_price_in_last_month: false,
      variant_badges: [],
      creator: "",
    });
    openModal(variations.length);
  };

  return (
    <>
      <div className="w-full flex flex-col gap-y-4">
        {/* Campaign Section */}
        <label
          htmlFor="campaign"
          className="w-full flex p-4 rounded flex-col border gap-y-1"
        >
          <span className="text-sm">کمپین فروش*</span>
          <div className="flex flex-row gap-x-4">
            <input
              type="text"
              name="campaignTitle"
              id="campaignTitle"
              {...register("campaignTitle", {
                required: "وارد کردن عنوان کمپین الزامی است",
                minLength: {
                  value: 3,
                  message: "عنوان کمپین باید حداقل ۳ حرف داشته باشد",
                },
                maxLength: {
                  value: 30,
                  message: "عنوان کمپین نباید بیشتر از ۳۰ حرف باشد",
                },
              })}
              className="w-full rounded border px-2 py-1"
              placeholder="عنوان کمپین فروش را وارد کنید"
              required
            />
            <select
              name="campaignState"
              id="campaignState"
              {...register("campaignState", {
                required: "وارد کردن وضعیت کمپین الزامی است",
                minLength: {
                  value: 3,
                  message: "وضعیت کمپین باید حداقل ۳ حرف داشته باشد",
                },
                maxLength: {
                  value: 30,
                  message: "وضعیت کمپین نباید بیشتر از ۳۰ حرف باشد",
                },
              })}
              className="w-fit rounded border px-2 py-1"
              defaultValue="choose-state"
              required
            >
              <option value="choose-state" disabled>
                انتخاب وضعیت کمپین
              </option>
              <option value="new-arrival">جدید</option>
              <option value="discount">تخفیف‌دار</option>
              <option value="sold-out">تمام‌شده</option>
              <option value="on-sale">در حال فروش</option>
            </select>
          </div>
          {errors.campaignTitle && (
            <span className="text-red-500 text-sm">{errors.campaignTitle.message}</span>
          )}
          {errors.campaignState && (
            <span className="text-red-500 text-sm">{errors.campaignState.message}</span>
          )}
          {campaignState === "discount" && (
            <input
              type="number"
              name="discountAmount"
              id="discountAmount"
              {...register("discountAmount", {
                required: "وارد کردن درصد تخفیف الزامی است",
                min: { value: 1, message: "درصد تخفیف باید حداقل ۱ باشد" },
                max: { value: 99, message: "درصد تخفیف نباید بیشتر از ۹۹ باشد" },
              })}
              className="w-full border p-2 rounded mt-2"
              placeholder="درصد تخفیف را وارد کنید"
            />
          )}
          {errors.discountAmount && (
            <span className="text-red-500 text-sm">{errors.discountAmount.message}</span>
          )}
        </label>

        {/* Variations Section */}
        <label
          htmlFor="variations"
          className="flex w-full flex-col gap-y-2 p-2 max-h-[300px] overflow-y-auto"
        >
          <span className="text-sm">درج قیمت بر اساس واحد*</span>
          <div className="flex flex-col gap-y-4">
            {variations.map((field, index) => (
              <div key={field.id} className="flex items-center gap-x-2">
                <span>واریانت {index + 1}</span>
                <button
                  type="button"
                  className="p-1 rounded bg-blue-500 text-white"
                  onClick={() => openModal(index)}
                >
                  ویرایش
                </button>
                <button
                  type="button"
                  className="p-1 rounded bg-red-500 text-white"
                  onClick={() => remove(index)}
                >
                  حذف
                </button>
              </div>
            ))}
            <button
              type="button"
              className="bg-green-100 dark:bg-blue-100 border border-green-900 dark:border-blue-900 text-green-900 dark:text-blue-900 py-1 rounded flex flex-row gap-x-1 items-center px-2 w-fit text-xs"
              onClick={handleAddVariation}
            >
              <Plus className="w-4 h-4" /> افزودن واحد و قیمت
            </button>
          </div>
        </label>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {editingIndex !== null ? "ویرایش واریانت" : "افزودن واریانت"}
              </h2>
              <button
                type="button"
                className="text-gray-500 hover:text-red-500"
                onClick={closeModal}
              >
                ✕
              </button>
            </div>
            <UnitPrice
              control={control}
              index={editingIndex !== null ? editingIndex : variations.length - 1}
              remove={remove}
              errors={errors}
              units={units}
              watch={watch}
              techplusOptions={techplusOptions}
              warrantyOptions={warrantyOptions}
              colorOptions={colorOptions}
              sellerOptions={sellerOptions}
              insuranceOptions={insuranceOptions}
              shipmentMethodOptions={shipmentMethodOptions}
              creatorOptions={creatorOptions}
            />
            <div className="flex justify-end mt-4">
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={closeModal}
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-12">
        <NavigationButton direction="next" onClick={nextStep} />
        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
    </>
  );
};

export default Campaign;