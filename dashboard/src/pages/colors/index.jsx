import React, { useState, useEffect } from "react";
import ControlPanel from "../ControlPanel";
import { useGetColorsQuery, useDeleteColorMutation } from "@/services/color/colorApi";
import Search from "@/components/shared/search";
import Add from "./add";
import UpdateColor from "./UpdateColor";
import { toast } from "react-hot-toast";
import SkeletonItem from "@/components/shared/skeleton/SkeletonItem";
import StatusIndicator from "@/components/shared/tools/StatusIndicator";
import Pagination from "@/components/shared/pagination/Pagination";
import DeleteModal from "@/components/shared/modal/DeleteModal";

const Colors = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data, isLoading, error, refetch } = useGetColorsQuery({
    page: currentPage,
    limit: itemsPerPage,
    status: statusFilter === "all" ? undefined : statusFilter,
    search: searchTerm,
  });

  const [deleteColor, { isLoading: deleting, error: deleteError, data: deleteData }] =
    useDeleteColorMutation();

  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 1;

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال دریافت رنگ‌ها...", { id: "color-loading" });
    } else {
      toast.dismiss("color-loading");
    }

    if (data) {
      toast.success(data.description || "رنگ‌ها با موفقیت دریافت شدند", { id: "color-loading" });
    }

    if (error?.data) {
      toast.error(error.data.message || "خطا در دریافت رنگ‌ها", { id: "color-loading" });
    }
  }, [isLoading, data, error]);

  useEffect(() => {
    if (deleting) {
      toast.loading("در حال حذف رنگ...", { id: "color-delete" });
    } else {
      toast.dismiss("color-delete");
    }

    if (deleteData) {
      toast.success("رنگ با موفقیت حذف شد.", { id: "color-delete" });
      refetch();
    }

    if (deleteError?.data) {
      toast.error(deleteError.data.message || "خطا در حذف رنگ", { id: "color-delete" });
    }
  }, [deleting, deleteData, deleteError, refetch]);

  return (
    <ControlPanel>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Add />

      <div className="mt-8 w-full grid grid-cols-12 text-slate-400 px-4">
        <div className="col-span-11 lg:col-span-3 text-sm">
          <span className="hidden lg:flex">نویسنده</span>
          <span className="flex lg:hidden">نویسنده و عنوان</span>
        </div>
        <div className="col-span-8 lg:col-span-3 hidden lg:flex text-sm">
          عنوان
        </div>
        <div className="lg:col-span-5 lg:flex hidden text-sm md:block">
          رنگ
        </div>
        <div className="col-span-1 md:block text-sm">عملیات</div>
      </div>

      {isLoading ? (
        <SkeletonItem repeat={5} />
      ) : data?.data?.length === 0 ? (
        <SkeletonItem repeat={5} />
      ) : (
        data.data.map((color) => (
          <div
            key={color._id}
            className="mt-4 p-2 grid grid-cols-12 rounded-xl min-h-25 border border-gray-200 gap-2 dark:border-white/10 dark:bg-slate-800 bg-white transition-all dark:hover:border-slate-700 hover:border-slate-100 hover:bg-green-50/50 dark:hover:bg-gray-900 dark:text-slate-100"
          >
            <div className="col-span-10 lg:col-span-3 text-center flex items-center">
              <StatusIndicator isActive={color.status === "active"} />
              <div className="py-2 flex justify-center items-center gap-x-2 text-right">
                <img
                  src={color?.creator?.avatar?.url || "/placeholder.png"}
                  alt={color?.title || "تصویر رنگ"}
                  height={100}
                  width={100}
                  className="h-[60px] w-[60px] rounded-full object-cover"
                />
                <article className="flex-col flex gap-y-2">
                  <span className="line-clamp-1 text-base">
                    <span className="hidden lg:flex">{color?.creator?.name}</span>
                    <span className="lg:hidden">{color?.title_fa}</span>
                  </span>
                  <span className="text-xs lg:flex">
                    {new Date(color.createdAt).toLocaleDateString("fa-IR")}
                  </span>
                </article>
              </div>
            </div>
            <div className="lg:col-span-3 lg:flex hidden text-center items-center">
              <span className="break-words text-sm lg:text-sm text-right">
                {color.title_fa}
              </span>
            </div>
            <div className="lg:col-span-5 lg:flex hidden col-span-5 text-right items-center">
              <div className="flex items-center gap-x-3">
                <div
                  className="w-12 h-12 rounded-lg border shadow-sm"
                  style={{ backgroundColor: color.hex_code }}
                  title={color.hex_code}
                />
                <span className="text-sm lg:text-base">{color.hex_code}</span>
              </div>
            </div>

            <div className="col-span-2 md:col-span-1 gap-2 text-center flex justify-center md:items-center items-left">
              <article className="lg:flex-row flex flex-col gap-x-2 justify-left gap-y-2">
                <UpdateColor id={color?._id} />
                <DeleteModal
                  message="آیا از حذف این رنگ اطمینان دارید؟"
                  isLoading={deleting}
                  onDelete={() => deleteColor(color._id)}
                />
              </article>
            </div>
          </div>
        ))
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </ControlPanel>
  );
};

export default Colors;