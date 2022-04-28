export interface LoginModel {
    userName?: string;
    password?: string;
    organizationId?: string;
    code?: string;
    rememberMe?: boolean;
    token?: string;
    isMobileBrowser?: boolean;
}
