import { useState, useEffect } from 'react';

interface InProgress {
  [key: string]: any;
}

const inProgress: InProgress = {};

export default function useFetchJsonArray<DataType>(url: string) {
  let [fetchedArray, setFetchedArray] = useState<DataType[]>([]);
  useEffect(() => {
    (async () => {
      if (!inProgress[url]) {
        inProgress[url] = fetch(url).then(url => url.json());
      }
      setFetchedArray(await inProgress[url]);
      delete inProgress[url];
    })();
  }, []);
  return fetchedArray;
}