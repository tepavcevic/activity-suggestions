export function Capitalize(activityType) {
  const firstLetter = activityType.slice(0, 1).toUpperCase();
  return `${firstLetter}${activityType.slice(1, activityType.length)}`;
}
