export function indexRoute() {
  return `/`;
}

export function sampleNoAuthRoute() {
  return `/sample/no-auth`;
}

export function samplePostListPageRoute() {
  return `/sample/posts`;
}

export function sampleDevToolsPageRoute() {
  return `/sample/dev-tools`;
}

export function sampleUserDetailRoute(id: string) {
  return `/sample/users/${id}`;
}
