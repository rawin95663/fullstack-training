module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // Tính năng mới
        "fix", // Sửa lỗi
        "docs", // Cập nhật documentation
        "style", // Thay đổi formatting, styling (không ảnh hưởng code logic)
        "refactor", // Refactor code (không phải tính năng mới hoặc sửa lỗi)
        "perf", // Cải thiện performance
        "test", // Thêm hoặc cập nhật tests
        "chore", // Maintenance tasks, dependency updates
        "ci", // Thay đổi CI configuration
        "build", // Thay đổi build system hoặc dependencies
        "revert", // Revert previous commit
      ],
    ],
    "scope-case": [2, "always", "lower-case"],
    "subject-case": [2, "always", "lower-case"],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "header-max-length": [2, "always", 72],
  },
};
