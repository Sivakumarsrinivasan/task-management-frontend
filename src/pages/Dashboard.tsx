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

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const {data:userData, isLoading,
  isPending,
  isError,
  error,} = useTaskQuery();
console.log({
  userData,
  isLoading,
  isPending,
  isError,
  error,
});  
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
  const tasks: Task[] = [
    {
      id: 1,
      title: "Design Login Page",
      description: "Create responsive login page.",
      status: "completed",
      createdAt: "25 Jul 2026",
    },
    {
      id: 2,
      title: "JWT Authentication",
      description: "Complete login and register.",
      status: "in_progress",
      createdAt: "24 Jul 2026",
    },
    {
      id: 3,
      title: "Dashboard UI",
      description: "Create dashboard components.",
      status: "pending",
      createdAt: "23 Jul 2026",
    },
  ];
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
                  Dashboard
                </h1>

                <p className="mt-2 text-muted-custom">
                  Welcome back 👋 Here's an overview of your tasks.
                </p>
              </div>

              <button className="flex items-center gap-2 rounded-2xl bg-primary-custom px-5 py-3 text-white" onClick={() => { setIsEdit(false); setIsDialogOpen(true) }}>
                <Plus size={20} />
                New Task
              </button>

            </div>

            {/* Summary */}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

              <SummaryCard
                title="Total Tasks"
                value={taskList?.length ?? 0}
                icon={ClipboardList}
                color="text-indigo-600"
                bgColor="bg-indigo-100"
                increase="+12%"
              />

              <SummaryCard
                title="Pending"
                value={taskList?.filter((a) => a.status == 'pending').length ?? 0}
                icon={Clock3}
                color="text-orange-500"
                bgColor="bg-orange-100"
                increase="+5%"
              />

              <SummaryCard
                title="In Progress"
                value={taskList?.filter((a) => a.status == 'in_progress').length ?? 0}
                icon={LoaderCircle}
                color="text-blue-500"
                bgColor="bg-blue-100"
                increase="+3%"
              />

              <SummaryCard
                title="Completed"
                value={taskList?.filter((a) => a.status == 'completed').length ?? 0}
                icon={CircleCheckBig}
                color="text-green-500"
                bgColor="bg-green-100"
                increase="+20%"
              />

            </div>

            {/* Recent Tasks */}

            <div className="mt-12">

              <div className="mb-6 flex items-center justify-between">

                <h2 className="text-2xl font-bold text-main">
                  Recent Tasks
                </h2>

                <button className="rounded-xl border border-custom bg-surface px-5 py-2 hover:bg-input-custom">
                  View All
                </button>

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

export default Dashboard;