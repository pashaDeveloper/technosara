import React, { useState, useEffect, useMemo } from "react";
import {
  useGetInsuranceCompaniesQuery,
  useDeleteInsuranceCompanyMutation
} from "@/services/insuranceCompany/insuranceCompanyApi";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import { toast } from "react-hot-toast";
import StatusIndicator from "@/components/shared/tools/StatusIndicator";
import SkeletonItem from "@/components/shared/skeleton/SkeletonItem";
import Pagination from "@/components/shared/pagination/Pagination";
import Search from "@/components/shared/search";
import AddButton from "@/components/shared/button/AddButton";
import ControlPanel from "../ControlPanel";

const InsuranceCompanies = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, error } = useGetInsuranceCompaniesQuery({
    page: currentPage,
    limit: itemsPerPage,
    status: statusFilter === "all" ? undefined : statusFilter,
    search: searchTerm,
  });

  const insuranceCompanies = useMemo(() => data?.data || [], [data]);
  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 1;

  const [
    deleteInsuranceCompany,
    { isLoading: isRemoving, data: deletedData, error: deleteError }
  ] = useDeleteInsuranceCompanyMutation();

  // Toasts for fetching data
  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال دریافت شرکت‌های بیمه...", { id: "insuranceCompaniesData" });
    }

    if (data && data.acknowledgement) {
      toast.success(data.description, { id: "insuranceCompaniesData" });
    }

    if (error) {
      toast.error(error?.data?.description || "خطایی رخ داده است", { id: "insuranceCompaniesData" });
    }
  }, [error, data, isLoading]);

  // Toasts for deleting data
  useEffect(() => {
    if (isRemoving) {
      toast.loading("در حال حذف شرکت بیمه...", { id: "deleteInsuranceCompany" });
    } else {
      toast.dismiss("deleteInsuranceCompany");
    }

    if (deletedData) {
      toast.success(deletedData.description || "شرکت بیمه با موفقیت حذف شد.", { id: "deleteInsuranceCompany" });
    }

    if (deleteError) {
      toast.error(deleteError?.data?.description || "خطا در حذف شرکت بیمه", { id: "deleteInsuranceCompany" });
    }
  }, [isRemoving, deletedData, deleteError]);

  return (
    <ControlPanel>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <AddButton link="./add" />

      <div className="mt-8 w-full grid grid-cols-12 text-slate-400 px-4 ">
        <div className="col-span-11 lg:col-span-4 text-sm">
          <span className="hidden lg:flex">عنوان</span>
          <span className="flex lg:hidden">عنوان و توضیحات</span>
        </div>
        <div className="lg:col-span-7 lg:flex hidden text-sm md:block">
          توضیحات
        </div>
        <div className="col-span-1 md:block text-sm">عملیات</div>
      </div>

      {isLoading ? (
        <SkeletonItem repeat={5} />
      ) : insuranceCompanies.length === 0 ? (
        <SkeletonItem repeat={5} />
      ) : (
        <section className="w-full h-full">
          <div className="overflow-x-auto w-full">
            {insuranceCompanies.map((company) => (
              <div
                key={company._id}
                className="mt-4 p-1 grid grid-cols-12 rounded-xl cursor-pointer border border-gray-200 gap-2 dark:border-white/10 dark:bg-slate-800 bg-white px-2 transition-all dark:hover:border-slate-700 hover:border-slate-100 hover:bg-green-50 dark:hover:bg-gray-800 dark:text-slate-100"
              >
                <div className="col-span-10 lg:col-span-4 text-center flex items-center">
                  <StatusIndicator isActive={company.status === "active"} />
                  <div className="py-2 flex justify-center items-center gap-x-2 text-right">
                    <img
                      src={
                        company?.thumbnail?.url ||
                        company?.creator?.avatar?.url
                      }
                      alt={company.name_fa || "insurance company image"}
                      height={60}
                      width={60}
                      className="h-[60px] w-[60px] rounded-full object-cover"
                    />
                    <article className="flex-col flex gap-y-2">
                      <span className="line-clamp-1 text-base">
                        <span className="flex">{company?.name_fa}</span>
                      </span>
                      <span className="text-xs hidden lg:flex">
                        {new Date(company.createdAt).toLocaleDateString("fa-IR")}
                      </span>
                      <span className="lg:hidden text-xs line-clamp-1">
                        {company?.description
                          ? company?.description
                          : new Date(company.createdAt).toLocaleDateString("fa-IR")}
                      </span>
                    </article>
                  </div>
                </div>

                <div className="lg:col-span-7 hidden gap-2 lg:flex justify-left items-center text-right overflow-hidden">
                  <article className="flex-col flex gap-y-2">
                    <span className="text-sm lg:text-base overflow-hidden text-ellipsis block line-clamp-1 max-h-[1.2em]">
                      {company.description}
                    </span>
                  </article>
                </div>

                <div className="col-span-2 md:col-span-1 gap-2 text-center flex justify-center items-center">
                  <article className="lg:flex-row flex flex-col justify-center gap-x-2 gap-y-2">
                    <DeleteModal
                      message={`آیا از حذف "${company.name_fa}" اطمینان دارید؟`}
                      isLoading={isRemoving}
                      onDelete={() => deleteInsuranceCompany(company._id)}
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

export default InsuranceCompanies;
