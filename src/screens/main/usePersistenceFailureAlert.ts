import { useEffect, useRef, useSyncExternalStore } from "react";

import {
  getLatestPersistenceAlert,
  subscribeToPersistenceAlerts,
} from "../../services/persistenceAlerts";
import type { TranslateFn } from "./shared";

export function usePersistenceFailureAlert(
  showToast: (message: string, onRetry?: undefined, tone?: "danger") => void,
  t: TranslateFn,
) {
  const alert = useSyncExternalStore(
    subscribeToPersistenceAlerts,
    getLatestPersistenceAlert,
    getLatestPersistenceAlert,
  );
  const shownAlertIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!alert || shownAlertIdRef.current === alert.id) {
      return;
    }

    shownAlertIdRef.current = alert.id;
    showToast(t("persistenceFailure"), undefined, "danger");
  }, [alert, showToast, t]);
}
