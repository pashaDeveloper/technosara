import React, { useState, useEffect } from "react";
import ControlPanel from "../ControlPanel";
import { useGetTagsQuery, useDeleteTagMutation } from "@/services/tag/tagApi";
import Search from "@/components/shared/search";
import Add from "./add";
import UpdateTag from "./UpdateTag";
import { toast } from "react-hot-toast";
import SkeletonItem from "@/components/shared/skeleton/SkeletonItem";
import StatusIndicator from "@/components/shared/tools/StatusIndicator";
import Pagination from "@/components/shared/pagination/Pagination";
import DeleteModal from "@/components/shared/modal/DeleteModal";

const Tags = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data, isLoading, error, refetch } = useGetTagsQuery({
    page: currentPage,
    limit: itemsPerPage,
    status: statusFilter === "all" ? undefined : statusFilter,
    search: searchTerm,
  });

  const [deleteTag, { isLoading: deleting, error: deleteError, data: deleteData }] =
    useDeleteTagMutation();

  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 1;

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال دریافت تگ‌ها...", { id: "tag-loading" });
    } else {
      toast.dismiss("tag-loading");
    }

    if (data) {
      toast.success(data.description || "تگ‌ها با موفقیت دریافت شدند", { id: "tag-loading" });
    }

    if (error?.data) {
      toast.error(error.data.message || "خطا در دریافت تگ‌ها", { id: "tag-loading" });
    }
  }, [isLoading, data, error]);

  useEffect(() => {
    if (deleting) {
      toast.loading("در حال حذف تگ...", { id: "tag-delete" });
    } else {
      toast.dismiss("tag-delete");
    }

    if (deleteData) {
      toast.success("تگ با موفقیت حذف شد.", { id: "tag-delete" });
      refetch();
    }

    if (deleteError?.data) {
      toast.error(deleteError.data.message || "خطا در حذف تگ", { id: "tag-delete" });
    }
  }, [deleting, deleteData, deleteError, refetch]);

  return (
    <ControlPanel>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Add />

      <div className="mt-8 w-full grid grid-cols-12 text-slate-400 px-4 ">
        <div className="col-span-11 lg:col-span-3  text-sm">
          <span className="hidden lg:flex">نویسنده</span>
          <span className="flex lg:hidden">نویسنده و عنوان</span>
        </div>
        <div className="col-span-8 lg:col-span-3 hidden lg:flex  text-sm">
          عنوان
        </div>
        <div className="lg:col-span-5 lg:flex hidden text-sm md:block">
          توضیحات
        </div>
        <div className="col-span-1 md:block text-sm">عملیات</div>
      </div>

      {isLoading ? (
        <SkeletonItem repeat={5} />
      ) : data?.data?.length === 0 ? (
        <p className="text-center py-10 text-gray-500">تگی یافت نشد.</p>
      ) : (
        data.data.map((tag) => (
          <div
            key={tag._id}
            className="mt-4 p-2 grid grid-cols-12 rounded-xl min-h-25 border border-gray-200 gap-2 dark:border-white/10 dark:bg-slate-800 bg-white transition-all dark:hover:border-slate-700 hover:border-slate-100 hover:bg-green-50/50 dark:hover:bg-gray-900 dark:text-slate-100 "
          >
            <div className="col-span-10 lg:col-span-3 text-center flex items-center">
              <StatusIndicator isActive={tag.status === "active"} />
              <div className="py-2 flex justify-center items-center gap-x-2 text-right">
                <img
                  src={tag?.creator?.avatar?.url || "/placeholder.png"}
                  alt={tag?.title || "تصویر تگ"}
                  height={100}
                  width={100}
                  className="h-[60px] w-[60px] rounded-full object-cover"
                />
                <article className="flex-col flex gap-y-2  ">
                  <span className="line-clamp-1 text-base ">
                    <span className="hidden lg:flex ">{tag?.creator?.name}</span>
                    <span className=" lg:hidden ">{tag?.title}</span>
                  </span>
                  <span className="text-xs hidden lg:flex">
                    {new Date(tag.createdAt).toLocaleDateString("fa-IR")}
                  </span>
                  <span className=" lg:hidden text-xs line-clamp-1 ">
                    {tag?.description
                      ? tag?.description
                      : new Date(tag.createdAt).toLocaleDateString("fa-IR")}
                  </span>
                </article>
              </div>
            </div>
            <div className="lg:col-span-3 lg:flex  hidden  text-center  items-center">
              <span className="break-words text-sm lg:text-sm text-right">{tag.title}</span>
            </div>
            <div className="lg:col-span-5 lg:flex hidden col-span-5 text-right  items-center">
              <span className="text-sm lg:text-base overflow-hidden text-ellipsis block line-clamp-1 max-h-[1.2em]">
                {tag.description ? tag.description : "ندارد"}
              </span>
            </div>

            <div className="col-span-2 md:col-span-1 gap-2  text-center flex justify-center md:items-center items-left">
              <article className="lg:flex-row flex flex-col gap-x-2 justify-left gap-y-2">
                <UpdateTag id={tag?._id} />
                <DeleteModal
                  message="آیا از حذف این تگ  اطمینان دارید؟"
                  isLoading={deleting}
                  onDelete={() => deleteTag(tag._id)}
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

export default Tags;
