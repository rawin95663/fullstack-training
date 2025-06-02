import React from "react";
import { cn } from "../lib/utils.js";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckCircle, AlertCircle, XCircle, Clock, Info } from "lucide-react";

const statusBadgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        success:
          "border-transparent bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
        warning:
          "border-transparent bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
        error:
          "border-transparent bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
        info: "border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
        pending:
          "border-transparent bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
        outline: "text-foreground border-border",
      },
      size: {
        sm: "text-xs px-2 py-0.5",
        default: "text-xs px-2.5 py-0.5",
        lg: "text-sm px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "default",
    },
  }
);

const iconMap = {
  success: CheckCircle,
  warning: AlertCircle,
  error: XCircle,
  info: Info,
  pending: Clock,
  outline: Info,
};

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {
  /** The status text to display */
  children: React.ReactNode;
  /** Whether to show the status icon */
  showIcon?: boolean;
  /** Custom icon to override the default status icon */
  icon?: React.ComponentType<{ className?: string }>;
  /** Whether the badge should pulse for pending states */
  pulse?: boolean;
}

export const StatusBadge = React.forwardRef<HTMLDivElement, StatusBadgeProps>(
  (
    {
      className,
      variant = "outline",
      size,
      children,
      showIcon = true,
      icon: CustomIcon,
      pulse = false,
      ...props
    },
    ref
  ) => {
    const IconComponent = CustomIcon || iconMap[variant || "outline"];

    return (
      <div
        ref={ref}
        className={cn(
          statusBadgeVariants({ variant, size }),
          pulse && "animate-pulse",
          className
        )}
        {...props}
      >
        {showIcon && IconComponent && <IconComponent className="h-3 w-3" />}
        {children}
      </div>
    );
  }
);

StatusBadge.displayName = "StatusBadge";
