const fetcher = async (config: {
  url: string;
  method: string;
  body?: any;
  timeout?: number;
}) => {
  const { url, body, timeout } = config;

  let abortController: AbortController | null = null;

  if (timeout) {
    abortController = new AbortController();
    setTimeout(() => abortController?.abort(), 500);
  }

  let response: any = await fetch(url, {
    ...config,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      'Content-Type': 'application/json'
    },
    signal: abortController?.signal || undefined
  });

  if (response?.ok) {
    return await response.json();
  } else {
    response = await response.json();
    throw new Error(response.message);
  }
};

export default fetcher;
