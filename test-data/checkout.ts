// Test data for checkout characterization and data-driven tests.
// Every row is accepted: the order completes (current behaviour, characterization).
// No zip or name rule has been specified; see the test strategy. When one is,
// add the cases it should reject as a separate list with its own test loop.

import type { CustomerInfo } from '../pages/CheckoutStepOnePage';

// A customer whose details the shop accepts. Used wherever a test needs a valid order.
export const validCustomer: CustomerInfo = { firstName: 'Mary', lastName: 'Smith', zip: '12345' };

// Each case starts from validCustomer and overrides only the field under test.
export type CheckoutCase = CustomerInfo & {
  name: string;
};

export const checkoutCases: CheckoutCase[] = [
  // Name fields (equivalence partitioning).
  { name: 'plain names', ...validCustomer },
  { name: 'accented names', ...validCustomer, firstName: 'José', lastName: 'Ángel' },
  { name: 'names with special characters', ...validCustomer, firstName: 'Mary#', lastName: 'Smith$' },

  // Zip code (equivalence partitioning and exploratory boundaries).
  // The site defines no zip boundary, so the one-digit and 500-character cases
  // are exploratory, not textbook boundary value analysis.
  { name: 'five-digit zip', ...validCustomer },
  { name: 'zip with letters', ...validCustomer, zip: 'abcde' },
  { name: 'zip with special characters', ...validCustomer, zip: '!@#$%' },
  { name: 'zip with letters and digits', ...validCustomer, zip: '1234a' },
  { name: 'one-digit zip', ...validCustomer, zip: '1' },
  { name: '500-character zip', ...validCustomer, zip: '1'.repeat(500) },
];
