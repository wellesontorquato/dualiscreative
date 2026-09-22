const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.URL ??
  process.env.DEPLOY_PRIME_URL ??
  "http://localhost:3000";


export const siteUrl =
  rawSiteUrl.replace(
    /\/+$/,
    "",
  );


export function absoluteUrl(
  path:
    string,
) {

  const normalizedPath =
    path.startsWith("/")
      ? path
      : `/${path}`;


  return new URL(
    normalizedPath,
    `${siteUrl}/`,
  ).toString();
}
