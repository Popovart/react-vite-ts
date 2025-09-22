export type BaseDto = {
    id: string,
    code: string,
}

export type Dto<T> = T & BaseDto