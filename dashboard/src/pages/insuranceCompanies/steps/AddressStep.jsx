
const AddressStep = ({ control, errors, register, prevStep, nextStep }) => {
  return (
    <div>
      <div className="flex flex-col gap-y-4 h-full p-2">
        {/* استان */}
        <label htmlFor="province" className="flex flex-col gap-y-1">
          <span className="text-sm">* استان</span>
          <input
            type="text"
            name="province"
            id="province"
            placeholder="مثلاً تهران"
            className="p-2 rounded border"
            {...register("province", {
              required: "وارد کردن استان الزامی است"
            })}
          />
          {errors.province && (
            <span className="text-red-500 text-sm">
              {errors.province.message}
            </span>
          )}
        </label>

        {/* شهر */}
        <label htmlFor="city" className="flex flex-col gap-y-1">
          <span className="text-sm">* شهر</span>
          <input
            type="text"
            name="city"
            id="city"
            placeholder="مثلاً تهران"
            className="p-2 rounded border"
            {...register("city", {
              required: "وارد کردن شهر الزامی است"
            })}
          />
          {errors.city && (
            <span className="text-red-500 text-sm">{errors.city.message}</span>
          )}
        </label>

        {/* خیابان */}
        <label htmlFor="street" className="flex flex-col gap-y-1">
          <span className="text-sm">* خیابان</span>
          <input
            type="text"
            name="street"
            id="street"
            placeholder="مثلاً ولیعصر"
            className="p-2 rounded border"
            {...register("street", {
              required: "وارد کردن خیابان الزامی است"
            })}
          />
          {errors.street && (
            <span className="text-red-500 text-sm">
              {errors.street.message}
            </span>
          )}
        </label>

        {/* پلاک */}
        <label htmlFor="plateNumber" className="flex flex-col gap-y-1">
          <span className="text-sm">* پلاک</span>
          <input
            type="text"
            name="plateNumber"
            id="plateNumber"
            placeholder="مثلاً ۱۲۳"
            className="p-2 rounded border"
            {...register("plateNumber", {
              required: "وارد کردن پلاک الزامی است"
            })}
          />
          {errors.plateNumber && (
            <span className="text-red-500 text-sm">
              {errors.plateNumber.message}
            </span>
          )}
        </label>

        {/* طبقه */}
        <label htmlFor="floor" className="flex flex-col gap-y-1">
          <span className="text-sm">طبقه</span>
          <input
            type="text"
            name="floor"
            id="floor"
            placeholder="مثلاً اول یا همکف"
            className="p-2 rounded border"
            {...register("floor")}
          />
        </label>

        {/* واحد */}
        <label htmlFor="unit" className="flex flex-col gap-y-1">
          <span className="text-sm">* واحد</span>
          <input
            type="text"
            name="unit"
            id="unit"
            placeholder="مثلاً ۲"
            className="p-2 rounded border"
            {...register("unit", {
              required: "وارد کردن شماره واحد الزامی است"
            })}
          />
          {errors.unit && (
            <span className="text-red-500 text-sm">{errors.unit.message}</span>
          )}
        </label>

        {/* کد پستی */}
        <label htmlFor="postalCode" className="flex flex-col gap-y-1">
          <span className="text-sm">* کد پستی</span>
          <input
            type="text"
            name="postalCode"
            id="postalCode"
            placeholder="مثلاً 1234567890"
            className="p-2 rounded border"
            {...register("postalCode", {
              required: "وارد کردن کد پستی الزامی است",
              pattern: {
                value: /^\d{10}$/,
                message: "کد پستی باید ۱۰ رقم باشد"
              }
            })}
          />
          {errors.postalCode && (
            <span className="text-red-500 text-sm">
              {errors.postalCode.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default AddressStep;
