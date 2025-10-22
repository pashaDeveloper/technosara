import React from "react";
import Plus from "@/components/icons/Plus";
import Minus from "@/components/icons/Minus";
import { Controller } from "react-hook-form";
import Dropdown from "@/components/shared/dropDown/Dropdown";
import { useGetIconsQuery } from "@/services/icon/iconApi";

const CategoryFeatures = ({ control, features, setFeatures, errors }) => {
  const { data: fetchIconsData } = useGetIconsQuery({
    page: 1,
    limit: Infinity,
    status: "all",
    search: ""
  });

  const icons =
    fetchIconsData?.data?.map((icon) => ({
      id: icon._id,
      value: icon.title,
      icon: icon.symbol
    })) || [];

  // افزودن سرگروه جدید
  const handleAddGroup = () => {
    setFeatures([
      ...features,
      { name: "", icon: "", fields: [] }
    ]);
  };

  const handleRemoveGroup = (groupIndex) => {
    const updated = [...features];
    updated.splice(groupIndex, 1);
    setFeatures(updated);
  };

  const handleGroupChange = (index, field, value) => {
    const updated = [...features];
    updated[index][field] = value;
    setFeatures(updated);
  };

  // افزودن ویژگی به سرگروه
  const handleAddField = (groupIndex) => {
    const updated = [...features];
    updated[groupIndex].fields.push({
      name: "",
      type: "string",
      options: [""],
      unit: "",
      icon: ""
    });
    setFeatures(updated);
  };

  const handleRemoveField = (groupIndex, fieldIndex) => {
    const updated = [...features];
    updated[groupIndex].fields.splice(fieldIndex, 1);
    setFeatures(updated);
  };

  const handleFieldChange = (groupIndex, fieldIndex, field, value) => {
    const updated = [...features];
    updated[groupIndex].fields[fieldIndex][field] = value;
    setFeatures(updated);
  };

  return (
    <div className="flex flex-col gap-y-6">
      {features.map((group, groupIndex) => (
        <div key={groupIndex} className="border p-3 rounded bg-gray-50">
          {/* نام سرگروه */}
          <input
            type="text"
            placeholder="نام سرگروه (مثلا مشخصات کلی)"
            value={group.name}
            onChange={(e) =>
              handleGroupChange(groupIndex, "name", e.target.value)
            }
            className="w-full border rounded p-2 mb-2"
          />

          {/* آیکون سرگروه */}
          <Controller
            control={control}
            name={`features[${groupIndex}].icon`}
            render={({ field: { onChange, value } }) => (
              <Dropdown
                items={icons}
                sendId={true}
                value={value}
                onChange={(val) => {
                  handleGroupChange(groupIndex, "icon", val);
                  onChange(val);
                }}
                placeholder="انتخاب آیکون سرگروه"
              />
            )}
          />

          {/* ویژگی‌های داخل سرگروه */}
          {group.fields.map((field, fieldIndex) => (
            <div
              key={fieldIndex}
              className="flex flex-col gap-y-2 border p-2 mt-3 rounded"
            >
              {/* نام ویژگی */}
              <input
                type="text"
                placeholder="نام ویژگی (مثلا مدل)"
                value={field.name}
                onChange={(e) =>
                  handleFieldChange(groupIndex, fieldIndex, "name", e.target.value)
                }
                className="w-full border rounded p-2"
              />

              {/* انتخاب آیکون ویژگی */}
              <Controller
                control={control}
                name={`features[${groupIndex}].fields[${fieldIndex}].icon`}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    items={icons}
                    sendId={true}
                    value={value}
                    onChange={(val) => {
                      handleFieldChange(groupIndex, fieldIndex, "icon", val);
                      onChange(val);
                    }}
                    placeholder="انتخاب آیکون ویژگی"
                  />
                )}
              />

              {/* انتخاب نوع داده */}
              <select
                value={field.type}
                onChange={(e) =>
                  handleFieldChange(groupIndex, fieldIndex, "type", e.target.value)
                }
                className="p-2 border rounded"
              >
                <option value="string">متن</option>
                <option value="number">عدد</option>
                <option value="boolean">بله/خیر</option>
                <option value="select">انتخابی</option>
                <option value="date">تاریخ</option>
              </select>

              {/* اگر عدد بود → واحد */}
              {field.type === "number" && (
                <input
                  type="text"
                  placeholder="واحد (مثلا گرم)"
                  value={field.unit}
                  onChange={(e) =>
                    handleFieldChange(groupIndex, fieldIndex, "unit", e.target.value)
                  }
                  className="p-2 border rounded"
                />
              )}

              {/* اگر انتخابی بود → گزینه‌ها */}
              {field.type === "select" && (
                <div className="flex flex-col gap-y-2">
                  {field.options.map((opt, optIndex) => (
                    <div key={optIndex} className="flex gap-x-2">
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const updated = [...features];
                          updated[groupIndex].fields[fieldIndex].options[optIndex] =
                            e.target.value;
                          setFeatures(updated);
                        }}
                        className="flex-1 border rounded p-2"
                        placeholder={`گزینه ${optIndex + 1}`}
                      />
                      {optIndex === field.options.length - 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...features];
                            updated[groupIndex].fields[fieldIndex].options.push("");
                            setFeatures(updated);
                          }}
                          className="bg-green-500 text-white px-2 rounded"
                        >
                          <Plus />
                        </button>
                      )}
                      {optIndex > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...features];
                            updated[groupIndex].fields[fieldIndex].options.splice(
                              optIndex,
                              1
                            );
                            setFeatures(updated);
                          }}
                          className="bg-red-500 text-white px-2 rounded"
                        >
                          <Minus />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={() => handleRemoveField(groupIndex, fieldIndex)}
                className="bg-red-600 text-white px-3 py-1 rounded mt-2"
              >
                حذف ویژگی
              </button>
            </div>
          ))}

          {/* افزودن ویژگی جدید */}
          <button
            type="button"
            onClick={() => handleAddField(groupIndex)}
            className="bg-blue-600 text-white px-3 py-1 rounded mt-3"
          >
            + افزودن ویژگی
          </button>

          {/* حذف سرگروه */}
          <button
            type="button"
            onClick={() => handleRemoveGroup(groupIndex)}
            className="bg-red-700 text-white px-3 py-1 rounded mt-2"
          >
            حذف سرگروه
          </button>
        </div>
      ))}

      {/* افزودن سرگروه جدید */}
      <button
        type="button"
        onClick={handleAddGroup}
        className="bg-green-600 text-white px-3 py-2 rounded self-start"
      >
        + افزودن سرگروه
      </button>
    </div>
  );
};

export default CategoryFeatures;
