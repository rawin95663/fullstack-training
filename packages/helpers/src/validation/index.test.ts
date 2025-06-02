import { describe, it, expect } from "vitest";
import {
  isValidEmail,
  isValidUrl,
  isEmpty,
  isStrongPassword,
  isValidPhoneNumber,
  isValidCreditCard,
  isValidIPv4,
  isValidHexColor,
  isAlpha,
  isAlphanumeric,
  isNumeric,
  isValidJSON,
  isValidPostalCode,
  hasMinLength,
  hasMaxLength,
  isInRange,
  isValidSlug,
} from "./index";

describe("Validation Utilities", () => {
  describe("isValidEmail", () => {
    it("should validate email addresses", () => {
      expect(isValidEmail("test@example.com")).toBe(true);
      expect(isValidEmail("user.name+tag@domain.co.uk")).toBe(true);
      expect(isValidEmail("invalid.email")).toBe(false);
      expect(isValidEmail("@domain.com")).toBe(false);
      expect(isValidEmail("")).toBe(false);
    });
  });

  describe("isValidUrl", () => {
    it("should validate URLs", () => {
      expect(isValidUrl("https://example.com")).toBe(true);
      expect(isValidUrl("http://localhost:3000")).toBe(true);
      expect(isValidUrl("ftp://files.example.com")).toBe(true);
      expect(isValidUrl("invalid-url")).toBe(false);
      expect(isValidUrl("")).toBe(false);
    });
  });

  describe("isEmpty", () => {
    it("should check if value is empty", () => {
      expect(isEmpty("")).toBe(true);
      expect(isEmpty("   ")).toBe(true);
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
      expect(isEmpty("hello")).toBe(false);
      expect(isEmpty(" hello ")).toBe(false);
    });
  });

  describe("isStrongPassword", () => {
    it("should validate strong passwords", () => {
      expect(isStrongPassword("Password123")).toBe(true);
      expect(isStrongPassword("SecurePass1")).toBe(true);
      expect(isStrongPassword("password")).toBe(false); // no uppercase or number
      expect(isStrongPassword("PASSWORD")).toBe(false); // no lowercase or number
      expect(isStrongPassword("Pass1")).toBe(false); // too short
      expect(isStrongPassword("")).toBe(false);
    });
  });

  describe("isValidPhoneNumber", () => {
    it("should validate phone numbers", () => {
      expect(isValidPhoneNumber("1234567890")).toBe(true);
      expect(isValidPhoneNumber("+1 (555) 123-4567")).toBe(true);
      expect(isValidPhoneNumber("555-123-4567")).toBe(true);
      expect(isValidPhoneNumber("123")).toBe(false); // too short
      expect(isValidPhoneNumber("")).toBe(false);
    });
  });

  describe("isValidCreditCard", () => {
    it("should validate credit card numbers using Luhn algorithm", () => {
      expect(isValidCreditCard("4532015112830366")).toBe(true); // Valid Visa
      expect(isValidCreditCard("4532-0151-1283-0366")).toBe(true); // With dashes
      expect(isValidCreditCard("1234567890123456")).toBe(false); // Invalid
      expect(isValidCreditCard("123")).toBe(false); // Too short
      expect(isValidCreditCard("")).toBe(false);
    });
  });

  describe("isValidIPv4", () => {
    it("should validate IPv4 addresses", () => {
      expect(isValidIPv4("192.168.1.1")).toBe(true);
      expect(isValidIPv4("0.0.0.0")).toBe(true);
      expect(isValidIPv4("255.255.255.255")).toBe(true);
      expect(isValidIPv4("256.1.1.1")).toBe(false); // Invalid range
      expect(isValidIPv4("192.168.1")).toBe(false); // Missing octet
      expect(isValidIPv4("")).toBe(false);
    });
  });

  describe("isValidHexColor", () => {
    it("should validate hex color codes", () => {
      expect(isValidHexColor("#FF0000")).toBe(true);
      expect(isValidHexColor("#f00")).toBe(true);
      expect(isValidHexColor("#123456")).toBe(true);
      expect(isValidHexColor("FF0000")).toBe(false); // Missing #
      expect(isValidHexColor("#GG0000")).toBe(false); // Invalid character
      expect(isValidHexColor("")).toBe(false);
    });
  });

  describe("isAlpha", () => {
    it("should check if string contains only alphabetic characters", () => {
      expect(isAlpha("Hello")).toBe(true);
      expect(isAlpha("hello")).toBe(true);
      expect(isAlpha("Hello123")).toBe(false);
      expect(isAlpha("Hello World")).toBe(false);
      expect(isAlpha("")).toBe(false);
    });
  });

  describe("isAlphanumeric", () => {
    it("should check if string contains only alphanumeric characters", () => {
      expect(isAlphanumeric("Hello123")).toBe(true);
      expect(isAlphanumeric("abc")).toBe(true);
      expect(isAlphanumeric("123")).toBe(true);
      expect(isAlphanumeric("Hello 123")).toBe(false);
      expect(isAlphanumeric("Hello!")).toBe(false);
    });
  });

  describe("isNumeric", () => {
    it("should check if string contains only numeric characters", () => {
      expect(isNumeric("123")).toBe(true);
      expect(isNumeric("0")).toBe(true);
      expect(isNumeric("123abc")).toBe(false);
      expect(isNumeric("12.3")).toBe(false);
      expect(isNumeric("")).toBe(false);
    });
  });

  describe("isValidJSON", () => {
    it("should validate JSON strings", () => {
      expect(isValidJSON('{"name": "John"}')).toBe(true);
      expect(isValidJSON("[]")).toBe(true);
      expect(isValidJSON('"string"')).toBe(true);
      expect(isValidJSON("123")).toBe(true);
      expect(isValidJSON("{invalid}")).toBe(false);
      expect(isValidJSON("")).toBe(false);
    });
  });

  describe("isValidPostalCode", () => {
    it("should validate US postal codes", () => {
      expect(isValidPostalCode("12345", "US")).toBe(true);
      expect(isValidPostalCode("12345-6789", "US")).toBe(true);
      expect(isValidPostalCode("1234", "US")).toBe(false);
    });

    it("should validate Canadian postal codes", () => {
      expect(isValidPostalCode("K1A 0A6", "CA")).toBe(true);
      expect(isValidPostalCode("M5V 3L9", "CA")).toBe(true);
      expect(isValidPostalCode("12345", "CA")).toBe(false);
    });

    it("should default to US format", () => {
      expect(isValidPostalCode("12345")).toBe(true);
    });
  });

  describe("hasMinLength", () => {
    it("should check minimum length", () => {
      expect(hasMinLength("hello", 3)).toBe(true);
      expect(hasMinLength("hello", 5)).toBe(true);
      expect(hasMinLength("hi", 3)).toBe(false);
      expect(hasMinLength("", 1)).toBe(false);
    });
  });

  describe("hasMaxLength", () => {
    it("should check maximum length", () => {
      expect(hasMaxLength("hello", 10)).toBe(true);
      expect(hasMaxLength("hello", 5)).toBe(true);
      expect(hasMaxLength("hello world", 5)).toBe(false);
      expect(hasMaxLength("", 5)).toBe(true);
    });
  });

  describe("isInRange", () => {
    it("should check if number is within range", () => {
      expect(isInRange(5, 1, 10)).toBe(true);
      expect(isInRange(1, 1, 10)).toBe(true);
      expect(isInRange(10, 1, 10)).toBe(true);
      expect(isInRange(0, 1, 10)).toBe(false);
      expect(isInRange(11, 1, 10)).toBe(false);
    });
  });

  describe("isValidSlug", () => {
    it("should validate URL-friendly slugs", () => {
      expect(isValidSlug("hello-world")).toBe(true);
      expect(isValidSlug("my-blog-post-123")).toBe(true);
      expect(isValidSlug("single")).toBe(true);
      expect(isValidSlug("Hello-World")).toBe(false); // Uppercase
      expect(isValidSlug("hello_world")).toBe(false); // Underscore
      expect(isValidSlug("hello world")).toBe(false); // Space
      expect(isValidSlug("")).toBe(false);
    });
  });
});
