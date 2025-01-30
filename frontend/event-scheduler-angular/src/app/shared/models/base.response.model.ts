export interface IBaseResponse<T> {
    result: T;
    isSuccess: boolean;
    message: string;
}
