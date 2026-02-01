import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "active" | "confirmed" | "validated" | "processed" | "pending" | "enrolling" | "completed";
  className?: string;
}

const statusConfig = {
  active: {
    label: "ACTIVE",
    className: "bg-primary/20 text-primary border-primary/30",
  },
  confirmed: {
    label: "CONFIRMED",
    className: "bg-primary/20 text-primary border-primary/30",
  },
  validated: {
    label: "VALIDATED",
    className: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
  processed: {
    label: "PROCESSED",
    className: "bg-primary/20 text-primary border-primary/30",
  },
  pending: {
    label: "PENDING",
    className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  },
  enrolling: {
    label: "ENROLLING",
    className: "bg-primary/20 text-primary border-primary/30",
  },
  completed: {
    label: "COMPLETED",
    className: "bg-primary/20 text-primary border-primary/30",
  },
};

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
};

export { StatusBadge };
