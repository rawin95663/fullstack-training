import type { Meta, StoryObj } from "@storybook/react";
import { StatusBadge } from "./status-badge.js";
import { Heart } from "lucide-react";

const meta: Meta<typeof StatusBadge> = {
  title: "UI Components/StatusBadge",
  component: StatusBadge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile badge component for displaying status information with icons and different visual variants.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["success", "warning", "error", "info", "pending", "outline"],
      description: "Visual variant determining color scheme",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "default", "lg"],
      description: "Size variant of the badge",
    },
    showIcon: {
      control: { type: "boolean" },
      description: "Whether to display the status icon",
    },
    pulse: {
      control: { type: "boolean" },
      description: "Whether the badge should have a pulse animation",
    },
    children: {
      control: { type: "text" },
      description: "Badge content text",
    },
  },
  args: {
    children: "Active",
    showIcon: true,
    pulse: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "Completed",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Pending Review",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    children: "Failed",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    children: "Information",
  },
};

export const Pending: Story = {
  args: {
    variant: "pending",
    children: "In Progress",
    pulse: true,
  },
};

export const WithoutIcon: Story = {
  args: {
    variant: "success",
    children: "No Icon",
    showIcon: false,
  },
};

export const SmallSize: Story = {
  args: {
    variant: "info",
    size: "sm",
    children: "Small",
  },
};

export const LargeSize: Story = {
  args: {
    variant: "success",
    size: "lg",
    children: "Large Badge",
  },
};

export const CustomIcon: Story = {
  args: {
    variant: "info",
    children: "Favorite",
    icon: Heart,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <StatusBadge variant="success">Success</StatusBadge>
      <StatusBadge variant="warning">Warning</StatusBadge>
      <StatusBadge variant="error">Error</StatusBadge>
      <StatusBadge variant="info">Info</StatusBadge>
      <StatusBadge variant="pending" pulse>
        Pending
      </StatusBadge>
      <StatusBadge variant="outline">Outline</StatusBadge>
    </div>
  ),
};
