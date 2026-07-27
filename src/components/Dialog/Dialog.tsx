import { X } from "lucide-react";

interface DialogProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

const Dialog = ({ open, title, children, onClose }: DialogProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900 shadow-2xl animate-in fade-in zoom-in duration-200">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <h2 className="text-xl font-semibold text-white">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dialog;