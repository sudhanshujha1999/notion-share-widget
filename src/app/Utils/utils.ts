const getURLParameter = (qrString: string, paramName: string): string => {
  const qr = qrString.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp(`[\\?&]${paramName}=([^&#]*)`);
  const results = regex.exec(qr);

  return results && results.length > 0
    ? decodeURIComponent(results[1].replace(/\+/g, ' '))
    : '';
};

const setDataToLocalStorage = (key: string, value: string): void => {
  window.localStorage.setItem(key, value);
};

const getDataFromLocalStorage = (key: string) => {
  return window.localStorage.getItem(key);
};

const removeDataFromLocalStorage = (key: string) => {
  return window.localStorage.removeItem(key);
};

// check is development or production mode.
const isDev = (): Boolean => {
  const env = process.env.NODE_ENV;
  return env === 'development';
};

const getTime = (date?: string) => {
  if (!date) return '';

  return new Date(date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });
};

/**
 * @function getChangedValues
 * @description function does a shallow comparison between all the values of
 *  `updatedData` and `prevData` object to return only changed key-value.
 * ---
 * #### Returns - All the key of 2nd param with changed values and new keys (compared to 1st param) are returned
 * ---
 * @param prevData {Object}
 * @param updatedData {Object}
 *
 * @return
 * - Object {...}
 * - empty object {}: in case of no new value found
 */

function getChangedValues(
  prevData: Record<string, any>,
  updatedData: Record<string, any>
): Record<string, any> | null {
  const changedValues: Record<string, any> = {};

  Object.entries(updatedData).forEach(([key, value]) => {
    const prevValue = prevData[key];
    if (!prevValue && !value) return;
    // TODO: Add option for Dropdown and check if value is array / object.
    // eslint-disable-next-line eqeqeq
    if (prevValue != value && value !== undefined) {
      if (prevValue instanceof Date || value instanceof Date) {
        const prevDate = new Date(prevValue);
        prevDate.setSeconds(0);
        prevDate.setMilliseconds(0);
        const newDate = new Date(value);
        newDate.setMilliseconds(0);
        newDate.setSeconds(0);
        if (prevDate.getTime() !== newDate.getTime())
          changedValues[key] = value;
      } else if (prevValue instanceof File || value instanceof File) {
        if (!prevValue || !value) changedValues[key] = value;
        else if (prevValue.name !== value.name) changedValues[key] = value;
        else if (prevValue.lastModified !== value.lastModified)
          changedValues[key] = value;
      } else if (
        prevValue &&
        prevValue.value &&
        prevValue.label &&
        value &&
        value.value &&
        value.label
      ) {
        if (prevValue.value !== value.value) changedValues[key] = value;
      } else changedValues[key] = value;
    }
  });
  if (Object.keys(changedValues).length === 0) return null;
  return changedValues;
}

const getPageName = () => {
  const path = window.location.hash;
  return path
}




const utils = {
  isDev,
  getTime,
  getURLParameter,
  getChangedValues,
  setDataToLocalStorage,
  getDataFromLocalStorage,
  removeDataFromLocalStorage,
  getPageName,
};

export default utils;




