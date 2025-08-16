import React, { useState, useEffect, useMemo } from "react";
import {
  useGetBrandsQuery,
  useDeleteBrandMutation
} from "@/services/brand/brandApi";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import { toast } from "react-hot-toast";
import StatusIndicator from "@/components/shared/tools/StatusIndicator";
import SkeletonItem from "@/components/shared/skeleton/SkeletonItem";
import Pagination from "@/components/shared/pagination/Pagination";
import Search from "@/components/shared/search";
import AddButton from "@/components/shared/button/AddButton";
import ControlPanel from "../ControlPanel";

const Brands = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, error, refetch } = useGetBrandsQuery({
    page: currentPage,
    limit: itemsPerPage,
    status: statusFilter === "all" ? undefined : statusFilter,
    search: searchTerm,
  });

  const brands = useMemo(() => data?.data || [], [data]);
  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 1;
  const [
    removeBrand,
    { isLoading: isRemoving, data: deleteBrand, error: removeError }
  ] = useDeleteBrandMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال دریافت برندها...", { id: "brandsData" });
    } 

    if (data && data.acknowledgement) {
      toast.success(data.description, { id: "brandsData" });
    }

    if (data && !data.acknowledgement) {
      toast.error(error?.data?.description || "خطایی رخ داده است", { id: "brandsData" });
    }
  }, [error, data, isLoading]);

  useEffect(() => {
    if (isRemoving) {
      toast.loading("در حال حذف برند...", { id: "deleteBrand" });
    } else {
      toast.dismiss("deleteBrand");
    }

    if (deleteBrand) {
      toast.success(deleteBrand.description || "برند با موفقیت حذف شد.", { id: "deleteBrand" });
    }

    if (removeError) {
      toast.error(removeError?.data?.description || "خطا در حذف برند", { id: "deleteBrand" });
    }
  }, [isRemoving, deleteBrand, removeError]);

  return (
    <ControlPanel>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <AddButton link="./add" />

      <div className="mt-8 w-full grid grid-cols-12 text-slate-400 px-4 ">
        <div className="col-span-11 lg:col-span-3 text-sm">
          <span className="hidden lg:flex">نویسنده</span>
          <span className="flex lg:hidden">نویسنده و عنوان</span>
        </div>
        <div className="col-span-8 lg:col-span-2 hidden lg:flex text-sm">
          عنوان
        </div>
        <div className="lg:col-span-4 lg:flex hidden text-sm md:block">
          توضیحات
        </div>
        <div className="lg:col-span-2 lg:flex hidden text-sm md:block">
          تگ‌ها
        </div>
        <div className="col-span-1 md:block text-sm">عملیات</div>
      </div>

      {isLoading ? (
        <SkeletonItem repeat={5} />
      ) : brands.length === 0 ? (
        <SkeletonItem repeat={5} />
      ) : (
        <section className="w-full h-full">
          <div className="overflow-x-auto w-full">
            {brands.map((brand) => (
              <div
                key={brand._id}
                className="mt-4 p-1 grid grid-cols-12 rounded-xl cursor-pointer border border-gray-200 gap-2 dark:border-white/10 dark:bg-slate-800 bg-white px-2 transition-all dark:hover:border-slate-700 hover:border-slate-100 hover:bg-green-50 dark:hover:bg-gray-800 dark:text-slate-100"
              >
                <div className="col-span-10 lg:col-span-3 text-center flex items-center">
                  <StatusIndicator isActive={brand.status === "active"} />
                  <div className="py-2 flex justify-center items-center gap-x-2 text-right">
                    <img
                      src={
                        brand?.logo?.url 
            
                      }
                      alt={brand.title_fa || "brand image"}
                      height={100}
                      width={100}
                      className="h-[60px] w-[60px] rounded-full object-cover"
                    />
                    <article className="flex-col flex gap-y-2">
                      <span className="line-clamp-1 text-base">
                        <span className="flex">{brand.title_fa}</span>
                      </span>
                      <span className="text-xs hidden lg:flex">
                        {new Date(brand.createdAt).toLocaleDateString("fa-IR")}
                      </span>
                      <span className="lg:hidden text-xs line-clamp-1">
                        {brand.description
                          ? brand.description
                          : new Date(brand.createdAt).toLocaleDateString("fa-IR")}
                      </span>
                    </article>
                  </div>
                </div>

                <div className="lg:col-span-4 hidden gap-2 lg:flex justify-left items-center text-right overflow-hidden">
                  <article className="flex-col flex gap-y-2">
                    <span className="text-sm lg:text-base overflow-hidden text-ellipsis block line-clamp-1 max-h-[1.2em]">
                      {brand.description}
                    </span>
                  </article>
                </div>

                <div className="lg:col-span-4 hidden gap-2 lg:flex justify-left items-center text-right">
                  <span className="w-52 overflow-x-auto scrollbar-hide text-sm flex flex-row gap-x-2">
                    {(brand.tags || []).map((tag, index) => (
                      <span
                        key={index}
                        className="border px-1 py-0.5 rounded-sm whitespace-nowrap"
                      >
                        {tag.title }
                      </span>
                    ))}
                  </span>
                </div>

                <div className="col-span-2 md:col-span-1 gap-2 text-center flex justify-center items-center">
                  <article className="lg:flex-row flex flex-col justify-center gap-x-2 gap-y-2">
                    <DeleteModal
                      message={`آیا از حذف برند "${brand.title}" اطمینان دارید؟`}
                      isLoading={isRemoving}
                      onDelete={() => removeBrand(brand._id)}
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

export default Brands;
