import axios from "axios";

/* backend url */
const API = axios.create({
baseURL: "https://citi-solve2.onrender.com/api",
headers: {
"Content-Type": "application/json"
}
});

/* attach token automatically */
API.interceptors.request.use((req) => {

const userData = localStorage.getItem("user");

if (userData) {
const user = JSON.parse(userData);

```
if (user?.token) {
  req.headers.Authorization = `Bearer ${user.token}`;
}
```

}

return req;
});

/* auth APIs */
export const authAPI = {

register: async (data) => {
const res = await API.post("/auth/register", data);
return res.data;
},

login: async (data) => {
const res = await API.post("/auth/login", data);
return res.data;
}

};

/* complaint APIs */
export const complaintsAPI = {

createComplaint: async (data) => {
const res = await API.post("/complaints", data);
return res.data;
},

getMyComplaints: async () => {
const res = await API.get("/complaints/my");
return res.data;
},

getComplaints: async () => {
const res = await API.get("/complaints");
return res.data;
},

updateStatus: async (id, status) => {
const res = await API.put(`/complaints/${id}/status`, { status });
return res.data;
}

};
