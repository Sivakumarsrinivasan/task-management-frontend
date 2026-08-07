import { useEffect, useState } from "react";
import {
  ClipboardList,
  Clock3,
  LoaderCircle,
  CircleCheckBig,
} from "lucide-react";
import SummaryCard from "../components/task/summarycard";
import TaskCard from "../components/task/taskcard";
import { useTaskQuery } from "../Hooks/useQuery";
import Dialog from "../components/Dialog/Dialog";
import { useCreateUserMutation, useDeleteUserMutation, useUpdateUserMutation } from "../Hooks/useMutationQuery";
import { toast } from "sonner";
import DeleteConfirmationDialog from "../components/Dialog/confirmationDialog";
import MainLayout from "../layout/mainLayout";
import { useUserDetail } from "../Hooks/userDetail";
import AppTour from "../components/Apptour";
import { dashboardSteps } from "../const/tourGuide";
import { convertDateTime, convertUsFormat, formatForDateTimeInput } from "../const/dateFormat";
import type { TaskDetail } from "../const/type";

const Dashboard = () => {
  const [taskList, setTaskList] = useState<any[]>([]);
  const userDetail = useUserDetail((detail)=>detail.detail)
  const {data:userData} = useTaskQuery(userDetail?.id ?? "",0,3);
 
const {mutate:createMutate} = useCreateUserMutation(userDetail?.id ?? "");
const {mutate:updateMutate} = useUpdateUserMutation(userDetail?.id ?? "");
const {mutate:deleteMutate} = useDeleteUserMutation(userDetail?.id ?? "");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [taskName, setTaskName] = useState("");
  const [status, setStatus] = useState("pending");
  const [isEdit, setIsEdit] = useState(false);
  const [updateTaskId, setUpdateTaskId] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
const [dueDate, setDueDate] = useState("");
const [taskDetail, setTaskDetail] = useState<TaskDetail>()

  useEffect(() => {
    if (userData) {
      setTaskList(userData?.data?.row ?? [])
      const {
      total,
      in_progress,
      pending,
      completed
    } = userData?.data?.paginationDetail ?? {};

    setTaskDetail({
      total,
      in_progress,
      pending,
      completed
    });
    }
  }, [userData])

  const submitValue = async () => {
    if (new Date(startDate) > new Date(dueDate)) {
      toast.error("Due date must be after the start date.");
      return;
    }
    if (!taskName || !startDate || !dueDate) {
      toast.error("Please fill the required field");
      return
    }
    const utcStartDate = convertUsFormat(startDate);
    const utcDueDate = convertUsFormat(dueDate);
    if (isEdit) {
      await updateMutate({ id: updateTaskId, title: taskName, description, status, start_date: utcStartDate, due_date: utcDueDate })
      setUpdateTaskId("");

    } else {
      await createMutate({ title: taskName, description, status, start_date: utcStartDate, due_date: utcDueDate })


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
  return (
    <>
<AppTour
userId={userDetail?.id ?? ""}
      storageKey="dashboard-tour"
      steps={dashboardSteps}
    />
      {/* Sidebar */}

      {/* <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      /> */}

      {/* Right Section */}
      <MainLayout>

        <div className="flex flex-1 flex-col">

          {/* <Navbar onMenuClick={() => setSidebarOpen(true)} /> */}

          <div className="space-y-8">

            {/* Header */}

            <div id="dashboard-title" className="mb-8 flex items-center justify-between">

              <div>
                <h1 className="text-4xl sm:text-4xl lg:text-5xl font-bold text-main">
                  Dashboard
                </h1>

                <p className="mt-2 text-sm sm:text-base text-muted-custom">
                  Welcome back 👋 Here's an overview of your tasks.
                </p>
              </div>


            </div>

            {/* Summary */}

            <div  className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

              <SummaryCard
              id="total-tasks"
                title="Total Tasks"
                value={taskDetail?.total ?? 0}
                icon={ClipboardList}
                color="text-indigo-600"
                bgColor="bg-indigo-100"
              />

              <SummaryCard
              id="pending-tasks"
                title="Pending"
                value={taskDetail?.pending ?? 0}
                icon={Clock3}
                color="text-orange-500"
                bgColor="bg-orange-100"
              />

              <SummaryCard
              id="inprogress-tasks"
                title="In Progress"
                value={taskDetail?.in_progress ?? 0}
                icon={LoaderCircle}
                color="text-blue-500"
                bgColor="bg-blue-100"
              />

              <SummaryCard
              id="completed-tasks"
                title="Completed"
                value={taskDetail?.completed ?? 0}
                icon={CircleCheckBig}
                color="text-green-500"
                bgColor="bg-green-100"
              />

            </div>

            {/* Recent Tasks */}

            <div id="recent-tasks" className="mt-12">

              <div className="mb-6 flex items-center justify-between">

                <h2 className="text-2xl font-bold text-main">
                  Recent Tasks
                </h2>

          

              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                {taskList.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={() => { setIsEdit(true); setIsDialogOpen(true); preFillValue(task)}}
                    onDelete={() => { setUpdateTaskId(task?.id); setDeleteOpen(true) }}
                  />
                ))}

              </div>

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

export default Dashboard;