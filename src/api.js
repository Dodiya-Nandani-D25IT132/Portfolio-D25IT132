const BASE_URL = "http://localhost:5000";

const getAuthHeaders = async () => {
    let token = localStorage.getItem("token");

    if (!token) {
        try {
            const res = await fetch(`${BASE_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: "nandani@charusat.edu.in",
                    password: "password123"
                })
            });
            if (res.ok) {
                const data = await res.json();
                token = data.token;
                localStorage.setItem("token", token);
            }
        } catch (err) {
            console.error("Authentication failed:", err);
        }
    }

    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
};

export const getTasks = async () => {
    let headers = await getAuthHeaders();
    let response = await fetch(`${BASE_URL}/tasks`, { headers });

    // If token expired, refresh and retry once
    if (response.status === 401) {
        localStorage.removeItem("token");
        headers = await getAuthHeaders();
        response = await fetch(`${BASE_URL}/tasks`, { headers });
    }

    if (!response.ok) {
        throw new Error("Failed to fetch tasks");
    }

    return response.json();
};

export const createTask = async (task) => {
    let headers = await getAuthHeaders();
    let response = await fetch(`${BASE_URL}/tasks`, {
        method: "POST",
        headers,
        body: JSON.stringify(task)
    });

    if (response.status === 401) {
        localStorage.removeItem("token");
        headers = await getAuthHeaders();
        response = await fetch(`${BASE_URL}/tasks`, {
            method: "POST",
            headers,
            body: JSON.stringify(task)
        });
    }

    if (!response.ok) {
        throw new Error("Failed to create task");
    }

    return response.json();
};

export const updateTask = async (id, task) => {
    let headers = await getAuthHeaders();
    let response = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(task)
    });

    if (response.status === 401) {
        localStorage.removeItem("token");
        headers = await getAuthHeaders();
        response = await fetch(`${BASE_URL}/tasks/${id}`, {
            method: "PUT",
            headers,
            body: JSON.stringify(task)
        });
    }

    if (!response.ok) {
        throw new Error("Failed to update task");
    }

    return response.json();
};

export const deleteTask = async (id) => {
    let headers = await getAuthHeaders();
    let response = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: "DELETE",
        headers
    });

    if (response.status === 401) {
        localStorage.removeItem("token");
        headers = await getAuthHeaders();
        response = await fetch(`${BASE_URL}/tasks/${id}`, {
            method: "DELETE",
            headers
        });
    }

    if (!response.ok) {
        throw new Error("Failed to delete task");
    }

    return response.json();
};