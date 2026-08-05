import {
  GetUsersParams,
  UserListState,
  UserSortField,
} from "n@/types/user";

export const DEFAULT_USER_LIST_STATE: UserListState = {
  page: 1,
  limit: 10,
  q: "",
  sortBy: "firstName",
  order: "asc",
};

const SORT_FIELDS: UserSortField[] = [
  "firstName",
  "lastName",
  "age",
  "email",
  "username",
  "role",
];

const isSortField = (value: string): value is UserSortField =>
  SORT_FIELDS.includes(value as UserSortField);

export const parseUserListState = (
  searchParams: URLSearchParams
): UserListState => {
  const page = Math.max(1, Number(searchParams.get("page") ?? 1) || 1);
  const limit = Math.max(1, Number(searchParams.get("limit") ?? 10) || 10);
  const q = searchParams.get("q") ?? "";
  const sortByParam =
    searchParams.get("sortBy") ?? DEFAULT_USER_LIST_STATE.sortBy;
  const sortBy = isSortField(sortByParam)
    ? sortByParam
    : DEFAULT_USER_LIST_STATE.sortBy;
  const orderParam = searchParams.get("order");
  const order = orderParam === "desc" ? "desc" : "asc";

  return { page, limit, q, sortBy, order };
};

export const buildUserListQueryString = (state: UserListState): string => {
  const params = new URLSearchParams();

  if (state.page > 1) {
    params.set("page", String(state.page));
  }

  if (state.limit !== DEFAULT_USER_LIST_STATE.limit) {
    params.set("limit", String(state.limit));
  }

  if (state.q) {
    params.set("q", state.q);
  }

  if (state.sortBy !== DEFAULT_USER_LIST_STATE.sortBy) {
    params.set("sortBy", state.sortBy);
  }

  if (state.order !== DEFAULT_USER_LIST_STATE.order) {
    params.set("order", state.order);
  }

  return params.toString();
};

export const buildUsersListPath = (state: UserListState): string => {
  const query = buildUserListQueryString(state);
  return query ? `/users?${query}` : "/users";
};

export const userListStateToApiParams = (
  state: UserListState
): GetUsersParams => {
  const params: GetUsersParams = {
    limit: state.limit,
    skip: (state.page - 1) * state.limit,
    sortBy: state.sortBy,
    order: state.order,
  };

  if (state.q.trim()) {
    params.q = state.q.trim();
  }

  return params;
};
