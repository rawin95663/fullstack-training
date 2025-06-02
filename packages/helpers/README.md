# @workspace/helpers

A comprehensive collection of utility functions for string manipulation, number formatting, validation, datetime operations, and common constants. All functions are pure functions designed for reliability and ease of use across your applications.

## 📦 Installation

```bash
# Install dependencies
npm install date-fns

# For testing
npm install --save-dev vitest @vitest/coverage-v8
```

## 🚀 Usage

### Basic Import

```typescript
// Import all utilities
import { stringUtils, numberUtils, validationUtils, datetimeUtils, constants } from "@workspace/helpers";

// Import specific modules
import { stringUtils } from "@workspace/helpers/string";
import { numberUtils } from "@workspace/helpers/number";
import { validationUtils } from "@workspace/helpers/validation";
import { datetimeUtils } from "@workspace/helpers/datetime";
import { constants } from "@workspace/helpers/constants";
```

## 📚 API Reference

### 🔤 String Utilities

#### Text Transformation
```typescript
import { stringUtils } from "@workspace/helpers/string";

// Case conversion
stringUtils.capitalize("hello world");        // "Hello world"
stringUtils.camelCase("hello world");         // "helloWorld"
stringUtils.kebabCase("helloWorld");          // "hello-world"
stringUtils.snakeCase("helloWorld");          // "hello_world"
stringUtils.pascalCase("hello world");        // "HelloWorld"

// Text processing
stringUtils.slugify("Hello World!");          // "hello-world"
stringUtils.truncate("Long text", 5);         // "Long..."
stringUtils.truncateMiddle("0x123...789", 3, 3); // "0x1...789"
stringUtils.removeWhitespace("h e l l o");    // "hello"
```

#### Text Analysis
```typescript
stringUtils.wordCount("Hello world");         // 2
stringUtils.getInitials("John Doe");          // "JD"
stringUtils.maskString("password123", 4);     // "****rd123"
stringUtils.reverse("hello");                 // "olleh"
```

#### HTML & Security
```typescript
stringUtils.stripHtml("<p>Hello</p>");        // "Hello"
stringUtils.escapeHtml("<script>");           // "&lt;script&gt;"
```

### 🔢 Number Utilities

#### Formatting
```typescript
import { numberUtils } from "@workspace/helpers/number";

// Basic formatting
numberUtils.formatNumber(1234.56);            // "1,234.56"
numberUtils.formatCurrency(1234.56);          // "$1,234.56"
numberUtils.formatCurrency(1234.56, "EUR");   // "€1,234.56"
numberUtils.formatCompact(1500000);           // "1.5M"
numberUtils.formatPercentage(0.1234);         // "12.34%"

// File sizes
numberUtils.formatBytes(1048576);             // "1 MB"
numberUtils.formatFileSize(1024);             // "1 KB"
```

#### Mathematical Operations
```typescript
// Utilities
numberUtils.roundTo(3.14159, 2);              // 3.14
numberUtils.clamp(15, 0, 10);                 // 10
numberUtils.randomBetween(1, 10);             // Random number 1-10
numberUtils.average([1, 2, 3, 4, 5]);         // 3
numberUtils.sum([1, 2, 3, 4, 5]);             // 15

// Checks
numberUtils.isEven(4);                        // true
numberUtils.isOdd(3);                         // true
numberUtils.isValidNumber(123);               // true
numberUtils.toOrdinal(1);                     // "1st"
```

### ✅ Validation Utilities

#### Basic Validation
```typescript
import { validationUtils } from "@workspace/helpers/validation";

// String checks
validationUtils.isEmpty(" ");                 // true
validationUtils.isAlpha("Hello");             // true
validationUtils.isAlphanumeric("Hello123");   // true
validationUtils.isNumeric("123");             // true

// Length validation
validationUtils.hasMinLength("hello", 3);     // true
validationUtils.hasMaxLength("hello", 10);    // true
validationUtils.isInRange(5, 1, 10);          // true
```

#### Format Validation
```typescript
// Email & URL
validationUtils.isValidEmail("test@example.com");     // true
validationUtils.isValidUrl("https://example.com");    // true

// Phone & Address
validationUtils.isValidPhoneNumber("+1-555-123-4567"); // true
validationUtils.isValidIPv4("192.168.1.1");           // true
validationUtils.isValidPostalCode("12345", "US");      // true

// Financial
validationUtils.isValidCreditCard("4532015112830366"); // true

// Technical
validationUtils.isValidHexColor("#FF0000");            // true
validationUtils.isValidJSON('{"name": "John"}');       // true
validationUtils.isValidSlug("my-blog-post");           // true
```

#### Security
```typescript
validationUtils.isStrongPassword("SecurePass123");     // true
```

### 📅 DateTime Utilities

#### Formatting
```typescript
import { datetimeUtils } from "@workspace/helpers/datetime";

const date = new Date("2024-01-15T10:30:00Z");

// Basic formatting
datetimeUtils.formatDate(date);                        // "2024-01-15"
datetimeUtils.formatTime(date);                        // "10:30"
datetimeUtils.formatDateTime(date);                    // "2024-01-15 10:30"
datetimeUtils.formatRelativeTime(date);                // "2 hours ago"

// Custom formats
datetimeUtils.formatDate(date, "dd/MM/yyyy");          // "15/01/2024"
datetimeUtils.formatTime(date, "h:mm a");              // "10:30 AM"
```

#### Date Creation & Manipulation
```typescript
// Date creation
datetimeUtils.now();                                   // Current date
datetimeUtils.today();                                 // Today at 00:00:00
datetimeUtils.tomorrow();                              // Tomorrow at 00:00:00
datetimeUtils.yesterday();                             // Yesterday at 00:00:00

// Date manipulation
datetimeUtils.addDaysToDate(date, 7);                  // Add 7 days
datetimeUtils.addMonthsToDate(date, 2);                // Add 2 months
datetimeUtils.addYearsToDate(date, 1);                 // Add 1 year
```

#### Date Analysis
```typescript
// Comparisons
datetimeUtils.isDateBefore(date1, date2);              // true/false
datetimeUtils.isDateAfter(date1, date2);               // true/false
datetimeUtils.isSameDayAs(date1, date2);               // true/false

// Status checks
datetimeUtils.isPast(date);                            // true/false
datetimeUtils.isFuture(date);                          // true/false
datetimeUtils.isToday(date);                           // true/false
datetimeUtils.isValidDate(date);                       // true/false

// Calculations
datetimeUtils.getDaysDifference(date1, date2);         // Number of days
datetimeUtils.getAge(birthDate);                       // Age in years
```

#### Date Boundaries
```typescript
// Get boundaries
datetimeUtils.getStartOfDay(date);                     // Date at 00:00:00
datetimeUtils.getEndOfDay(date);                       // Date at 23:59:59
datetimeUtils.getStartOfWeek(date);                    // Start of week
datetimeUtils.getStartOfMonth(date);                   // Start of month
datetimeUtils.getStartOfYear(date);                    // Start of year
```

### 🔧 Constants

```typescript
import { constants } from "@workspace/helpers/constants";

// HTTP Status Codes
constants.HTTP_STATUS.OK;                              // 200
constants.HTTP_STATUS.NOT_FOUND;                       // 404
constants.HTTP_STATUS.INTERNAL_SERVER_ERROR;           // 500

// Regex Patterns
constants.REGEX_PATTERNS.EMAIL;                        // Email regex
constants.REGEX_PATTERNS.PHONE;                        // Phone regex
constants.REGEX_PATTERNS.UUID;                         // UUID regex

// File Sizes
constants.FILE_SIZES.MB;                               // 1048576
constants.FILE_SIZES.MAX_UPLOAD_SIZE;                  // 10MB in bytes

// Time Constants
constants.TIME_CONSTANTS.HOUR;                         // 3600000 ms
constants.TIME_CONSTANTS.DAY;                          // 86400000 ms

// Date Formats
constants.DATE_FORMATS.ISO;                            // "yyyy-MM-dd"
constants.DATE_FORMATS.US;                             // "MM/dd/yyyy"
constants.DATE_FORMATS.READABLE;                       // "MMM dd, yyyy"

// UI Constants
constants.BREAKPOINTS.MD;                              // 768
constants.COLORS.PRIMARY;                              // "#3B82F6"
constants.DEFAULTS.DEBOUNCE_DELAY;                     // 300ms

// API Constants
constants.API_CONSTANTS.DEFAULT_PAGE_SIZE;             // 20
constants.API_CONSTANTS.DEFAULT_TIMEOUT;               // 30000ms

// Storage Keys
constants.STORAGE_KEYS.USER_TOKEN;                     // "user_token"
constants.STORAGE_KEYS.THEME;                          // "theme"
```

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 🏗️ Building

```bash
# Build the package
npm run build

# Development build with watch
npm run dev
```

## 📁 Project Structure

```
src/
├── string/           # String manipulation utilities
├── number/           # Number formatting and math utilities
├── validation/       # Input validation functions
├── datetime/         # Date and time utilities
├── constants/        # Application constants
└── index.ts         # Main entry point
```

## 🔧 Framework Integration

### React Example

```tsx
import { stringUtils, numberUtils, datetimeUtils } from "@workspace/helpers";

function UserProfile({ user }) {
  return (
    <div>
      <h1>{stringUtils.capitalize(user.name)}</h1>
      <p>Joined: {datetimeUtils.formatRelativeTime(user.createdAt)}</p>
      <p>Balance: {numberUtils.formatCurrency(user.balance)}</p>
      <div>
        <img 
          alt={stringUtils.getInitials(user.name)}
          src={user.avatar || `/api/avatar/${stringUtils.slugify(user.name)}`}
        />
      </div>
    </div>
  );
}
```

### Form Validation Example

```tsx
import { validationUtils } from "@workspace/helpers";

function ContactForm() {
  const validateForm = (data) => {
    const errors = {};
    
    if (!validationUtils.isValidEmail(data.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (!validationUtils.hasMinLength(data.message, 10)) {
      errors.message = "Message must be at least 10 characters";
    }
    
    if (data.phone && !validationUtils.isValidPhoneNumber(data.phone)) {
      errors.phone = "Please enter a valid phone number";
    }
    
    return errors;
  };
  
  // ... form implementation
}
```

## 🤝 Best Practices

1. **Pure Functions**: All helper functions are pure - they don't modify inputs and return consistent outputs for the same inputs.

2. **Error Handling**: Functions gracefully handle edge cases like null, undefined, and invalid inputs.

3. **TypeScript**: Full TypeScript support with proper type definitions.

4. **Tree Shaking**: Import only what you need to keep bundle size minimal.

5. **Testing**: Comprehensive test coverage ensures reliability.

## 🚀 Performance Tips

- Import specific modules to enable tree shaking:
  ```typescript
  // ✅ Good - tree shakeable
  import { stringUtils } from "@workspace/helpers/string";
  
  // ❌ Avoid - imports everything
  import { stringUtils } from "@workspace/helpers";
  ```

- Use constants for repeated regex patterns:
  ```typescript
  import { constants } from "@workspace/helpers/constants";
  
  // ✅ Good - reuse compiled regex
  constants.REGEX_PATTERNS.EMAIL.test(email);
  ```

## 📄 License

MIT License - feel free to use in your projects! 🎉 