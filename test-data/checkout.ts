// Test data for checkout characterization and data-driven tests.
// Every row is accepted: the order completes (current behaviour, characterization).
// No zip or name rule has been specified; see the test strategy. When one is,
// add the cases it should reject as a separate list with its own test loop.

import type { CustomerInfo } from '../pages/CheckoutStepOnePage';

// A customer whose details the shop accepts. Used wherever a test needs a valid order.
export const validCustomer: CustomerInfo = { firstName: 'Mary', lastName: 'Smith', zip: '12345' };

// Each case starts from validCustomer and overrides only the field under test.
export type CheckoutCase = CustomerInfo & {
  id: string;
  description: string;
};

export const checkoutCases: CheckoutCase[] = [
  // Risk S5: name fields (equivalence partitioning).
  { id: 'TC-S5-01', description: 'plain letters in first and last name are accepted', ...validCustomer },
  { id: 'TC-S5-02', description: 'accented letters in first and last name are accepted', ...validCustomer, firstName: 'José', lastName: 'Ángel' },
  { id: 'TC-S5-03', description: 'special characters in first and last name are accepted (characterization)', ...validCustomer, firstName: 'Mary#', lastName: 'Smith$' },

  // Risk S2: zip code (equivalence partitioning and exploratory boundaries).
  // The site defines no zip boundary, so TC-S2-05 and TC-S2-06 are exploratory, not textbook BVA.
  { id: 'TC-S2-01', description: 'a numeric five-digit zip is accepted', ...validCustomer },
  { id: 'TC-S2-02', description: 'letters in the zip are accepted (characterization)', ...validCustomer, zip: 'abcde' },
  { id: 'TC-S2-03', description: 'special characters in the zip are accepted (characterization)', ...validCustomer, zip: '!@#$%' },
  { id: 'TC-S2-04', description: 'mixed letters and digits in the zip are accepted (characterization)', ...validCustomer, zip: '1234a' },
  { id: 'TC-S2-05', description: 'a one-digit zip is accepted (exploratory boundary, characterization)', ...validCustomer, zip: '1' },
  { id: 'TC-S2-06', description: 'a 500-character zip is accepted (exploratory boundary, characterization)', ...validCustomer, zip: '1'.repeat(500) },
];
