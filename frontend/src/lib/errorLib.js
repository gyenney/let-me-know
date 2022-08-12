export function onError(error) {
    let message = error.toString();

    // Handle Auth errors.
    if (!(error instanceof Error) && error.message) {
        messsage = error.message;
    }

    alert(message);
}