import { AlertTriangle, Trash2, X } from "lucide-react";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  loading?: boolean;
  buttonTitle?:string;
  buttonLoading?:string;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationDialog = ({
  isOpen,
  title = "Delete Task",
  message = "Are you sure you want to delete this task? This action cannot be undone.",
  loading = false,
  buttonTitle = "Delete",
  buttonLoading = "...Deleting",
  onClose,
  onConfirm,
}: DeleteConfirmationDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-3xl border border-custom bg-surface p-6 shadow-2xl">

        {/* Header */}

        <div className="flex items-start justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="text-red-600" size={28} />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-main">
                {title}
              </h2>

              <p className="mt-1 text-sm text-muted-custom">
                {message}
              </p>
            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-input-custom"
          >
            <X size={20} />
          </button>

        </div>

        {/* Footer */}

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border border-custom px-5 py-2 text-main hover:bg-input-custom"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2 text-white hover:bg-red-700 disabled:opacity-60"
          >
            <Trash2 size={18} />

            {loading ? buttonLoading : buttonTitle}
          </button>

        </div>

      </div>

    </div>
  );
};

export default DeleteConfirmationDialog;