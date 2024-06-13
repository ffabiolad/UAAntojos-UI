export interface ResponseObject<T> {
    success:boolean;
    data:T|string;
}