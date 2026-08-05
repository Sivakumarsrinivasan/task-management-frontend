
// task tour guide
export const taskSteps = [
  {
    element: "#create-task-btn",
    popover: {
      title: "Create Task",
      description:
        "Click here to create a new task by providing the title, description, due date, and status.",
    },
  },
  {
    element: "#task-filter",
    popover: {
      title: "Filter Tasks",
      description:
        "Filter tasks based on their current status such as Pending, In Progress, or Completed.",
    },
  },
  {
    element: "#task-sort",
    popover: {
      title: "Sort Tasks",
      description:
        "Sort your tasks by newest, oldest, due date, or alphabetical order.",
    },
  },
  {
    element: "#task-search",
    popover: {
      title: "Search Tasks",
      description:
        "Quickly find tasks by entering a title or keyword in the search box.",
    },
  },
  {
    element: "#task-list",
    popover: {
      title: "Task List",
      description:
        "All your tasks are displayed here. You can view, edit, delete, and update their status directly from the cards.",
    },
  },
   {
    element: "#import-csv-btn",
    popover: {
      title: "Import Tasks",
      description:
        "Import tasks from a CSV file. Your CSV must contain the required columns shown below. Click 'Download Sample CSV' to get a template before importing.",
    },
  },

  {
    element: "#download-sample-btn",
    popover: {
      title: "Download Sample CSV",
      description:
        "Download a sample CSV containing the correct column names. Fill in your task details and upload the file to import tasks successfully.",
    },
  },

  {
    element: "#export-csv-btn",
    popover: {
      title: "Export Tasks",
      description:
        "Export all your tasks to a CSV file for backup, sharing, or further analysis.",
    },
  },
];

// profile
export const profileSteps = [
  {
    element: "#profile-image",
    popover: {
      title: "Profile Picture",
      description:
        "Upload or update your profile picture. Supported image formats are JPG, JPEG, and PNG.",
    },
  },
  {
    element: "#profile-name",
    popover: {
      title: "Full Name",
      description:
        "Update your full name. This name will be displayed throughout the application.",
    },
  },
  {
    element: "#profile-email",
    popover: {
      title: "Email Address",
      description:
        "This is your registered email address. It is used for authentication and cannot be changed.",
    },
  },
  {
    element: "#profile-phone",
    popover: {
      title: "Phone Number",
      description:
        "Add or update your contact number so your profile information stays up to date.",
    },
  },
  {
    element: "#save-profile-btn",
    popover: {
      title: "Save Changes",
      description:
        "Click here to save any changes you've made to your profile information.",
    },
  },
];

export const dashboardSteps = [
  {
    element: "#dashboard-title",
    popover: {
      title: "Welcome to TaskFlow",
      description:
        "This dashboard gives you a quick overview of your tasks and helps you track your productivity.",
    },
  },
  {
    element: "#recent-tasks",
    popover: {
      title: "Recent Tasks",
      description:
        "Here you can view the tasks that were recently created. Use this section to quickly continue your latest work.",
    },
  },
  {
    element: "#total-tasks",
    popover: {
      title: "Total Tasks",
      description:
        "Total tasks in your you added is displayed here",
    },
  },
  {
    element: "#pending-tasks",
    popover: {
      title: "Pending Tasks",
      description:
        "This section lists all tasks that haven't been started yet. Start working on them to move them to In Progress.",
    },
  },
  {
    element: "#inprogress-tasks",
    popover: {
      title: "In Progress Tasks",
      description:
        "These are the tasks you're currently working on. Update their status once they're completed.",
    },
  },
  {
    element: "#completed-tasks",
    popover: {
      title: "Completed Tasks",
      description:
        "All successfully completed tasks are displayed here, helping you track your accomplishments.",
    },
  },
];