// Test data for checkout characterization and data-driven tests.
// Expected values are documented decisions; see the test strategy.
// 'expected' is 'accepted' for characterization cases, which document current behaviour.

export type CheckoutCase = {
  id: string;
  description: string;
  firstName: string;
  lastName: string;
  zip: string;
  expected: 'accepted';
};

export const checkoutCases: CheckoutCase[] = [
  { id: 'TC-S5-01', description: 'plain letters', firstName: 'Mary', lastName: 'Smith', zip: '12345', expected: 'accepted' },
  { id: 'TC-S5-02', description: 'accented letters', firstName: 'José', lastName: 'Ángel', zip: '12345', expected: 'accepted' },
  { id: 'TC-S5-03', description: 'special characters in names', firstName: 'Mary#', lastName: 'Smith$', zip: '12345', expected: 'accepted' },
  { id: 'TC-S2-02', description: 'letters in zip', firstName: 'Mary', lastName: 'Smith', zip: 'abcde', expected: 'accepted' },
  { id: 'TC-S2-03', description: 'special characters in zip', firstName: 'Mary', lastName: 'Smith', zip: '!@#$%', expected: 'accepted' },
  { id: 'TC-S2-04', description: 'mixed letters and digits in zip', firstName: 'Mary', lastName: 'Smith', zip: '1234a', expected: 'accepted' },
  { id: 'TC-S2-05', description: 'short zip (exploratory)', firstName: 'Mary', lastName: 'Smith', zip: '1', expected: 'accepted' },
];
