import type { RequestHandler } from "@sveltejs/kit"

// TODO: persist in database
let todos: Todo[] = [];

export const get: RequestHandler = () => {
    return {
        status: 200,
        body: todos
    }
}

export const post: RequestHandler<{}, FormData> = (request) => {
    todos.push({
        created_at: new Date(),
        text: request.body.get("text"),
        done: false,
    })

    return {
        // redirect to index
        status: 303,
        headers: {
            location: "/"
        }
    }
}