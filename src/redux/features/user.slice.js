import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";


export const signup = createAsyncThunk("user/signup", async (userData, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("/user/register", userData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Signup failed");
    }
});


export const checkAuth = createAsyncThunk("user/checkAuth", async (_, { dispatch, rejectWithValue }) => {
    try {
        const response = await axiosInstance.get("/user/check-auth");
        return response.data;
    } catch (error) {
        console.log(error)
        if (error.response?.status === 401) {
            
            const refreshResponse = await dispatch(refreshAccessToken());
            if (refreshResponse.payload) {
                const reply= await axiosInstance.patch("/user/refresh-access-token")//dispatch(checkAuth()).unwrap();
                return reply.data
            }
        }
        return rejectWithValue(error.response?.data || "Auth check failed");
    }
});

export const signIn = createAsyncThunk("user/signIn", async (credentials, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("/user/login", credentials);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Login failed");
    }
});


export const refreshAccessToken = createAsyncThunk("user/refreshAccessToken", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.patch("/user/refresh-access-token");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Token refresh failed");
    }
});

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        isCheckingAuth: false,
        isLoggingIn: false,
        isRegistring: false,
        isRefreshingToken: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
      .addCase(signIn.pending, (state) => {
        state.isLoggingIn = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.isLoggingIn = false; 
      })
      .addCase(signIn.rejected, (state) => {
        state.isLoggingIn = false;
      });

    builder
      .addCase(signup.pending, (state) => {
        state.isRegistring = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.isRegistring = false;
      })
      .addCase(signup.rejected, (state) => {
        state.isRegistring = false;
      });

    builder
      .addCase(checkAuth.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.isCheckingAuth = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isCheckingAuth = false;
      });
    },
});

export default userSlice.reducer;
