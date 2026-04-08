import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { POST_API } from "../../api/APIRequest";
import { ENDPOINT } from "../../api/endpoints";

export interface Offer {
    id: number;
    title: string;
    description: string;
    video_or_url: string | null;
    url: string | null;
    assign_drivers: string | null;
    created_at: string;
    driver_type: string;
    mc_number: string | null;
    dot_number: string | null;
    phone_number: string | null;
}

const useOffers = () => {
    const { userData } = useSelector((state: any) => state.auth);
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchOffers = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            if (!token) return;

            const body = {
                user_id: userData?.user_data?.id,
            };

            const response = await POST_API(token, body, ENDPOINT.GET_OFFERS, setLoading);

            if (response && response.success) {
                setOffers(response.data || []);
            }
        } catch (error) {
            console.error("Error fetching offers:", error);
        }
    };

    useEffect(() => {
        fetchOffers();
    }, []);

    return {
        offers,
        loading,
        refreshOffers: fetchOffers,
    };
};

export default useOffers;
