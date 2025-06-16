import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

const SOCKET_URL = "http://localhost:8000";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async() => {
        try {
            const response = await axiosInstance.get('/auth/check');

            set({authUser: response.data});
            get().connectSocket();
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({authUser: null});
        } finally {
            set({isCheckingAuth: false});
        }
    },

    signup: async (data) => {
        set({isSigningUp: true});
        try {
            const response = await axiosInstance.post('/auth/signup', data);
            set({authUser: response.data});
            toast.success("Account created successfully!");
            get().connectSocket();
        } catch (error) {
            toast.error(error.response?.data?.message || "Error creating account");
        } finally {
            set({isSigningUp: false});
        }
    },

    login: async (data) => {
        try {
            const response = await axiosInstance.post('/auth/login', data);
            set({authUser: response.data});
            toast.success("Logged in successfully!");

            get().connectSocket();
        } catch (error) {
            toast.error(error.response?.data?.message || "Error logging in");
        } finally {
            set({isLoggingIn: false});
        }
    },

    logout: async() => {
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser: null});
            toast.success("Logged out successfully!");
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response?.data?.message || "Error logging out");
        }
    },

    updateProfile: async (data) => {
        set({isUpdatingProfile: true});
        try {
            const response = await axiosInstance.put('/auth/update-profile', data);
            set({ authUser: response.data });
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.log("Error in update profile:", error);
            toast.error(error.response?.data?.message || "Error updating profile");
        } finally {
            set({isUpdatingProfile: false});
        }
    },

    connectSocket: () => {
        const {authUser} = get();
        if (!authUser || get().socket?.connected) {
            console.log("No user authenticated, not connecting socket");
            return;
        }
        const socket = io(SOCKET_URL, {
            query: {
                userId: authUser._id,
            }
        })
        socket.connect();
        set({socket: socket});

        socket.on("getOnlineUsers", (userIds) => {
            console.log("Online users:", userIds);
            set({onlineUsers: userIds});
        })
    },

    disconnectSocket: () => {
        if(get().socket?.connected) {
            get().socket.disconnect();
            console.log("Socket disconnected");
        }
    },
}));