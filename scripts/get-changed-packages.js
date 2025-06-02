#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

/**
 * Get packages that have changed files
 * @param {string} compareRef - Git reference to compare against (e.g., 'HEAD~1', '--cached')
 * @returns {string[]} Array of package names that have changes
 */
function getChangedPackages(compareRef = "--cached") {
  try {
    // Get changed files
    const gitCommand =
      compareRef === "--cached"
        ? "git diff --cached --name-only --diff-filter=ACMR"
        : `git diff ${compareRef} --name-only --diff-filter=ACMR`;

    const changedFiles = execSync(gitCommand, { encoding: "utf8" })
      .trim()
      .split("\n")
      .filter((file) => file.length > 0);

    if (changedFiles.length === 0) {
      return [];
    }

    console.error(`Changed files: ${changedFiles.length}`);
    changedFiles.forEach((file) => console.error(`  - ${file}`));

    // Find packages that contain these changed files
    const changedPackages = new Set();

    // Read workspace configuration
    const workspaceConfig = JSON.parse(fs.readFileSync("package.json", "utf8"));
    const rootPackageName = workspaceConfig.name;

    for (const file of changedFiles) {
      // Check if file is in apps/ or packages/
      if (file.startsWith("apps/")) {
        const appMatch = file.match(/^apps\/([^\/]+)/);
        if (appMatch) {
          const appName = appMatch[1];
          // Read app's package.json to get the actual package name
          try {
            const appPackageJson = JSON.parse(
              fs.readFileSync(`apps/${appName}/package.json`, "utf8")
            );
            changedPackages.add(appPackageJson.name);
          } catch (err) {
            console.error(
              `Warning: Could not read package.json for apps/${appName}`
            );
          }
        }
      } else if (file.startsWith("packages/")) {
        const packageMatch = file.match(/^packages\/([^\/]+)/);
        if (packageMatch) {
          const packageName = packageMatch[1];
          // Read package's package.json to get the actual package name
          try {
            const packageJson = JSON.parse(
              fs.readFileSync(`packages/${packageName}/package.json`, "utf8")
            );
            changedPackages.add(packageJson.name);
          } catch (err) {
            console.error(
              `Warning: Could not read package.json for packages/${packageName}`
            );
          }
        }
      }
      // Note: We skip root level changes for package-specific tasks
      // Root changes will trigger global tasks if needed
    }

    const result = Array.from(changedPackages);
    console.error(`Changed packages: ${result.join(", ")}`);
    return result;
  } catch (error) {
    console.error("Error detecting changed packages:", error.message);
    return [];
  }
}

// CLI usage
if (require.main === module) {
  const compareRef = process.argv[2] || "--cached";
  const changedPackages = getChangedPackages(compareRef);

  if (changedPackages.length === 0) {
    console.log("");
    process.exit(0);
  }

  // Output packages separated by space for shell usage
  console.log(changedPackages.join(" "));
}

module.exports = { getChangedPackages };
