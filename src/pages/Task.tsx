import { useEffect, useState } from "react";
import {
  ClipboardList,
  Clock3,
  LoaderCircle,
  CircleCheckBig,
  Plus,
} from "lucide-react";

import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sidebar/sidebar";
import SummaryCard from "../components/task/summarycard";
import TaskCard, { type Task } from "../components/task/taskcard";
import { useTaskQuery } from "../Hooks/useQuery";
import Dialog from "../components/Dialog/Dialog";
import { useCreateUserMutation, useDeleteUserMutation, useUpdateUserMutation } from "../Hooks/useMutationQuery";
import { toast } from "sonner";
import DeleteConfirmationDialog from "../components/Dialog/confirmationDialog";
import MainLayout from "../layout/mainLayout";

const Task = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [taskList, setTaskList] = useState([]);
 

const {mutate:createMutate} = useCreateUserMutation();
const {mutate:updateMutate} = useUpdateUserMutation();
const {mutate:deleteMutate} = useDeleteUserMutation();
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

const [sortBy, setSortBy] = useState("createdAt");
const [sortOrder, setSortOrder] = useState("desc");
const { data:userData, isLoading } = useTaskQuery(
  0,
  10,
  search,
  filterStatus,
  sortBy,
  sortOrder
);

useEffect(()=>{
const timer = setTimeout(() => {
    setSearch(searchinput)
}, 500);

return () =>clearTimeout(timer)
},[searchinput])

  useEffect(() => {
    if (userData) {
      console.log(userData)
      setTaskList(userData.data.row)

    }
  }, [userData])

  const submitValue = async () => {
    // console.log({title:taskName,description,status})
      if (new Date(startDate) > new Date(dueDate)) {
    toast.error("Due date must be after the start date.");
    return;
  }
  if(!taskName || !startDate || !dueDate){
    toast.error("Please fill the required field");
    return
  }
    if (isEdit) {
      await updateMutate({ id: updateTaskId, title: taskName, description, status,start_date:startDate,due_date:dueDate })
      setUpdateTaskId("");

    } else {
      await createMutate({ title: taskName, description, status })
            toast.success("Task created successfully");


    }
    resetValue();
    setIsDialogOpen(false)
  }
  const handleDelete = async () => {
    console.log("Delete")
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

  return (
    <>

      {/* Sidebar */}

      {/* <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      /> */}

      {/* Right Section */}
      <MainLayout>

        <div className="flex flex-1 flex-col">

          {/* <Navbar onMenuClick={() => setSidebarOpen(true)} /> */}

          <main className="flex-1 p-8">

            {/* Header */}

            <div className="mb-8 flex items-center justify-between">

              <div>
                <h1 className="text-4xl font-bold text-main">
                  Task List
                </h1>
              </div>

              <button className="flex items-center gap-2 rounded-2xl bg-primary-custom px-5 py-3 text-white" onClick={() => { setIsEdit(false); setIsDialogOpen(true) }}>
                <Plus size={20} />
                New Task
              </button>

            </div>

            {/* Summary */}

           

            {/* Recent Tasks */}

            <div className="mt-12">
<div className="mb-8 flex flex-wrap items-center gap-4">

  {/* Search */}

  <input
    type="text"
    placeholder="Search task..."
    value={searchinput}
    onChange={(e) => setSearchInput(e.target.value)}
    className="w-full md:w-72 rounded-xl border border-custom bg-input-custom px-4 py-3 text-main outline-none"
  />

  {/* Status */}

  <select
    value={filterStatus}
    onChange={(e) => setFilterStatus(e.target.value)}
    className="rounded-xl border border-custom bg-input-custom px-4 py-3 text-main"
  >
    <option value="">All Status</option>
    <option value="pending">Pending</option>
    <option value="in_progress">In Progress</option>
    <option value="completed">Completed</option>
  </select>

  {/* Sort By */}

  <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className="rounded-xl border border-custom bg-input-custom px-4 py-3 text-main"
  >
    <option value="createdAt">Created Date</option>
    <option value="title">Title</option>
    <option value="status">Status</option>
    <option value="start_date">Start Date</option>
    <option value="due_date">Due Date</option>
  </select>

  {/* Order */}

  <select
    value={sortOrder}
    onChange={(e) => setSortOrder(e.target.value)}
    className="rounded-xl border border-custom bg-input-custom px-4 py-3 text-main"
  >
    <option value="desc">Descending</option>
    <option value="asc">Ascending</option>
  </select>

</div>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                {taskList.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={() => { setIsEdit(true); setIsDialogOpen(true); setUpdateTaskId(task?.id); setTaskName(task?.title); setDescription(task?.description); setStatus(task?.status) }}
                    onDelete={() => { setUpdateTaskId(task?.id); setDeleteOpen(true) }}
                  />
                ))}

              </div>

            </div>

          </main>
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

export default Task;