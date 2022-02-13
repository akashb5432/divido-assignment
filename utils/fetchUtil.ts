/* Utility for fetch.
Please use this instead of axios or any other library for fetching anything from server,
if using a rest API */

const fetchUtil = async (
  url: string,
  method: string,
  body: object,
) => {
  let options = {};
  if (method === "GET") {
    options = {
          method,
          headers: requestHeaders(),
        };
  } else {
    options = {
      method,
      headers: requestHeaders(),
      body: JSON.stringify(body),
    };
  }
  const res = await fetch(url, options);
  return await parseStatus(res.status, res);
};

const parseStatus = (status: any, res: any) => {
  return new Promise((resolve, reject) => {
    if (status >= 200 && status < 300) {
      if (res.url.indexOf(".html") > -1) {
        return resolve(res);
      }
      res.json().then((response: any) => resolve(response));
    } else {
      res.json().then((response: any) => reject(response));
    }
  });
};

const requestHeaders = () => {
  return {
        "Content-Type": "application/json",
      };
};

export default fetchUtil;