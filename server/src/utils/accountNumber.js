export function generateAccountNumber() {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(100000 + Math.random() * 900000).toString();
  return `${timestamp}${random}`;
}
