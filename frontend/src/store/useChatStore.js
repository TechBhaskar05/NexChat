import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const response = await axiosInstance.get("/messages/users");
            set({ users: response.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetching users");
        } finally {
            set({ isUsersLoading: false });
        }
    },
    
    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const response = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: response.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetching messages");
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            const response = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({messages: [...messages, response.data] });
            toast.success("Message sent successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Error sending message");
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get();
        if(!selectedUser)   return;

        const socket = useAuthStore.getState().socket;

        // TODO: optimize this later
        socket.on("newMessage", (newMessage) => {

            if(newMessage.senderId !== selectedUser._id && newMessage.receiverId !== selectedUser._id) return;

            // This is same as the above condition this is for understanding purpose
            // const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
            // if(!isMessageSentFromSelectedUser)  return;


            set((state) => ({
                messages: [...state.messages, newMessage],
            }));
            // set({
            //     messages: [...get().messages, newMessage],
            // })
        }); 
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },
    
    
    setSelectedUser: (selectedUser) => set({ selectedUser }),
}))