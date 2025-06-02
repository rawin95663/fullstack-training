import type { Meta, StoryObj } from "@storybook/react";
import { UserCard } from "./user-card.js";

const meta: Meta<typeof UserCard> = {
  title: "UI Components/UserCard",
  component: UserCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A presentation component for displaying user information with avatar, contact details, and different variants.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "featured", "compact"],
      description: "Visual variant of the card",
    },
    size: {
      control: { type: "select" },
      options: ["default", "wide", "full"],
      description: "Size variant of the card",
    },
    showContactInfo: {
      control: { type: "boolean" },
      description: "Whether to display contact information",
    },
    name: {
      control: { type: "text" },
      description: "User full name",
    },
    email: {
      control: { type: "text" },
      description: "User email address",
    },
    phone: {
      control: { type: "text" },
      description: "User phone number",
    },
    role: {
      control: { type: "text" },
      description: "User role or position",
    },
    avatarUrl: {
      control: { type: "text" },
      description: "URL for user avatar image",
    },
  },
  args: {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    role: "Senior Developer",
    showContactInfo: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Featured: Story = {
  args: {
    variant: "featured",
    name: "Sarah Wilson",
    role: "Lead Designer",
    email: "sarah.wilson@example.com",
  },
};

export const Compact: Story = {
  args: {
    variant: "compact",
    name: "Mike Chen",
    role: "Product Manager",
    email: "mike.chen@example.com",
    phone: "+1 (555) 987-6543",
  },
};

export const WithAvatar: Story = {
  args: {
    name: "Emily Rodriguez",
    role: "UX Researcher",
    email: "emily.rodriguez@example.com",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108755-2616b78b71ed?w=100&h=100&fit=crop&crop=face",
  },
};

export const NoContactInfo: Story = {
  args: {
    name: "Alex Thompson",
    role: "Frontend Developer",
    showContactInfo: false,
  },
};

export const MinimalInfo: Story = {
  args: {
    name: "Jordan Kim",
    email: "jordan.kim@example.com",
  },
};

export const WideSize: Story = {
  args: {
    size: "wide",
    name: "Dr. Rebecca Martinez",
    role: "Chief Technology Officer",
    email: "rebecca.martinez@example.com",
    phone: "+1 (555) 456-7890",
  },
};

export const CustomFallback: Story = {
  args: {
    name: "Christopher Johnson",
    role: "DevOps Engineer",
    email: "chris.johnson@example.com",
    avatarFallback: "CJ",
  },
};
