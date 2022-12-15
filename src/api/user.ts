const azureUri = "https://uurde-api.azurewebsites.net/api";

export const authenticate = async (username: string, password: string) => {
    const uri = azureUri + "/users/authenticate";
    const response = await fetch(
        uri, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    });
    const user = await response.json();
    return user;
}