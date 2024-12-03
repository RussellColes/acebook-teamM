const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getMyUserDetails(token) {
    const requestOptions = {
        method: "GET",
        headers: {
        Authorization: `Bearer ${token}`,
    },
    };

    const response = await fetch(`${BACKEND_URL}/users`, requestOptions);

    if (response.status !== 200) {
        throw new Error("Unable to fetch profile details");
    }
    
    const data = await response.json();
    return data;
}

export async function getMyUsername(token) {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    const response = await fetch(`${BACKEND_URL}/users/getMyUsername`, requestOptions);

    if (response.status !== 200) {
        throw new Error("Unable to fetch username details");
    }
    
    const data = await response.json();
    return data;
}

export async function getUserDetails(token, username) {
    const requestOptions = {
        method: "GET",
        headers: {
        Authorization: `Bearer ${token}`
    },
    };

    const response = await fetch(`${BACKEND_URL}/users/${username}`, requestOptions);

    if (response.status !== 200) {
        throw new Error("Unable to fetch profile details");
    }
    
    const data = await response.json();
    return data;
}

