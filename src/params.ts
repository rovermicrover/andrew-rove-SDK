import { IIndexCallArguments } from "./types";

export function paramsToString(value: any): string | undefined {
  return value === undefined ? undefined : String(value);
}

function encodeURIForParamValue(
  value: string | string[] | undefined | null
): string | undefined | null {
  if (value === undefined) {
    return undefined;
  }

  if (value === null) {
    return null;
  }

  if (Array.isArray(value)) {
    return value.map(encodeURIComponent).join(",");
  }

  return encodeURIComponent(value);
}

export function paramKeyValueToString(
  key: string,
  value: string | undefined | null
): string {
  if (value === undefined) {
    return "";
  }

  if (value === null) {
    return key;
  }

  return `${key}=${value}`;
}

// The URL Search Params for this API are non standard, or at least do not align with URLSearchParams class and thus axios.
// Thus the custom code to allow for URL Search Param keys without values.
export function indexArgumentsToSearchParams({
  limit,
  page,
  offset,
  sort,
  match,
  notMatch,
  include,
  exclude,
  exists,
  notExists,
  lessThan,
  greaterThan,
  lessThanOrEqual,
  greaterThanOrEqual,
}: IIndexCallArguments): string {
  const params: { [key: string]: string | undefined | null } = {
    limit: paramsToString(limit),
    page: paramsToString(page),
    offset: paramsToString(offset),
  };

  if (sort && Object.keys(sort).length) {
    params.sort = Object.entries(sort)
      .reduce((r, [key, value]) => {
        r.push(`${key}:${value}`);
        return r;
      }, [] as string[])
      .join(",");
  }

  Object.entries(match || {}).forEach(([key, value]) => {
    params[key] = encodeURIForParamValue(value);
  });
  Object.entries(notMatch || {}).forEach(([key, value]) => {
    params[`${key}!`] = encodeURIForParamValue(value);
  });

  Object.entries(include || {}).forEach(([key, value]) => {
    params[key] = encodeURIForParamValue(value);
  });
  Object.entries(exclude || {}).forEach(([key, value]) => {
    params[`${key}!`] = encodeURIForParamValue(value);
  });

  (exists || []).forEach((key) => {
    params[key] = null;
  });
  (notExists || []).forEach((key) => {
    params[`!${key}`] = null;
  });

  Object.entries(lessThan || {}).forEach(([key, value]) => {
    params[`${key}<${value}`] = null;
  });
  Object.entries(greaterThan || {}).forEach(([key, value]) => {
    params[`${key}>${value}`] = null;
  });

  Object.entries(lessThanOrEqual || {}).forEach(([key, value]) => {
    params[`${key}<=${value}`] = null;
  });
  Object.entries(greaterThanOrEqual || {}).forEach(([key, value]) => {
    params[`${key}>=${value}`] = null;
  });

  return Object.entries(params)
    .map(([k, v]) => paramKeyValueToString(k, v))
    .filter(Boolean)
    .join("&");
}
