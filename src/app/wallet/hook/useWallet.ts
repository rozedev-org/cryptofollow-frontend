'use client'
import { useState } from "react";
import { WalletIdentity } from "../types/wallet.types";

export const useWallet = () => {
    const fetchWallet = async () => {
        try {
        const response = await fetch(
            "http://localhost:8000/api/cryptofollow-service/v1/wallet"
        ).then((res) => res.json());
        setWallet(response);
        return response;
        } catch (error) {
        console.log(error);
        }
    };
    
    const [wallet, setWallet] = useState<WalletIdentity>();
    
    return {
        wallet,
        fetchWallet,
    };
    }