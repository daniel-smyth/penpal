const fetcher = async (config: {
  url: string;
  method?: string;
  body?: any;
  params?: {
    [key: string]: string;
  };
  headers?: {
    [key: string]: string;
  };
  timeout?: number;
}) => {
  let { url, body, params, headers, timeout } = config;

  if (params) {
    const query = new URLSearchParams(params).toString();
    url += query ? `?${query}` : '';
  }

  let abortController: AbortController | null = null;

  if (timeout) {
    abortController = new AbortController();
    setTimeout(() => abortController?.abort(), 500);
  }

  let response: any = await fetch(url, {
    ...config,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    signal: abortController?.signal || undefined
  });

  if (response?.ok) {
    return await response.json();
  } else {
    response = await response.json();
    throw new Error(response.message || response.error.message);
  }
};

export default fetcher;
