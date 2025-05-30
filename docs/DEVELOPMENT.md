# Development Setup

## Git Hooks & Code Quality

Dự án này sử dụng các công cụ sau để đảm bảo chất lượng code:

### 🔧 Các công cụ đã cài đặt:

- **Husky**: Quản lý Git hooks
- **Commitlint**: Kiểm tra format commit message
- **Prettier**: Code formatting (mỗi package có config riêng)
- **ESLint**: Code linting (sử dụng shared config)
- **Turborepo**: Build optimization và task management

### 📋 Quy trình hoạt động:

#### Pre-commit Hook (Trước khi commit)
```bash
# Tự động chạy khi bạn commit
git commit -m "feat: add new feature"
```

Hook sẽ:
1. 🎨 Chạy format cho packages có thay đổi
2. 🔍 Chạy lint cho packages có thay đổi
3. 🛠️ Chạy type-check cho packages có thay đổi
4. ✅ Chỉ cho phép commit nếu tất cả pass

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

Hook sẽ:
1. 📦 Phát hiện packages có thay đổi
2. 🚀 Chỉ build các packages bị ảnh hưởng  
3. ❌ Từ chối push nếu build lỗi
4. ✅ Cho phép push nếu build thành công

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

# Build chỉ packages có thay đổi
pnpm turbo build --filter="...[HEAD~1]"

# Format cho specific package
pnpm turbo format --filter=web
pnpm turbo format --filter=@workspace/ui

# Lint cho specific package
pnpm turbo lint --filter=web
```

### 🔧 Cấu hình files:

- `commitlint.config.js` - Cấu hình commit message rules
- `.husky/` - Git hooks directory
- `turbo.json` - Turborepo task configuration
- `apps/web/.prettierrc` - Prettier config cho web app
- `packages/ui/.prettierrc` - Prettier config cho UI package

### 💡 Tips:

1. **Bypass hooks khi cần thiết** (không khuyến khích):
   ```bash
   git commit --no-verify -m "emergency fix"
   git push --no-verify
   ```

2. **Test tasks trước khi commit**:
   ```bash
   pnpm turbo format --filter="[HEAD]"
   pnpm turbo lint --filter="[HEAD]"
   pnpm turbo type-check --filter="[HEAD]"
   ```

3. **Xem packages nào sẽ bị build**:
   ```bash
   pnpm turbo build --filter="...[HEAD~1]" --dry-run
   ```

### 🚨 Troubleshooting:

**Commit bị reject vì commit message**:
```bash
# Sửa commit message gần nhất
git commit --amend -m "feat: correct commit message"
```

**Build lỗi khi push**:
```bash  
# Fix lỗi build trước, sau đó:
pnpm turbo build --filter="...[HEAD~1]"
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
- ✅ Prettier với Tailwind plugin
- ✅ ESLint với Next.js rules
- ✅ TypeScript strict mode

#### UI Package (`packages/ui/`)
- ✅ Prettier cho React components
- ✅ ESLint cho React/TS
- ✅ TypeScript strict mode

### 🎉 Benefits:

- ✅ **Per-Package Config**: Mỗi package có config riêng phù hợp
- ⚡ **Performance**: Chỉ chạy tasks cho packages có thay đổi
- 🔒 **Consistency**: Commit message theo chuẩn
- 🚀 **Developer Experience**: Workflow mượt mà
- 📈 **Maintainability**: Dễ maintain và scale 