export function generatePrivateKey(): string {
  const prefix = "coredump-";
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomPart = "";
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    randomPart += chars[randomIndex];
  }
  return prefix + randomPart;
}
