export type User = {
    uuid: string,
    email: string|null
}

export type contextType = {
    author: {
        uuid: string,
        email: string
    } | null,
    loading: boolean
}

