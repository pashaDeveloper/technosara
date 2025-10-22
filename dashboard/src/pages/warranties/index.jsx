import React, { useState, useEffect, useMemo } from "react";
import {
  useGetWarrantiesQuery,
  useDeleteWarrantyMutation
} from "@/services/warranty/warrantyApi";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import { toast } from "react-hot-toast";
import StatusIndicator from "@/components/shared/tools/StatusIndicator";
import SkeletonItem from "@/components/shared/skeleton/SkeletonItem";
import Pagination from "@/components/shared/pagination/Pagination";
import Search from "@/components/shared/search";
import AddButton from "@/components/shared/button/AddButton";
import ControlPanel from "../ControlPanel";

const Warranties = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, error, refetch } = useGetWarrantiesQuery({
    page: currentPage,
    limit: itemsPerPage,
    search: searchTerm
  });

  const warranties = useMemo(() => data?.data || [], [data]);
  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 1;

  const [
    removeWarranty,
    { isLoading: isRemoving, data: deleteWarrantyData, error: removeError }
  ] = useDeleteWarrantyMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال دریافت گارانتی‌ها...", { id: "warrantiesData" });
    }
    if (data && data.acknowledgement) {
      toast.success(data.description, { id: "warrantiesData" });
    }

    if (data && !data.acknowledgement) {
      toast.error(error?.data?.description || "خطایی رخ داده است", {
        id: "warrantiesData"
      });
    }
  }, [error, data, isLoading]);

  useEffect(() => {
    if (isRemoving) {
      toast.loading("در حال حذف گارانتی...", { id: "deleteWarranty" });
    } else {
      toast.dismiss("deleteWarranty");
    }

    if (deleteWarrantyData) {
      toast.success(
        deleteWarrantyData.description || "گارانتی با موفقیت حذف شد.",
        { id: "deleteWarranty" }
      );
    }

    if (removeError) {
      toast.error(removeError?.data?.description || "خطا در حذف گارانتی", {
        id: "deleteWarranty"
      });
    }
  }, [isRemoving, deleteWarrantyData, removeError]);

  return (
    <ControlPanel>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <AddButton link="./add" />

      <div className="mt-8 w-full grid grid-cols-12 text-slate-400 px-4 ">
        <div className="col-span-11 lg:col-span-4 text-sm">
          <span className="hidden lg:flex">عنوان</span>
          <span className="flex lg:hidden">عنوان و توضیحات</span>
        </div>
        <div className="lg:col-span-3 hidden lg:flex text-sm md:block">
          شرکت گارانتی
        </div>
        <div className="lg:col-span-2 hidden lg:flex text-sm md:block">
          تخفیف کل
        </div>
        <div className="lg:col-span-2 hidden lg:flex text-sm md:block">
          مدت دوره
        </div>
        <div className="col-span-1 md:block text-sm">عملیات</div>
      </div>

      {isLoading ? (
        <SkeletonItem repeat={5} />
      ) : warranties.length === 0 ? (
        <SkeletonItem repeat={5} />
      ) : (
        <section className="w-full h-full">
          <div className="overflow-x-auto w-full">
            {warranties.map((warranty) => (
              <div
                key={warranty._id}
                className="mt-4 p-1 grid grid-cols-12 rounded-xl cursor-pointer border border-gray-200 gap-2 dark:border-white/10 dark:bg-slate-800 bg-white px-2 transition-all dark:hover:border-slate-700 hover:border-slate-100 hover:bg-green-50 dark:hover:bg-gray-800 dark:text-slate-100"
              >
                <div className="col-span-10 lg:col-span-4 text-center flex items-center">
                  <StatusIndicator isActive={warranty.status === "active"} />
                  <div className="py-2 flex justify-center items-center gap-x-2 text-right">
                    <img
                      src={
                        warranty?.thumbnail?.url ||
                        warranty?.creator?.avatar?.url
                      }
                      alt={warranty.title || "warranty image"}
                      height={100}
                      width={100}
                      className="h-[60px] w-[60px] rounded-full object-cover"
                    />
                    <article className="flex-col flex gap-y-2">
                      <span className="line-clamp-1 text-base">
                        <span className="flex">{warranty.title_fa}</span>
                      </span>
                      <span className="text-xs hidden lg:flex">
                        {new Date(warranty.createdAt).toLocaleDateString(
                          "fa-IR"
                        )}
                      </span>
                      <span className="lg:hidden text-xs line-clamp-1">
                        {warranty.description ||
                          new Date(warranty.createdAt).toLocaleDateString(
                            "fa-IR"
                          )}
                      </span>
                    </article>
                  </div>
                </div>

                <div className="lg:col-span-3 hidden lg:flex justify-left items-center text-right">
                  {warranty.provider.name_fa}
                </div>

                <div className="lg:col-span-2 hidden lg:flex justify-left items-center text-right">
                  {warranty.global_discount_percent}
                </div>
                <div className="lg:col-span-2 hidden lg:flex justify-left items-center text-right">
                  {warranty.duration_months}
                </div>
                <div className="col-span-2 md:col-span-1 gap-2 text-center flex justify-center items-center">
                  <article className="lg:flex-row flex flex-col justify-center gap-x-2 gap-y-2">
                    <DeleteModal
                      message={`آیا از حذف گارانتی "${warranty.title}" اطمینان دارید؟`}
                      isLoading={isRemoving}
                      onDelete={() => removeWarranty(warranty._id)}
                    />
                  </article>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </ControlPanel>
  );
};

export default Warranties;
