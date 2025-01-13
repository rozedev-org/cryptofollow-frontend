'use client'
import { useState } from "react";
import { WalletIdentity} from "../types/wallet.types";
import { config } from "@/config";

export const useWallet = () => {
    const fetchWallet = async () => {
        const {bff} = config
        try {
            setIsLoading(true);    
        const response : WalletIdentity[] = await fetch(
            `${bff.url}/wallet/currencies`,
        ).then((res) => res.json());
        setWallet(response);
        setIsLoading(false);
        return response;
        } catch (error) {
            setIsLoading(false);
        console.log(error);
        }
    };
    const [isLoading, setIsLoading] = useState(true);
    const [wallet, setWallet] = useState<WalletIdentity[]>([]);
    
    return {
        wallet,
        fetchWallet,
        isLoading
    };
    }