const showLogs = true;

export function debuginfo(message: string) {
  if (showLogs) console.log(message);
}
