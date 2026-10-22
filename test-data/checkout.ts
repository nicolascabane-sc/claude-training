// Test data for checkout characterization and data-driven tests.
// Expected values are documented decisions; see the test strategy.
// 'accepted': the order completes (current behaviour, characterization).
// 'rejected': checkout stays on step one with a required-field or validation error.
// No row is currently 'rejected', because no zip or name rule has been specified.

export type CheckoutCase = {
  id: string;
  description: string;
  firstName: string;
  lastName: string;
  zip: string;
  expected: 'accepted' | 'rejected';
};

export const checkoutCases: CheckoutCase[] = [
  // Risk S5: name fields (equivalence partitioning).
  { id: 'TC-S5-01', description: 'plain letters in first and last name are accepted', firstName: 'Mary', lastName: 'Smith', zip: '12345', expected: 'accepted' },
  { id: 'TC-S5-02', description: 'accented letters in first and last name are accepted', firstName: 'José', lastName: 'Ángel', zip: '12345', expected: 'accepted' },
  { id: 'TC-S5-03', description: 'special characters in first and last name are accepted (characterization)', firstName: 'Mary#', lastName: 'Smith$', zip: '12345', expected: 'accepted' },

  // Risk S2: zip code (equivalence partitioning and exploratory boundaries).
  // The site defines no zip boundary, so TC-S2-05 and TC-S2-06 are exploratory, not textbook BVA.
  { id: 'TC-S2-01', description: 'a numeric five-digit zip is accepted', firstName: 'Mary', lastName: 'Smith', zip: '12345', expected: 'accepted' },
  { id: 'TC-S2-02', description: 'letters in the zip are accepted (characterization)', firstName: 'Mary', lastName: 'Smith', zip: 'abcde', expected: 'accepted' },
  { id: 'TC-S2-03', description: 'special characters in the zip are accepted (characterization)', firstName: 'Mary', lastName: 'Smith', zip: '!@#$%', expected: 'accepted' },
  { id: 'TC-S2-04', description: 'mixed letters and digits in the zip are accepted (characterization)', firstName: 'Mary', lastName: 'Smith', zip: '1234a', expected: 'accepted' },
  { id: 'TC-S2-05', description: 'a one-digit zip is accepted (exploratory boundary, characterization)', firstName: 'Mary', lastName: 'Smith', zip: '1', expected: 'accepted' },
  { id: 'TC-S2-06', description: 'a 500-character zip is accepted (exploratory boundary, characterization)', firstName: 'Mary', lastName: 'Smith', zip: '1'.repeat(500), expected: 'accepted' },
];
