import React from "react";
import { cn } from "../lib/utils.js";
import { cva, type VariantProps } from "class-variance-authority";
import { Mail, Phone } from "lucide-react";

const userCardVariants = cva(
  "flex flex-col gap-4 rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-all",
  {
    variants: {
      variant: {
        default: "border-border hover:shadow-md",
        featured: "border-primary bg-primary/5 ring-1 ring-primary/20",
        compact: "p-4 gap-2",
      },
      size: {
        default: "w-full max-w-sm",
        wide: "w-full max-w-md",
        full: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface UserCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof userCardVariants> {
  /** User's full name */
  name: string;
  /** User's email address */
  email?: string;
  /** User's phone number */
  phone?: string;
  /** User's role or position */
  role?: string;
  /** URL for user's avatar image */
  avatarUrl?: string;
  /** Custom avatar fallback text */
  avatarFallback?: string;
  /** Whether to show contact information */
  showContactInfo?: boolean;
}

export const UserCard = React.forwardRef<HTMLDivElement, UserCardProps>(
  (
    {
      className,
      variant,
      size,
      name,
      email,
      phone,
      role,
      avatarUrl,
      avatarFallback,
      showContactInfo = true,
      ...props
    },
    ref
  ) => {
    const initials =
      avatarFallback ||
      name
        .split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase();

    return (
      <div
        ref={ref}
        className={cn(userCardVariants({ variant, size }), className)}
        {...props}
      >
        {/* Avatar Section */}
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={`${name} avatar`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground text-sm font-medium">
                {initials}
              </div>
            )}
          </div>

          <div className="flex-1 space-y-1">
            <h3 className="font-semibold leading-none">{name}</h3>
            {role && <p className="text-sm text-muted-foreground">{role}</p>}
          </div>
        </div>

        {/* Contact Information */}
        {showContactInfo && (email || phone) && (
          <div className="space-y-2 border-t pt-4">
            {email && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span className="truncate">{email}</span>
              </div>
            )}
            {phone && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{phone}</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

UserCard.displayName = "UserCard";
