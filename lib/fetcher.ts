export interface IFetcher extends Request {
  params?: {
    [key: string]: string;
  };
  timeout?: number;
}

export const fetcher = async (config: IFetcher) => {
  const { url, body, params, headers, timeout } = config;

  let abortController: AbortController | null = null;
  if (timeout) {
    abortController = new AbortController();
    setTimeout(() => abortController?.abort(), timeout);
  }

  const response = await fetch(
    params ? url + `?${new URLSearchParams(params).toString()}` : url,
    {
      ...config,
      body: body && JSON.stringify(body),
      headers: {
        ...(body && { "Content-Type": "application/json" }),
        ...headers,
      },
      signal: abortController && abortController.signal,
    },
  );

  if (response?.ok) {
    const json = await response.json();
    return json;
  } else {
    const json = await response.json();
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number;
      };
      error.status = response.status;
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
