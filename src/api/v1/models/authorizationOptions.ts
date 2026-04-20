export interface AuthorizationOptions {
    hasRole: Array<"manager" | "employee" | "customer">;
    allowSameUser?: boolean;
}