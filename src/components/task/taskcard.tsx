import {
  Calendar,
  CalendarDays,
  Clock3,
  Pencil,
  Trash2,
  CircleCheckBig,
  LoaderCircle,
} from "lucide-react";
import clsx from "clsx";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "completed";
  start_date: string;
  due_date: string;
}

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const TaskCard = ({
  task,
  onEdit,
  onDelete,
}: TaskCardProps) => {
  const statusConfig = {
    pending: {
      label: "Pending",
      bg: "bg-orange-100 dark:bg-orange-500/20",
      text: "text-orange-600",
      icon: Clock3,
    },
    in_progress: {
      label: "In Progress",
      bg: "bg-blue-100 dark:bg-blue-500/20",
      text: "text-blue-600",
      icon: LoaderCircle,
    },
    completed: {
      label: "Completed",
      bg: "bg-green-100 dark:bg-green-500/20",
      text: "text-green-600",
      icon: CircleCheckBig,
    },
  };

  const status = statusConfig[task.status];
  const StatusIcon = status.icon;

  const formatDateTime = (date: string) =>
    new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  return (
    <div className="group rounded-3xl border border-custom bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Header */}

      <div className="flex items-start justify-between gap-4">

        <div className="flex-1">

          <h2 className="text-xl font-semibold text-main">
            {task.title}
          </h2>

          <p className="mt-2 text-sm text-muted-custom line-clamp-2">
            {task.description}
          </p>

        </div>

        <div
          className={clsx(
            "flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium whitespace-nowrap",
            status.bg,
            status.text
          )}
        >
          <StatusIcon size={16} />
          {status.label}
        </div>

      </div>

      {/* Dates */}

      <div className="mt-5 space-y-3 rounded-2xl border border-custom bg-input-custom p-4">

        <div className="flex items-center gap-3">

          <CalendarDays
            size={18}
            className="text-indigo-500"
          />

          <div>

            <p className="text-xs text-muted-custom">
              Start Date
            </p>

            <p className="text-sm font-medium text-main">
              {formatDateTime(task.start_date)}
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <Calendar
            size={18}
            className="text-red-500"
          />

          <div>

            <p className="text-xs text-muted-custom">
              Due Date
            </p>

            <p className="text-sm font-medium text-main">
              {formatDateTime(task.due_date)}
            </p>

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-5 flex items-center justify-end border-t border-custom pt-4">

        <div className="flex gap-3">

          <button
            onClick={() => onEdit(task)}
            className="rounded-xl border border-custom bg-input-custom p-2 transition hover:bg-primary-custom hover:text-white"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(task.id)}
            className="rounded-xl border border-custom bg-input-custom p-2 transition hover:bg-red-500 hover:text-white"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>

    </div>
  );
};

export default TaskCard;