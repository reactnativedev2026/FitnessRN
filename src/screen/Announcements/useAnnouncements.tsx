import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { POST_API } from "../../api/APIRequest";
import { ENDPOINT } from "../../api/endpoints";

export interface Announcement {
    id: number;
    title: string;
    message: string;
    type: string;
    sent_date: string;
    total_users: number;
    delivered_count: number;
    read_count: number;
    status: string;
    created_at: string;
    updated_at: string;
    city: string;
    driver_status: string;
    radius: string;
    latitude: string;
    longitude: string;
}

const useAnnouncements = () => {
    const { userData } = useSelector((state: any) => state.auth);
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchAnnouncements = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            if (!token) return;

            const body = {
                user_id: userData?.user_data?.id,
            };

            const response = await POST_API(token, body, ENDPOINT.GET_ANNOUNCEMENTS, setLoading);

            if (response && response.success) {
                setAnnouncements(response.data || []);
            }
        } catch (error) {
            console.error("Error fetching announcements:", error);
        }
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    return {
        announcements,
        loading,
        refreshAnnouncements: fetchAnnouncements,
    };
};

export default useAnnouncements;
