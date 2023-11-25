import {create} from "zustand";

export const useAuthStore=create((set)=>({
    auth:{
        username:"",
        isLogin:null,
        profile:"",
        token:"",
        userId:"",
        userEmail:"",
        OTPEmail:"",
        OTP:"",
        password:""
    },
    setUsername:(name)=>set((state)=>({auth:{...state.auth,username:name}})),
    setIsLogin:(value)=>set((state)=>({auth:{...state.auth,isLogin:value}})),
    setProfile:(value)=>set((state)=>({auth:{...state.auth,profile:value}})),
    setToken:(value)=>set((state)=>({auth:{...state.auth,token:value}})),
    setUserId:(value)=>set((state)=>({auth:{...state.auth,userId:value}})),
    setUserEmail:(value)=>set((state)=>({auth:{...state.auth,userEmail:value}})),
    setOTPEmail:(value)=>set((state)=>({auth:{...state.auth,OTPEmail:value}})),
    setOTP:(value)=>set((state)=>({auth:{...state.auth,OTP:value}})),
    setPassword:(value)=>set((state)=>({auth:{...state.auth,password:value}})),
}));