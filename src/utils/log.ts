const showLogs = false;

export function debuginfo(message: string) {
  if (showLogs) console.log(message);
}
