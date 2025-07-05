import fs from 'fs';
import path from 'path';

const accountIdPath = path.resolve(__dirname, 'accountId.txt');

export const saveAccountId = (accountId: string) => {
  fs.writeFileSync(accountIdPath, accountId, 'utf-8');
};

export const loadAccountId = (): string | null => {
  if (fs.existsSync(accountIdPath)) {
    return fs.readFileSync(accountIdPath, 'utf-8').trim();
  }
  return null;
};
