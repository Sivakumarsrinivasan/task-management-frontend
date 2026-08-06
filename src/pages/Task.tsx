import { useEffect, useState } from "react";
import {
  Plus,
} from "lucide-react";

import Papa, { type ParseResult } from "papaparse";
import TaskCard, { type Task } from "../components/task/taskcard";
import { useTaskQuery } from "../Hooks/useQuery";
import Dialog from "../components/Dialog/Dialog";
import { useCreateUserMutation, useDeleteUserMutation, useImportUserMutation, useUpdateUserMutation } from "../Hooks/useMutationQuery";
import { toast } from "sonner";
import DeleteConfirmationDialog from "../components/Dialog/confirmationDialog";
import MainLayout from "../layout/mainLayout";
import { TaskCardSkeleton } from "../components/skeletonCard";
import { useUserDetail } from "../Hooks/userDetail";
import ImportButtonExportButton from "../components/Buttons/ExportButton";
import { useUserCustomHooks } from "../Hooks/useUserCustomHooks";
import { exportCsvService } from "../services/tasks";
import AppTour from "../components/Apptour";
import { taskSteps } from "../const/tourGuide";
import { displayData, Status } from "../const/status";
import { convertDateTime, convertUsFormat, formatForDateTimeInput } from "../const/dateFormat";

const Task = () => {
  const [taskList, setTaskList] = useState<any[]>([]);
  const [page,setPage] = useState(1);
  const [currentpage,setCurrentPage] = useState(0);
  const [totalPage,setTotalPage] = useState(0);
  const [nextPageBool, setNextPageBool] =useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [taskName, setTaskName] = useState("");
  const [status, setStatus] = useState("pending");
  const [isEdit, setIsEdit] = useState(false);
  const [updateTaskId, setUpdateTaskId] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
const [dueDate, setDueDate] = useState("");
const [search, setSearch] = useState("");
const [searchinput, setSearchInput] = useState("")
const [filterStatus, setFilterStatus] = useState("");

const [sortBy, setSortBy] = useState("created_at");
const [sortOrder, setSortOrder] = useState("desc");
  const userDetail = useUserDetail((detail)=>detail.detail)
const [limit] = useState(6)
const { data:userData, isLoading,isFetching,isError,error } = useTaskQuery(
  userDetail?.id ?? "",
  page,
  6,
  search,
  filterStatus,
  sortBy,
  sortOrder
);
if(isError){
  toast.error(error.message)
}
const {mutate:createMutate} = useCreateUserMutation(userDetail?.id ?? 0);
const {mutate:updateMutate} = useUpdateUserMutation(userDetail?.id ?? "");
const {mutate:deleteMutate} = useDeleteUserMutation(userDetail?.id ?? "");
const {mutate:importCsvMutate} = useImportUserMutation(userDetail?.id ?? "");
const {errorValidator} = useUserCustomHooks()
useEffect(()=>{
const timer = setTimeout(() => {
    setSearch(searchinput)
}, 500);

return () =>clearTimeout(timer)
},[searchinput])


  useEffect(() => {
    if (userData) {
      if (nextPageBool) {
        setTaskList((prev:any) => [...prev, ...userData.data.row].filter((item, index, self) => index === self.findIndex((a) => a.id === item.id)))

      } else {
        setTaskList(userData.data.row)
      }
      setNextPageBool(false)
      setCurrentPage(userData.data.paginationDetail.currentPage);
      setTotalPage(userData.data.paginationDetail.totalPage);

    }
  }, [userData])

  const submitValue = async () => {
      if (new Date(startDate) > new Date(dueDate)) {
    toast.error("Due date must be after the start date.");
    return;
  }
  if(!taskName || !startDate || !dueDate){
    toast.error("Please fill the required field");
    return
  }
  const utcStartDate = convertUsFormat(startDate);
  const utcDueDate = convertUsFormat(dueDate);
    if (isEdit) {
      await updateMutate({ id: updateTaskId, title: taskName, description, status,start_date:utcStartDate,due_date:utcDueDate })
      setUpdateTaskId("");

    } else {
      await createMutate({ title: taskName, description, status,start_date:utcStartDate,due_date:utcDueDate })


    }
    resetValue();
    setIsDialogOpen(false)
  }
  const handleDelete = async () => {
    await deleteMutate(updateTaskId);
    setDeleteOpen(false);
    setUpdateTaskId("");
  }
  const resetValue = () =>{
    setTaskName('');
    setDescription('');
    setStatus('pending');
    setStartDate('');
    setDueDate('');
  }
const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];

  if (!file) return;

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: (results: ParseResult<Record<string, string>>) => {
      let error = errorValidator(results.data);
      if (error.length > 0) {
        let columnName = '';
        let fileldName = '';
        if (error.length == 1) {
          columnName = error[0].title;
          fileldName = error[0].columnName;

        } else {
          error.forEach((a) => {
            columnName = a.title + ',' + columnName;
            fileldName += a.columnName + ',' + fileldName;
          })
        }

        toast.error(`Please check you task "${columnName}" there is an invalid field in "${fileldName}"`);
        return
      }
      const data = Status(results.data)
      importCsvMutate(data)
    },
    error: (error) => {
      console.error(error);
    },
  });

  // Optional: reset the input so the same file can be selected again
  event.target.value = "";
};
const exportCsv = async() =>{
const task = await exportCsvService();
 const data = displayData(task)
const csv = Papa.unparse(data);
const blob = new Blob([csv],{
  type:'text/csv;charset=utf-8;'
})
const url = window.URL.createObjectURL(blob);
const link = document.createElement('a');
link.href =url;
link.download ='task.csv';
link.click();
document.body.appendChild(link);
 window.URL.revokeObjectURL(url);
}
const sampleCsv = () => {
  const sampleData = [
    {
      title: "Complete React Dashboard",
      description: "Finish dashboard UI and API integration",
      status: "pending",
      start_date: "2026-08-06 09:00 AM",
      due_date: "2026-08-10 06:00 PM",
    },
  ];

  const csv = Papa.unparse(sampleData);

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "sample-task.csv";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.URL.revokeObjectURL(url);
};
const preFillValue = (task:any) =>{
setUpdateTaskId(task?.id); 
setTaskName(task?.title); 
setDescription(task?.description); 
setStatus(task?.status);
let sdate  = convertDateTime(task?.start_date);
let sdatestring = formatForDateTimeInput(sdate)
setStartDate(sdatestring); 
let dDate = convertDateTime(task?.due_date)
let ddatestring = formatForDateTimeInput(dDate)
setDueDate(ddatestring)
// setStartDate(task?.start_date.slice(0,16)); 
// setDueDate(task?.due_date.slice(0,16))
}
const clearValue = () =>{
setUpdateTaskId(""); 
setTaskName(""); 
setDescription(""); 
setStatus("pending");
setStartDate(""); 
setDueDate("")
}
const nextPage = () =>{
setPage((prev)=>prev+1);
setNextPageBool(true)
}


  return (
    <>
<AppTour
userId={userData?.id ?? ''}
      storageKey="task-tour"
      steps={taskSteps}
    />

      {/* Sidebar */}

      {/* <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      /> */}

      {/* Right Section */}
      <MainLayout>

        <div className="h-full flex flex-1 flex-col">

          {/* <Navbar onMenuClick={() => setSidebarOpen(true)} /> */}

          <div className="h-full space-y-8">

            {/* Header */}

            <div className="mb-8 flex items-center justify-between">

              <div>
                <h1 className="text-4xl font-bold text-main">
                  Task List
                </h1>
              </div>

              <button id="create-task-btn" className="flex items-center gap-2 rounded-2xl bg-primary-custom px-5 py-3 text-white" onClick={() => { setIsEdit(false); setIsDialogOpen(true); clearValue()}}>
                <Plus size={20} />
                New Task
              </button>

            </div>

            {/* Summary */}

           

            {/* Recent Tasks */}

            <div className="mt-12 h-full">
<div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

  {/* Search */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-3 w-full">

  <input
  id="task-search"
    type="text"
    placeholder="Search task..."
    value={searchinput}
    onChange={(e) => setSearchInput(e.target.value)}
    className="w-full md:w-72 rounded-xl border border-custom bg-input-custom px-4 py-3 text-main outline-none"
  />

  {/* Status */}

  <select
  id="task-filter"
    value={filterStatus}
    onChange={(e) => {setPage(1);setFilterStatus(e.target.value)}}
    className="rounded-xl border border-custom bg-input-custom px-4 py-3 text-main"
  >
    <option value="">All Status</option>
    <option value="pending">Pending</option>
    <option value="in_progress">In Progress</option>
    <option value="completed">Completed</option>
  </select>

  {/* Sort By */}

  <select
  id="task-sort"
    value={sortBy}
    onChange={(e) => {setPage(1);setSortBy(e.target.value)}}
    className="rounded-xl border border-custom bg-input-custom px-4 py-3 text-main"
  >
    <option value="created_at">Created Date</option>
    <option value="title">Title</option>
    <option value="status">Status</option>
    <option value="start_date">Start Date</option>
    <option value="due_date">Due Date</option>
  </select>

  {/* Order */}

  <select
    value={sortOrder}
    onChange={(e) => {setPage(1);setSortOrder(e.target.value)}}
    className="rounded-xl border border-custom bg-input-custom px-4 py-3 text-main"
  >
    <option value="desc">Descending</option>
    <option value="asc">Ascending</option>
  </select>
</div>
  <ImportButtonExportButton handleFile={handleFile} exportCsv={exportCsv} sampleCsv={sampleCsv}/>

</div>
              {isLoading || isFetching ? (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <TaskCardSkeleton key={item} />
                  ))}
                </div>
              ) : taskList.length > 0 ?
                <div id="task-list" className="grid h-[85%] pb-[10%] overflow-auto gap-6 md:grid-cols-2 xl:grid-cols-3">

                  {taskList.map((task:any) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onEdit={() => { setIsEdit(true); setIsDialogOpen(true); preFillValue(task) }}
                      onDelete={() => { setUpdateTaskId(task?.id); setDeleteOpen(true) }}
                    />
                  ))}
                    {currentpage < totalPage && taskList.length >= limit &&
                      <LoadMoreButton nextPage={nextPage} />}

                </div> : <EmptyTask />}

            </div>

          </div>
          <Dialog
            open={isDialogOpen}
            title="Create New Task"
            onClose={() => setIsDialogOpen(false)}
          >
            <div className="space-y-5">

              <div>
                <label className="mb-2 block text-sm text-muted-custom">
                  Title *
                </label>

                <input
                  type="text"
                  placeholder="Enter task title"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  className="w-full rounded-xl border border-custom bg-input-custom px-4 py-3 text-main outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-muted-custom">
                  Description
                </label>

                <textarea
                  rows={4}
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  placeholder="Task description..."
                  className="w-full rounded-xl border border-custom bg-input-custom px-4 py-3 text-main outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-muted-custom">
                  Status
                </label>

                <select
                  className="w-full rounded-xl border border-custom bg-input-custom px-4 py-3 text-main outline-none focus:border-primary-custom"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>

              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* Start Date */}

                <div>
                  <label className="mb-2 block text-sm text-muted-custom">
                    Start Date & Time *
                  </label>

                  <input
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full rounded-xl border border-custom bg-input-custom px-4 py-3 text-main outline-none focus:border-primary-custom"
                  />
                </div>

                {/* Due Date */}

                <div>
                  <label className="mb-2 block text-sm text-muted-custom">
                    Due Date & Time *
                  </label>

                  <input
                    type="datetime-local"
                    value={dueDate}
                    min={startDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full rounded-xl border border-custom bg-input-custom px-4 py-3 text-main outline-none focus:border-primary-custom"
                  />
                </div>

              </div>
              <div className="flex justify-end gap-3">

                <button
                  onClick={() => { setIsDialogOpen(false); resetValue(); }}
                  className="rounded-xl border border-custom px-5 py-2 text-white cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  className="rounded-xl bg-primary-custom px-5 py-2 text-white cursor-pointer"
                  onClick={submitValue}
                >
                  {isEdit ? "Update" : "Create"} Task
                </button>

              </div>

            </div>
          </Dialog>

          <DeleteConfirmationDialog
            isOpen={deleteOpen}
            onClose={() => setDeleteOpen(false)}
            onConfirm={handleDelete}
          />
        </div>
      </MainLayout>
    </>
  );
};

export const LoadMoreButton = ({nextPage}:{nextPage:()=>void}) => {
  return (
    <>
      <div className="mt-6 flex justify-center">

      </div>
      <div className="mt-6 w-full flex justify-center">
        <button
          onClick={nextPage}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white w-[50%] cursor-pointer hover:bg-blue-700"
        >
          Load More
        </button>
      </div>
      <div>

      </div>
    </>
  )
}

export const EmptyTask = () =>{
  return(
      <div className="flex flex-col items-center justify-center py-20 text-center">
    <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
      No Data Found
    </h2>
    <p className="mt-2 text-gray-500 dark:text-gray-400">
      There are no tasks to display.
    </p>
  </div>
  )
}

export default Task;