import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  msg: "",
  user: "",
  token: localStorage.getItem("token") || "", // Load token from localStorage
  loading: false,
  error: "",
};

// Async thunk to sign up a user
export const signUpUser = createAsyncThunk("signUpUser", async (body) => {
  const res = await fetch("http://localhost:5000/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error("Failed to sign up user");
  }

  return await res.json();
});

// Async thunk to log in a user
export const loginUser = createAsyncThunk("loginUser", async (body) => {
  const res = await fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error("Failed to log in user");
  }

  return await res.json();
});


export const fetchBlogs = createAsyncThunk("fetchBlogs", async () => {
  const res = await fetch("http://localhost:5000/api/blogs", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return await res.json();
});




// Slice definition
const authSlice = createSlice({
  name: "user",
  initialState: {
    ...initialState,
    blogs: [],
  },
  reducers: {
    logoutUser: (state) => {
      state.user = "";
      state.token = "";
      state.msg = "Logged out successfully";
      localStorage.removeItem("token"); // Remove token from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(signUpUser.fulfilled, (state, { payload: { error, msg } }) => {
        state.loading = false;
        if (error) {
          state.error = error;
        } else {
          state.msg = msg;
        }
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, { payload: { error, token, user } }) => {
        state.loading = false;
        if (error) {
          state.error = error;
        } else {
          state.token = token;
          state.user = user;
          state.msg = "Logged in successfully";
          localStorage.setItem("token", token); // Save token to localStorage
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Invalid credentials";
      })
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchBlogs.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.blogs = payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch blogs";
      })
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
