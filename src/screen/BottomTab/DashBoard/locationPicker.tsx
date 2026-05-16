import React, { useState } from 'react';
import {
    View,
    TextInput,
    FlatList,
    Text,
    TouchableOpacity,
    Alert,
    StyleSheet,
    Image,
    Modal,
    Animated,
    Platform,
} from 'react-native';
import imageIndex from '../../../assets/imageIndex';

type Props = {
    apiKey: string;
    visible: boolean;
    onClose: () => void;
    onSumit: any,
    onLocationSelected: (location: { latitude: number, longitude: number, address: string }) => void;
};

const LocationPicker: React.FC<Props> = ({ apiKey, visible, onSumit, onClose, onLocationSelected, type }) => {
    const [places, setPlaces] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [selectedLocation, setSelectedLocation] = useState<{ latitude: number, longitude: number } | null>(null);
    const fadeAnim = useState(new Animated.Value(0))[0];

    const fetchPlaces = async (input: string) => {
        console.log("input", input)

        if (!input) return setPlaces([]);
        const urlHospital = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
            input
        )}&key=${apiKey}&types=establishment&components=country:fr`;

        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}&language=en`;
        console.log("url", url)

        try {
            const response = await fetch(type ? urlHospital : url);
            console.log("response", response)

            const result = await response.json();
            console.log("result--", result)
            setPlaces(result?.predictions || []);
            Animated.timing(fadeAnim, {
                toValue: result?.predictions?.length ? 1 : 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch places');
            setPlaces([]);
        }
    };

    const fetchPlaceDetails = async (placeId: string) => {

        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;

        try {
            const response = await fetch(url);
            const result = await response.json();
            if (result?.result?.geometry?.location) {
                const { lat, lng } = result.result.geometry.location;
                const address = result.result.formatted_address || '';
                setSelectedLocation({ latitude: lat, longitude: lng });
                onLocationSelected({ latitude: lat, longitude: lng, address });
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch place details');
        }
    };

    const handleSelectPlace = (place: any) => {
        setSearchText(place.description);
        setPlaces([]);
        fetchPlaceDetails(place.place_id);
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <View style={styles.searchContainer}>
                        <TouchableOpacity onPress={onClose} style={styles.closeIconWrapper}>
                            <Text>X</Text>
                        </TouchableOpacity>
                        <View style={styles.searchBar}>
                            <Image source={imageIndex.search} style={styles.searchIcon} />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search for a place"
                                value={searchText}
                                onChangeText={(text) => {
                                    setSearchText(text);
                                    fetchPlaces(text);
                                }}
                                placeholderTextColor="#808080"
                            />
                        </View>

                        {places.length > 0 && (
                            <Animated.View style={[styles.suggestionsContainer, { opacity: fadeAnim }]}>
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={places}
                                    keyExtractor={(item: any) => item.place_id}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity style={styles.suggestionItem} onPress={() => handleSelectPlace(item)}>
                                            <Text style={styles.suggestionText}>{item.description}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </Animated.View>
                        )}
                    </View>

                </View>
            </View>

        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',

    },
    container: {
        height: '75%', // Make it like a bottom sheet
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: "hidden",
        marginHorizontal: 3,

    },
    searchContainer: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 22 : 20,
        width: '100%',
        paddingHorizontal: 20,
        zIndex: 10,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5
    },
    searchIcon: {
        width: 20,
        height: 20,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        marginLeft: 10,
    },
    suggestionsContainer: {
        backgroundColor: 'white',
        marginTop: 8,
        borderRadius: 10,
        maxHeight: 200,
        overflow: "hidden",
    },
    suggestionItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    suggestionText: {
        fontSize: 16,
        color: "black"
    },

    closeIconWrapper: {
        alignItems: "flex-end",
        marginBottom: 20,
    },

});

export default LocationPicker;
