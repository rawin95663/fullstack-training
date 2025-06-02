# Development Setup

## Git Hooks & Code Quality

Dự án này sử dụng các công cụ sau để đảm bảo chất lượng code:

### 🔧 Các công cụ đã cài đặt:

- **Husky**: Quản lý Git hooks
- **Commitlint**: Kiểm tra format commit message
- **Prettier**: Code formatting (mỗi package có config riêng)
- **ESLint**: Code linting (sử dụng shared config)
- **Turborepo**: Build optimization và task management
- **Smart Detection**: Script phát hiện packages có thay đổi

### 📋 Quy trình hoạt động:

#### Pre-commit Hook (Trước khi commit)
```bash
# Tự động chạy khi bạn commit
git commit -m "feat: add new feature"
```

**Hook sẽ thực hiện:**
1. 🔍 **Smart Detection**: Phát hiện packages có staged files
2. 🎨 Chạy format **chỉ cho packages có thay đổi**
3. 🔍 Chạy lint **chỉ cho packages có thay đổi**
4. 🛠️ Chạy type-check **chỉ cho packages có thay đổi**
5. ✅ Chỉ cho phép commit nếu tất cả pass

**Ví dụ output:**
```bash
🔍 Detecting packages with staged changes...
Changed files: 2
  - apps/web/app/page.tsx
  - packages/ui/src/components/button.tsx
Changed packages: web, @workspace/ui
📦 Found changes in packages: web @workspace/ui
🎨 Formatting web...
🔍 Linting web...
🔍 Type checking web...
🎨 Formatting @workspace/ui...
🔍 Linting @workspace/ui...
🔍 Type checking @workspace/ui...
✅ All checks passed!
```

#### Commit Message Hook  
```bash
# Commit message phải theo format conventional commits
git commit -m "feat(web): add user authentication"
git commit -m "fix(api): resolve login issue"
git commit -m "docs: update readme"
```

**Các type được phép:**
- `feat`: Tính năng mới
- `fix`: Sửa lỗi  
- `docs`: Cập nhật documentation
- `style`: Thay đổi formatting
- `refactor`: Refactor code
- `perf`: Cải thiện performance
- `test`: Thêm/cập nhật tests
- `chore`: Maintenance tasks
- `ci`: Thay đổi CI configuration
- `build`: Thay đổi build system
- `revert`: Revert commit

#### Pre-push Hook (Trước khi push)
```bash
# Tự động chạy khi bạn push
git push origin main
```

**Hook sẽ thực hiện:**
1. 🔍 **Smart Detection**: Phát hiện packages có thay đổi từ commit trước
2. 🚀 Chỉ build **packages bị ảnh hưởng**  
3. ❌ Từ chối push nếu build lỗi
4. ✅ Cho phép push nếu build thành công

**Ví dụ output:**
```bash
🚀 Detecting packages with changes to build...
Changed files: 5
  - apps/web/app/layout.tsx
  - packages/ui/src/lib/utils.ts
Changed packages: web, @workspace/ui
📦 Found changes in packages: web @workspace/ui
🔨 Building web...
🔨 Building @workspace/ui...
✅ Build successful! Ready to push.
```

### 🎯 Scripts có thể sử dụng:

```bash
# Format code cho tất cả packages
pnpm format

# Kiểm tra format (không sửa)
pnpm format:check

# Lint tất cả packages
pnpm lint

# Lint và auto-fix
pnpm lint:fix

# Type checking tất cả packages
pnpm type-check

# Build tất cả projects
pnpm build

# Format cho specific package
pnpm turbo format --filter=web
pnpm turbo format --filter=@workspace/ui

# Lint cho specific package
pnpm turbo lint --filter=web

# Test script phát hiện thay đổi
node scripts/get-changed-packages.js --cached    # staged files
node scripts/get-changed-packages.js HEAD~1     # since last commit
```

### 🔧 Cấu hình files:

- `commitlint.config.js` - Cấu hình commit message rules
- `.husky/` - Git hooks directory
- `turbo.json` - Turborepo task configuration
- `scripts/get-changed-packages.js` - **Smart detection script**
- `apps/web/.prettierrc` - Prettier config cho web app
- `packages/ui/.prettierrc` - Prettier config cho UI package

### 🧠 Smart Detection Logic:

Script `get-changed-packages.js` hoạt động như sau:

1. **Detect Changed Files**: Sử dụng `git diff` để tìm files thay đổi
2. **Map to Packages**: Phân tích path để xác định package chứa file
3. **Package Mapping**:
   - `apps/web/*` → `web` package
   - `packages/ui/*` → `@workspace/ui` package
   - `packages/eslint-config/*` → `@workspace/eslint-config` package
4. **Output**: Trả về list packages thực sự cần xử lý

### 💡 Tips:

1. **Bypass hooks khi cần thiết** (không khuyến khích):
   ```bash
   git commit --no-verify -m "emergency fix"
   git push --no-verify
   ```

2. **Test hooks trước khi commit**:
   ```bash
   # Test detection script
   node scripts/get-changed-packages.js --cached
   
   # Test tasks cho specific package
   pnpm turbo format --filter=web
   pnpm turbo lint --filter=@workspace/ui
   ```

3. **Debug detection**:
   ```bash
   # Xem files nào đang staged
   git diff --cached --name-only
   
   # Test script với verbose output
   node scripts/get-changed-packages.js --cached
   ```

### 🚨 Troubleshooting:

**Commit bị reject vì commit message**:
```bash
# Sửa commit message gần nhất
git commit --amend -m "feat: correct commit message"
```

**Build lỗi khi push**:
```bash  
# Xem packages nào sẽ bị build
node scripts/get-changed-packages.js HEAD~1

# Fix lỗi build cho specific package
cd apps/web && pnpm build
git push
```

**Format hoặc lint lỗi**:
```bash
# Chạy format cho specific package
cd apps/web && pnpm format

# Chạy lint fix cho specific package  
cd packages/ui && pnpm lint:fix

# Hoặc từ root
pnpm turbo lint:fix --filter=web
pnpm turbo format --filter=@workspace/ui
```

### 📦 Package Configurations:

#### Web App (`apps/web/`)
- ✅ Prettier với config riêng
- ✅ ESLint với Next.js rules
- ✅ TypeScript strict mode
- ✅ Prettier ignore build files

#### UI Package (`packages/ui/`)
- ✅ Prettier cho React components
- ✅ ESLint cho React/TS
- ✅ TypeScript strict mode
- ✅ Prettier ignore dist files

### 🎉 Benefits:

- ✅ **Smart Detection**: Chỉ chạy tasks cho packages thật sự thay đổi
- ⚡ **Performance**: Tiết kiệm thời gian đáng kể trong large monorepo
- 🔒 **Precision**: Không chạy task không cần thiết
- 🎯 **Per-Package Config**: Mỗi package có config riêng phù hợp
- 🚀 **Scalable**: Dễ thêm packages mới
- 📈 **Maintainable**: Code quality được đảm bảo với cost tối thiểu 