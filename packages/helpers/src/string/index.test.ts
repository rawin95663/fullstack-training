import { describe, it, expect } from "vitest";
import {
  capitalize,
  truncate,
  truncateMiddle,
  camelCase,
  kebabCase,
  snakeCase,
  pascalCase,
  removeWhitespace,
  slugify,
  getInitials,
  maskString,
  reverse,
  wordCount,
  stripHtml,
  escapeHtml,
  normalizeErrorMessage,
  normalizeTxnError,
} from "./index";

describe("String Utilities", () => {
  describe("capitalize", () => {
    it("should capitalize the first letter", () => {
      expect(capitalize("hello")).toBe("Hello");
      expect(capitalize("HELLO")).toBe("HELLO");
      expect(capitalize("hello world")).toBe("Hello world");
    });

    it("should handle empty strings", () => {
      expect(capitalize("")).toBe("");
    });

    it("should handle single character", () => {
      expect(capitalize("a")).toBe("A");
    });
  });

  describe("truncate", () => {
    it("should truncate string to specified length", () => {
      expect(truncate("Hello World", 5)).toBe("Hello...");
      expect(truncate("Hello World", 5, "!")).toBe("Hello!");
    });

    it("should not truncate if string is shorter", () => {
      expect(truncate("Hi", 5)).toBe("Hi");
    });

    it("should handle empty strings", () => {
      expect(truncate("", 5)).toBe("");
    });
  });

  describe("truncateMiddle", () => {
    it("should truncate middle part of string", () => {
      expect(truncateMiddle("0x1234567890abcdef", 4, 4)).toBe("0x12...cdef");
      expect(truncateMiddle("verylongaddress", 3, 3)).toBe("ver...ess");
    });

    it("should not truncate if string is short enough", () => {
      expect(truncateMiddle("short", 4, 4)).toBe("short");
    });
  });

  describe("camelCase", () => {
    it("should convert to camelCase", () => {
      expect(camelCase("hello world")).toBe("helloWorld");
      expect(camelCase("hello-world")).toBe("helloWorld");
      expect(camelCase("hello_world")).toBe("helloWorld");
      expect(camelCase("Hello World")).toBe("helloWorld");
    });
  });

  describe("kebabCase", () => {
    it("should convert to kebab-case", () => {
      expect(kebabCase("helloWorld")).toBe("hello-world");
      expect(kebabCase("Hello World")).toBe("hello-world");
      expect(kebabCase("hello_world")).toBe("hello-world");
    });
  });

  describe("snakeCase", () => {
    it("should convert to snake_case", () => {
      expect(snakeCase("helloWorld")).toBe("hello_world");
      expect(snakeCase("Hello World")).toBe("hello_world");
      expect(snakeCase("hello-world")).toBe("hello_world");
    });
  });

  describe("pascalCase", () => {
    it("should convert to PascalCase", () => {
      expect(pascalCase("hello world")).toBe("HelloWorld");
      expect(pascalCase("hello-world")).toBe("HelloWorld");
      expect(pascalCase("hello_world")).toBe("HelloWorld");
    });
  });

  describe("removeWhitespace", () => {
    it("should remove all whitespace", () => {
      expect(removeWhitespace("hello world")).toBe("helloworld");
      expect(removeWhitespace(" h e l l o ")).toBe("hello");
      expect(removeWhitespace("hello\tworld\n")).toBe("helloworld");
    });
  });

  describe("slugify", () => {
    it("should create URL-friendly slugs", () => {
      expect(slugify("Hello World!")).toBe("hello-world");
      expect(slugify("Café & Restaurant")).toBe("cafe-restaurant");
      expect(slugify("  Multiple   Spaces  ")).toBe("multiple-spaces");
      expect(slugify("Special@#$%Characters")).toBe("specialcharacters");
    });
  });

  describe("getInitials", () => {
    it("should extract initials from names", () => {
      expect(getInitials("John Doe")).toBe("JD");
      expect(getInitials("Mary Jane Watson", 3)).toBe("MJW");
      expect(getInitials("SingleName")).toBe("S");
      expect(getInitials("")).toBe("");
    });
  });

  describe("maskString", () => {
    it("should mask string with asterisks", () => {
      expect(maskString("1234567890", 4)).toBe("******7890");
      expect(maskString("secret", 2)).toBe("****et");
      expect(maskString("short", 10)).toBe("short");
    });

    it("should use custom mask character", () => {
      expect(maskString("password", 4, "x")).toBe("xxxxword");
    });
  });

  describe("reverse", () => {
    it("should reverse strings", () => {
      expect(reverse("hello")).toBe("olleh");
      expect(reverse("12345")).toBe("54321");
      expect(reverse("")).toBe("");
    });
  });

  describe("wordCount", () => {
    it("should count words correctly", () => {
      expect(wordCount("hello world")).toBe(2);
      expect(wordCount("  multiple   spaces  ")).toBe(2);
      expect(wordCount("single")).toBe(1);
      expect(wordCount("")).toBe(0);
      expect(wordCount("   ")).toBe(0);
    });
  });

  describe("stripHtml", () => {
    it("should remove HTML tags", () => {
      expect(stripHtml("<p>Hello <strong>World</strong></p>")).toBe(
        "Hello World"
      );
      expect(stripHtml("<div><span>Test</span></div>")).toBe("Test");
      expect(stripHtml("No tags here")).toBe("No tags here");
    });
  });

  describe("escapeHtml", () => {
    it("should escape HTML special characters", () => {
      expect(escapeHtml("<script>alert('xss')</script>")).toBe(
        "&lt;script&gt;alert(&#x27;xss&#x27;)&lt;/script&gt;"
      );
      expect(escapeHtml("Hello & World")).toBe("Hello &amp; World");
      expect(escapeHtml('"Hello"')).toBe("&quot;Hello&quot;");
    });
  });

  describe("normalizeErrorMessage", () => {
    it("should extract message from error response", () => {
      const errorWithResponse = {
        response: {
          data: {
            message: "Server error",
          },
        },
      };
      expect(normalizeErrorMessage(errorWithResponse)).toBe("Server error");
    });

    it("should return error message directly", () => {
      const simpleError = {
        message: "Simple error",
      };
      expect(normalizeErrorMessage(simpleError)).toBe("Simple error");
    });
  });

  describe("normalizeTxnError", () => {
    it("should handle insufficient balance errors", () => {
      const balanceError = {
        message: "Transaction exceeds the balance of account",
      };
      expect(normalizeTxnError(balanceError)).toBe("Insufficient balance");
    });

    it("should handle user denial errors", () => {
      const denialError = {
        message: "User denied transaction signature",
      };
      expect(normalizeTxnError(denialError)).toBe(
        "User denied transaction signature"
      );
    });

    it("should handle response errors", () => {
      const responseError = {
        response: {
          data: {
            message: "Network error",
          },
        },
      };
      expect(normalizeTxnError(responseError)).toBe("Network error");
    });
  });
});
