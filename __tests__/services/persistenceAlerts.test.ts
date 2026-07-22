import {
  getLatestPersistenceAlert,
  reportPersistenceAlert,
  subscribeToPersistenceAlerts,
} from "../../src/services/persistenceAlerts";

describe("persistence alerts", () => {
  it("publishes a non-sensitive storage failure signal", () => {
    const listener = jest.fn();
    const unsubscribe = subscribeToPersistenceAlerts(listener);

    reportPersistenceAlert("conversations", "save");

    expect(listener).toHaveBeenCalledTimes(1);
    expect(getLatestPersistenceAlert()).toEqual(
      expect.objectContaining({
        operation: "save",
        scope: "conversations",
      }),
    );
    unsubscribe();
  });
});
