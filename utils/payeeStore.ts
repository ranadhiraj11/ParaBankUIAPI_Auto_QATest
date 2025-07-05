import fs from 'fs';
import path from 'path';

const payeePath = path.join(__dirname, 'payee.json');

export function savePayee(payee: any) {
  fs.writeFileSync(payeePath, JSON.stringify(payee), 'utf-8');
}

export function loadPayee(): any {
  const content = fs.readFileSync(payeePath, 'utf-8');
  return JSON.parse(content);
}