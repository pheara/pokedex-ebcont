export interface SuspenseResource<T> {
  read: () => T;
}
/**
 * adapted (despite warning not to do so[1]) from:
 * https://codesandbox.io/s/stupefied-meadow-hl3z6 >> fakeAPi.js >> wrapPromise
 * [1]: "Real implementations [of suspense integration contracts] can be significantly more complex."
 * @return a resource as required by react suspense / concurrent-mode
 */
export function wrapPromise<T>(promise: Promise<T>): { read: () => T } {
  let status = "pending";
  let result: T;
  let error: Error;
  const suspender = promise.then(
    r => {
      status = "success";
      result = r;
    },
    e => {
      status = "error";
      error = e;
    }
  );
  return {
    read(): T {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw error;
      } /*status === "success"*/ else {
        return result;
      }
    },
  };
}

export function delay(ms: number): Promise<undefined> {
  return new Promise<undefined>(resolve => setTimeout(() => resolve(), ms));
}
