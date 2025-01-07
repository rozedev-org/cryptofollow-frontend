'use client'
import { useState } from "react";
import { WalletIdentity} from "../types/wallet.types";

export const useWallet = () => {
    const fetchWallet = async () => {
        try {
            setIsLoading(true);    
        const response : WalletIdentity[] = await fetch(
            "http://localhost:8000/api/cryptofollow-service/v1/wallet/currencies"
        ).then((res) => res.json());
        setWallet(response);
        setIsLoading(false);
        return response;
        } catch (error) {
            setIsLoading(false);
        console.log(error);
        }
    };
    const [isLoading, setIsLoading] = useState(false);
    const [wallet, setWallet] = useState<WalletIdentity[]>([]);
    
    return {
        wallet,
        fetchWallet,
        isLoading
    };
    }