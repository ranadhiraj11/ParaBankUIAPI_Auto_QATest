import { loadAccountId } from './accountIdStore';

export function getRequiredAccountId(): string {
  const accountId = loadAccountId();
  if (!accountId) {
    throw new Error('No accountId found. Please run "Create new savings account" test first.');
  }
  return accountId;
}
