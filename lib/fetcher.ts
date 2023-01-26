export interface IFetcher {
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
}

export const fetcher = async (config: IFetcher) => {
  let { url, body, params, headers, timeout } = config;

  let abortController: AbortController | null = null;

  if (timeout) {
    abortController = new AbortController();
    setTimeout(() => abortController?.abort(), timeout);
  }

  if (params) {
    url += `?${new URLSearchParams(params).toString()}`;
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
