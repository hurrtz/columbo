export interface PersistenceAlert {
  id: number;
  operation: string;
  scope: "conversations" | "settings";
}

let latestAlert: PersistenceAlert | null = null;
let nextAlertId = 1;
const listeners = new Set<() => void>();

export function reportPersistenceAlert(
  scope: PersistenceAlert["scope"],
  operation: string,
) {
  latestAlert = { id: nextAlertId, operation, scope };
  nextAlertId += 1;
  listeners.forEach((listener) => listener());
}

export function getLatestPersistenceAlert() {
  return latestAlert;
}

export function subscribeToPersistenceAlerts(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
