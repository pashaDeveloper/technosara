import React from "react";
import Dropdown from "@/components/shared/dropDown/Dropdown";
import { Controller, useFieldArray } from "react-hook-form";
import Trash from "@/components/icons/Trash";
import NumberToPersianWord from "number_to_persian_word";

const UnitPrice = ({
  control,
  index,
  remove,
  errors,
  watch,
  units = [],
  techplusOptions = [],
  warrantyOptions = [],
  colorOptions = [],
  sellerOptions = [],
  insuranceOptions = [],
  shipmentMethodOptions = [],
  creatorOptions = [],
}) => {
  const { fields: badges, append, remove: removeBadge } = useFieldArray({
    control,
    name: `variations.${index}.variant_badges`,
  });

  const campaignState = watch(`variations.${index}.campaignState`);
  const statusOptions = [
    { value: "marketable", label: "قابل فروش" },
    { value: "out_of_stock", label: "تمام شده" },
    { value: "inactive", label: "غیرفعال" },
    { value: "on_sale", label: "در حال فروش" },
    { value: "new_arrival", label: "جدید" },
    { value: "discount", label: "تخفیف‌دار" },
  ];

  return (
    <div className="flex flex-col gap-y-4 w-full border rounded p-4">
      <div className="grid items-center md:grid-cols-12 gap-x-2 gap-y-4">
        {/* Campaign Section */}
        <div className="col-span-12">
          <label className="w-full flex flex-col gap-y-1">
            <span className="text-sm">کمپین فروش*</span>
            <div className="flex flex-row gap-x-4">
              <Controller
                control={control}
                name={`variations.${index}.campaignTitle`}
                rules={{
                  required: "وارد کردن عنوان کمپین الزامی است",
                  minLength: {
                    value: 3,
                    message: "عنوان کمپین باید حداقل ۳ حرف داشته باشد",
                  },
                  maxLength: {
                    value: 30,
                    message: "عنوان کمپین نباید بیشتر از ۳۰ حرف باشد",
                  },
                }}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    className="w-full rounded border px-2 py-1"
                    placeholder="عنوان کمپین فروش را وارد کنید"
                  />
                )}
              />
              <Controller
                control={control}
                name={`variations.${index}.campaignState`}
                rules={{
                  required: "وارد کردن وضعیت کمپین الزامی است",
                  minLength: {
                    value: 3,
                    message: "وضعیت کمپین باید حداقل ۳ حرف داشته باشد",
                  },
                  maxLength: {
                    value: 30,
                    message: "وضعیت کمپین نباید بیشتر از ۳۰ حرف باشد",
                  },
                }}
                render={({ field }) => (
                  <Dropdown
                    items={[
                      { value: "جدید", label: "جدید" },
                      { value: "تخفیف‌دار", label: "تخفیف‌دار" },
                      { value: "تمام‌شده", label: "تمام‌شده" },
                      { value: "در-حال-فروش", label: "در حال فروش" },
                    ]}
                    placeholder="یک مورد انتخاب کنید"
                    className={"w-full h-12"}
                    returnType="id"
                  />
                )}
              />
            </div>
            {errors.variations?.[index]?.campaignTitle && (
              <span className="text-red-500 text-sm">
                {errors.variations[index].campaignTitle.message}
              </span>
            )}
            {errors.variations?.[index]?.campaignState && (
              <span className="text-red-500 text-sm">
                {errors.variations[index].campaignState.message}
              </span>
            )}
            {campaignState === "تخفیف‌دار" && (
              <Controller
                control={control}
                name={`variations.${index}.discountAmount`}
                rules={{
                  required: "وارد کردن درصد تخفیف الزامی است",
                  min: { value: 1, message: "درصد تخفیف باید حداقل ۱ باشد" },
                  max: { value: 99, message: "درصد تخفیف نباید بیشتر از ۹۹ باشد" },
                }}
                render={({ field: { onChange, value } }) => (
                  <input
                    type="number"
                    value={value || ""}
                    onChange={(e) => {
                      const rawValue = e.target.value;
                      if (!isNaN(rawValue) && rawValue !== "") {
                        onChange(Number(rawValue));
                      }
                    }}
                    className="w-full border p-2 rounded mt-2"
                    placeholder="درصد تخفیف را وارد کنید"
                  />
                )}
              />
            )}
            {errors.variations?.[index]?.discountAmount && (
              <span className="text-red-500 text-sm">
                {errors.variations[index].discountAmount.message}
              </span>
            )}
          </label>
        </div>

        {/* Price */}
        <div className="col-span-12 md:col-span-6 h-24">
          <span>قیمت واحد انتخابی</span>
          <Controller
            control={control}
            name={`variations.${index}.price`}
            rules={{
              required: "وارد کردن قیمت الزامی است",
              min: { value: 1, message: "قیمت باید بزرگتر از ۰ باشد" },
            }}
            render={({ field: { onChange, value } }) => (
              <input
                type="number"
                inputMode="numeric"
                value={value || ""}
                onChange={(e) => {
                  const rawValue = e.target.value;
                  if (!isNaN(rawValue) && rawValue !== "") {
                    onChange(Number(rawValue));
                  }
                }}
                className="flex-1 rounded border px-2 py-1 h-10 w-full text-left"
                placeholder="قیمت را وارد کنید..."
              />
            )}
          />
          <Controller
            control={control}
            name={`variations.${index}.price`}
            render={({ field: { value } }) => (
              <span className="text-green-600 text-sm">
                {"معادل: "}
                <span className="text-red-600">
                  {NumberToPersianWord.convert((value || 0))} تومان
                </span>
              </span>
            )}
          />
          {errors.variations?.[index]?.price && (
            <span className="text-red-500 text-sm">
              {errors.variations[index].price.message}
            </span>
          )}
        </div>

        {/* Stock */}
        <div className="col-span-12 md:col-span-6 h-24">
          <span>تعداد موجودی</span>
          <Controller
            control={control}
            name={`variations.${index}.stock`}
            rules={{
              required: "تعداد موجودی الزامی است",
              min: { value: 0, message: "موجودی نمی‌تواند منفی باشد" },
            }}
            render={({ field: { onChange, value } }) => (
              <input
                type="number"
                inputMode="numeric"
                value={value || ""}
                onChange={(e) => {
                  const rawValue = e.target.value;
                  if (!isNaN(rawValue) && rawValue !== "") {
                    onChange(Number(rawValue));
                  }
                }}
                className="flex-1 rounded border px-2 py-1 h-10 w-full text-left"
                placeholder="تعداد موجودی را وارد کنید..."
              />
            )}
          />
          {errors.variations?.[index]?.stock && (
            <span className="text-red-500 text-sm">
              {errors.variations[index].stock.message}
            </span>
          )}
        </div>

        {/* Low Stock Threshold */}
        <div className="col-span-12 md:col-span-6 h-24">
          <span>حد آستانه موجودی</span>
          <Controller
            control={control}
            name={`variations.${index}.lowStockThreshold`}
            rules={{
              required: "حد آستانه موجودی الزامی است",
              min: { value: 0, message: "حد آستانه نمی‌تواند منفی باشد" },
            }}
            render={({ field: { onChange, value } }) => (
              <input
                type="number"
                inputMode="numeric"
                value={value || ""}
                onChange={(e) => {
                  const rawValue = e.target.value;
                  if (!isNaN(rawValue) && rawValue !== "") {
                    onChange(Number(rawValue));
                  }
                }}
                className="flex-1 rounded border px-2 py-1 h-10 w-full text-left"
                placeholder="حد آستانه موجودی را وارد کنید..."
              />
            )}
          />
          {errors.variations?.[index]?.lowStockThreshold && (
            <span className="text-red-500 text-sm">
              {errors.variations[index].lowStockThreshold.message}
            </span>
          )}
        </div>

        {/* Status */}
        <div className="col-span-12 md:col-span-6 h-24">
          <span>وضعیت</span>
          <Controller
            control={control}
            name={`variations.${index}.status`}
            rules={{ required: "انتخاب وضعیت الزامی است" }}
            render={({ field }) => (
              <Dropdown
                items={[
                  { value: "قابل-فروش", label: "قابل فروش" },
                  { value: "تمام‌شده", label: "تمام شده" },
                  { value: "غیرفعال", label: "غیرفعال" },
                  { value: "در-حال-فروش", label: "در حال فروش" },
                  { value: "جدید", label: "جدید" },
                  { value: "تخفیف‌دار", label: "تخفیف‌دار" },
                ]}
                onChange={field.onChange}
                placeholder="وضعیت را انتخاب کنید..."
                className="w-full"
              />
            )}
          />
          {errors.variations?.[index]?.status && (
            <span className="text-red-500 text-sm">
              {errors.variations[index].status.message}
            </span>
          )}
        </div>

        {/* Lead Time */}
        <div className="col-span-12 md:col-span-6 h-24">
          <span>زمان تحویل (روز)</span>
          <Controller
            control={control}
            name={`variations.${index}.lead_time`}
            rules={{
              required: "زمان تحویل الزامی است",
              min: { value: 0, message: "زمان تحویل نمی‌تواند منفی باشد" },
            }}
            render={({ field: { onChange, value } }) => (
              <input
                type="number"
                inputMode="numeric"
                value={value || ""}
                onChange={(e) => {
                  const rawValue = e.target.value;
                  if (!isNaN(rawValue) && rawValue !== "") {
                    onChange(Number(rawValue));
                  }
                }}
                className="flex-1 rounded border px-2 py-1 h-10 w-full text-left"
                placeholder="زمان تحویل را وارد کنید..."
              />
            )}
          />
          {errors.variations?.[index]?.lead_time && (
            <span className="text-red-500 text-sm">
              {errors.variations[index].lead_time.message}
            </span>
          )}
        </div>

        {/* Rank */}
        <div className="col-span-12 md:col-span-6 h-24">
          <span>رتبه</span>
          <Controller
            control={control}
            name={`variations.${index}.rank`}
            rules={{
              required: "رتبه الزامی است",
              min: { value: 0, message: "رتبه نمی‌تواند منفی باشد" },
            }}
            render={({ field: { onChange, value } }) => (
              <input
                type="number"
                inputMode="numeric"
                value={value || ""}
                onChange={(e) => {
                  const rawValue = e.target.value;
                  if (!isNaN(rawValue) && rawValue !== "") {
                    onChange(Number(rawValue));
                  }
                }}
                className="flex-1 rounded border px-2 py-1 h-10 w-full text-left"
                placeholder="رتبه را وارد کنید..."
              />
            )}
          />
          {errors.variations?.[index]?.rank && (
            <span className="text-red-500 text-sm">
              {errors.variations[index].rank.message}
            </span>
          )}
        </div>

        {/* Rate */}
        <div className="col-span-12 md:col-span-6 h-24">
          <span>نرخ</span>
          <Controller
            control={control}
            name={`variations.${index}.rate`}
            rules={{
              required: "نرخ الزامی است",
              min: { value: 0, message: "نرخ نمی‌تواند منفی باشد" },
            }}
            render={({ field: { onChange, value } }) => (
              <input
                type="number"
                inputMode="numeric"
                value={value || ""}
                onChange={(e) => {
                  const rawValue = e.target.value;
                  if (!isNaN(rawValue) && rawValue !== "") {
                    onChange(Number(rawValue));
                  }
                }}
                className="flex-1 rounded border px-2 py-1 h-10 w-full text-left"
                placeholder="نرخ را وارد کنید..."
              />
            )}
          />
          {errors.variations?.[index]?.rate && (
            <span className="text-red-500 text-sm">
              {errors.variations[index].rate.message}
            </span>
          )}
        </div>

        {/* Properties */}
        <div className="col-span-12">
          <span>ویژگی‌ها</span>
          <div className="grid grid-cols-2 gap-2">
            {[
              "is_fast_shipping",
              "is_ship_by_seller",
              "is_multi_warehouse",
              "has_similar_variants",
              "is_rural",
              "in_techkala_warehouse",
            ].map((prop) => (
              <label key={prop} className="flex items-center gap-x-2">
                <Controller
                  control={control}
                  name={`variations.${index}.properties.${prop}`}
                  rules={{ required: `گزینه ${prop} الزامی است` }}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      checked={field.value || false}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  )}
                />
                <span>
                  {prop === "is_fast_shipping" && "ارسال سریع"}
                  {prop === "is_ship_by_seller" && "ارسال توسط فروشنده"}
                  {prop === "is_multi_warehouse" && "چند انباری"}
                  {prop === "has_similar_variants" && "دارای واریانت‌های مشابه"}
                  {prop === "is_rural" && "روستایی"}
                  {prop === "in_techkala_warehouse" && "در انبار تکنوکالا"}
                </span>
              </label>
            ))}
          </div>
          {errors.variations?.[index]?.properties &&
            Object.keys(errors.variations[index].properties).map((prop) => (
              <span key={prop} className="text-red-500 text-sm">
                {errors.variations[index].properties[prop].message}
              </span>
            ))}
        </div>

        {/* DigiPlus */}
        <div className="col-span-12 md:col-span-6 h-24">
          <span>دیجی‌پلاس</span>
          <Controller
            control={control}
            name={`variations.${index}.techplus`}
            rules={{ required: "انتخاب دیجی‌پلاس الزامی است" }}
            render={({ field }) => (
              <Dropdown
                options={techplusOptions.map((option) => ({
                  value: option._id,
                  label: option.name,
                }))}
                value={field.value}
                onChange={field.onChange}
                placeholder="دیجی‌پلاس را انتخاب کنید..."
                className="w-full"
              />
            )}
          />
          {errors.variations?.[index]?.techplus && (
            <span className="text-red-500 text-sm">
              {errors.variations[index].techplus.message}
            </span>
          )}
        </div>

        {/* Warranty */}
        <div className="col-span-12 md:col-span-6 h-24">
          <span>گارانتی</span>
          <Controller
            control={control}
            name={`variations.${index}.warranty`}
            rules={{ required: "انتخاب گارانتی الزامی است" }}
            render={({ field }) => (
              <Dropdown
                options={warrantyOptions.map((option) => ({
                  value: option._id,
                  label: option.name,
                }))}
                value={field.value}
                onChange={field.onChange}
                placeholder="گارانتی را انتخاب کنید..."
                className="w-full"
              />
            )}
          />
          {errors.variations?.[index]?.warranty && (
            <span className="text-red-500 text-sm">
              {errors.variations[index].warranty.message}
            </span>
          )}
        </div>

        {/* Color */}
        <div className="col-span-12 md:col-span-6 h-24">
          <span>رنگ</span>
          <Controller
            control={control}
            name={`variations.${index}.color`}
            rules={{ required: "انتخاب رنگ الزامی است" }}
            render={({ field }) => (
              <Dropdown
                options={colorOptions.map((option) => ({
                  value: option._id,
                  label: option.name,
                }))}
                value={field.value}
                onChange={field.onChange}
                placeholder="رنگ را انتخاب کنید..."
                className="w-full"
              />
            )}
          />
          {errors.variations?.[index]?.color && (
            <span className="text-red-500 text-sm">
              {errors.variations[index].color.message}
            </span>
          )}
        </div>

        {/* Seller */}
        <div className="col-span-12 md:col-span-6 h-24">
          <span>فروشنده</span>
          <Controller
            control={control}
            name={`variations.${index}.seller`}
            rules={{ required: "انتخاب فروشنده الزامی است" }}
            render={({ field }) => (
              <Dropdown
                options={sellerOptions.map((option) => ({
                  value: option._id,
                  label: option.name,
                }))}
                value={field.value}
                onChange={field.onChange}
                placeholder="فروشنده را انتخاب کنید..."
                className="w-full"
              />
            )}
          />
          {errors.variations?.[index]?.seller && (
            <span className="text-red-500 text-sm">
              {errors.variations[index].seller.message}
            </span>
          )}
        </div>

        {/* DigiClub Point */}
        <div className="col-span-12 md:col-span-6 h-24">
          <span>امتیاز دیجی‌کلاب</span>
          <Controller
            control={control}
            name={`variations.${index}.techclub.point`}
            rules={{
              required: "امتیاز دیجی‌کلاب الزامی است",
              min: { value: 0, message: "امتیاز نمی‌تواند منفی باشد" },
            }}
            render={({ field: { onChange, value } }) => (
              <input
                type="number"
                inputMode="numeric"
                value={value || ""}
                onChange={(e) => {
                  const rawValue = e.target.value;
                  if (!isNaN(rawValue) && rawValue !== "") {
                    onChange(Number(rawValue));
                  }
                }}
                className="flex-1 rounded border px-2 py-1 h-10 w-full text-left"
                placeholder="امتیاز دیجی‌کلاب را وارد کنید..."
              />
            )}
          />
          {errors.variations?.[index]?.techclub?.point && (
            <span className="text-red-500 text-sm">
              {errors.variations[index].techclub.point.message}
            </span>
          )}
        </div>

        {/* Insurance */}
        <div className="col-span-12 md:col-span-6 h-24">
          <span>بیمه</span>
          <Controller
            control={control}
            name={`variations.${index}.insurance`}
            rules={{ required: "انتخاب بیمه الزامی است" }}
            render={({ field }) => (
              <Dropdown
                options={insuranceOptions.map((option) => ({
                  value: option._id,
                  label: option.name,
                }))}
                value={field.value}
                onChange={field.onChange}
                placeholder="بیمه را انتخاب کنید..."
                className="w-full"
              />
            )}
          />
          {errors.variations?.[index]?.insurance && (
            <span className="text-red-500 text-sm">
              {errors.variations[index].insurance.message}
            </span>
          )}
        </div>

        {/* Shipment Methods */}
        <div className="col-span-12 md:col-span-6 h-24">
          <span>روش‌های ارسال</span>
          <Controller
            control={control}
            name={`variations.${index}.shipment_methods`}
            rules={{ required: "انتخاب روش ارسال الزامی است" }}
            render={({ field }) => (
              <Dropdown
                options={shipmentMethodOptions.map((option) => ({
                  value: option._id,
                  label: option.name,
                }))}
                value={field.value}
                onChange={field.onChange}
                placeholder="روش ارسال را انتخاب کنید..."
                className="w-full"
              />
            )}
          />
          {errors.variations?.[index]?.shipment_methods && (
            <span className="text-red-500 text-sm">
              {errors.variations[index].shipment_methods.message}
            </span>
          )}
        </div>

        {/* Creator */}
        <div className="col-span-12 md:col-span-6 h-24">
          <span>ایجادکننده</span>
          <Controller
            control={control}
            name={`variations.${index}.creator`}
            render={({ field }) => (
              <Dropdown
                options={creatorOptions.map((option) => ({
                  value: option._id,
                  label: option.name,
                }))}
                value={field.value}
                onChange={field.onChange}
                placeholder="ایجادکننده را انتخاب کنید..."
                className="w-full"
              />
            )}
          />
          {errors.variations?.[index]?.creator && (
            <span className="text-red-500 text-sm">
              {errors.variations[index].creator.message}
            </span>
          )}
        </div>

        {/* Boolean Fields */}
        {[
          "has_importer_price",
          "manufacture_price_not_exist",
          "has_best_price_in_last_month",
        ].map((field) => (
          <div key={field} className="col-span-12 md:col-span-4">
            <label className="flex items-center gap-x-2">
              <Controller
                control={control}
                name={`variations.${index}.${field}`}
                rules={{ required: `گزینه ${field} الزامی است` }}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    checked={field.value || false}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                )}
              />
              <span>
                {field === "has_importer_price" && "دارای قیمت واردکننده"}
                {field === "manufacture_price_not_exist" && "عدم وجود قیمت تولیدکننده"}
                {field === "has_best_price_in_last_month" && "بهترین قیمت در ماه گذشته"}
              </span>
            </label>
            {errors.variations?.[index]?.[field] && (
              <span className="text-red-500 text-sm">
                {errors.variations[index][field].message}
              </span>
            )}
          </div>
        ))}

        {/* Variant Badges */}
        <div className="col-span-12">
          <span>بج‌های واریانت</span>
          {badges.map((badge, badgeIndex) => (
            <div
              key={badge.id}
              className="flex flex-col gap-y-2 border rounded p-2 mt-2"
            >
              <div className="grid grid-cols-12 gap-x-2">
                <div className="col-span-12 md:col-span-3">
                  <span>شناسه</span>
                  <Controller
                    control={control}
                    name={`variations.${index}.variant_badges.${badgeIndex}.id`}
                    rules={{ required: "شناسه بج الزامی است" }}
                    render={({ field: { onChange, value } }) => (
                      <input
                        type="number"
                        value={value || ""}
                        onChange={(e) => {
                          const rawValue = e.target.value;
                          if (!isNaN(rawValue) && rawValue !== "") {
                            onChange(Number(rawValue));
                          }
                        }}
                        className="flex-1 rounded border px-2 py-1 h-10 w-full text-left"
                        placeholder="شناسه بج..."
                      />
                    )}
                  />
                </div>
                <div className="col-span-12 md:col-span-3">
                  <span>نوع</span>
                  <Controller
                    control={control}
                    name={`variations.${index}.variant_badges.${badgeIndex}.type`}
                    rules={{ required: "نوع بج الزامی است" }}
                    render={({ field }) => (
                      <input
                        type="text"
                        value={field.value || ""}
                        onChange={field.onChange}
                        className="flex-1 rounded border px-2 py-1 h-10 w-full text-left"
                        placeholder="نوع بج..."
                      />
                    )}
                  />
                </div>
                <div className="col-span-12 md:col-span-3">
                  <span>اسلات</span>
                  <Controller
                    control={control}
                    name={`variations.${index}.variant_badges.${badgeIndex}.slot`}
                    rules={{ required: "اسلات بج الزامی است" }}
                    render={({ field }) => (
                      <input
                        type="text"
                        value={field.value || ""}
                        onChange={field.onChange}
                        className="flex-1 rounded border px-2 py-1 h-10 w-full text-left"
                        placeholder="اسلات بج..."
                      />
                    )}
                  />
                </div>
                <div className="col-span-12 md:col-span-3">
                  <span>اولویت</span>
                  <Controller
                    control={control}
                    name={`variations.${index}.variant_badges.${badgeIndex}.priority`}
                    rules={{ required: "اولویت بج الزامی است" }}
                    render={({ field: { onChange, value } }) => (
                      <input
                        type="number"
                        value={value || ""}
                        onChange={(e) => {
                          const rawValue = e.target.value;
                          if (!isNaN(rawValue) && rawValue !== "") {
                            onChange(Number(rawValue));
                          }
                        }}
                        className="flex-1 rounded border px-2 py-1 h-10 w-full text-left"
                        placeholder="اولویت بج..."
                      />
                    )}
                  />
                </div>
                <div className="col-span-12 md:col-span-4">
                  <span>متن بج</span>
                  <Controller
                    control={control}
                    name={`variations.${index}.variant_badges.${badgeIndex}.payload.text`}
                    rules={{ required: "متن بج الزامی است" }}
                    render={({ field }) => (
                      <input
                        type="text"
                        value={field.value || ""}
                        onChange={field.onChange}
                        className="flex-1 rounded border px-2 py-1 h-10 w-full text-left"
                        placeholder="متن بج..."
                      />
                    )}
                  />
                </div>
                <div className="col-span-12 md:col-span-4">
                  <span>رنگ متن</span>
                  <Controller
                    control={control}
                    name={`variations.${index}.variant_badges.${badgeIndex}.payload.text_color`}
                    rules={{ required: "رنگ متن الزامی است" }}
                    render={({ field }) => (
                      <input
                        type="text"
                        value={field.value || ""}
                        onChange={field.onChange}
                        className="flex-1 rounded border px-2 py-1 h-10 w-full text-left"
                        placeholder="رنگ متن (مثال: #000000)..."
                      />
                    )}
                  />
                </div>
                <div className="col-span-12 md:col-span-4">
                  <span>آیکون SVG (اختیاری)</span>
                  <Controller
                    control={control}
                    name={`variations.${index}.variant_badges.${badgeIndex}.payload.svg_icon`}
                    render={({ field }) => (
                      <input
                        type="text"
                        value={field.value || ""}
                        onChange={field.onChange}
                        className="flex-1 rounded border px-2 py-1 h-10 w-full text-left"
                        placeholder="آیکون SVG..."
                      />
                    )}
                  />
                </div>
              </div>
              <button
                type="button"
                className="p-1 rounded self-end"
                onClick={() => removeBadge(badgeIndex)}
              >
                <Trash className="w-6 h-6 text-gray-500 hover:text-red-500" />
              </button>
              {errors.variations?.[index]?.variant_badges?.[badgeIndex] &&
                Object.keys(errors.variations[index].variant_badges[badgeIndex]).map((field) => (
                  <span key={`${badgeIndex}.${field}`} className="text-red-500 text-sm">
                    {errors.variations[index].variant_badges[badgeIndex][field]?.message ||
                      errors.variations[index].variant_badges[badgeIndex][field]?.payload?.text?.message ||
                      errors.variations[index].variant_badges[badgeIndex][field]?.payload?.text_color?.message ||
                      errors.variations[index].variant_badges[badgeIndex][field]?.payload?.svg_icon?.message}
                  </span>
                ))}
            </div>
          ))}
          <button
            type="button"
            className="mt-2 p-2 bg-blue-500 text-white rounded"
            onClick={() =>
              append({
                id: 0,
                type: "",
                slot: "",
                priority: 0,
                payload: { text: "", text_color: "", svg_icon: "" },
              })
            }
          >
            افزودن بج
          </button>
        </div>

        {/* Remove Variant Button */}
        <button
          type="button"
          className="p-1 rounded self-end"
          onClick={() => remove(index)}
        >
          <Trash className="w-6 h-6 text-gray-500 hover:text-red-500" />
        </button>

        {/* Error Messages */}
        {[
          "campaignTitle",
          "campaignState",
          "discountAmount",
          "unit",
          "price",
          "stock",
          "lowStockThreshold",
          "lead_time",
          "rank",
          "rate",
          "status",
          "techplus",
          "warranty",
          "color",
          "seller",
          "insurance",
          "shipment_methods",
          "has_importer_price",
          "manufacture_price_not_exist",
          "has_best_price_in_last_month",
          "techclub.point",
        ].map(
          (field) =>
            errors.variations?.[index]?.[field] && (
              <span key={field} className="text-red-500 text-sm">
                {errors.variations[index][field].message}
              </span>
            )
        )}
        {errors.variations?.[index]?.properties &&
          Object.keys(errors.variations[index].properties).map((prop) => (
            <span key={prop} className="text-red-500 text-sm">
              {errors.variations[index].properties[prop].message}
            </span>
          ))}
      </div>
    </div>
  );
};

export default UnitPrice;