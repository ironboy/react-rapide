import { useState, useEffect } from 'react';

interface InProgress {
  [key: string]: any;
}

const inProgress: InProgress = {};

export default function useFetchJson<DataType>(url: string, options = {}) {
  let [fetchedArray, setFetchedArray] = useState<DataType>();
  useEffect(() => {
    (async () => {
      if (!inProgress[url]) {
        inProgress[url] = fetch(url, options)
          .then(response => response.json());
      }
      setFetchedArray(await inProgress[url]);
      delete inProgress[url];
    })();
  }, []);
  return fetchedArray;
}