export function fetchApiServerSideDynamic(
    input: RequestInfo | URL,
    init?: RequestInit
): Promise<Response> {
    let config = init;
    if (init) {
        config = {
            ...init,
            cache: "no-cache",
        };
    }
    return fetch(input);
}
