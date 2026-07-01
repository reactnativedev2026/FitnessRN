// ExerciseLibraryScreen.js
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    TextInput,
    FlatList,
    Image,
} from 'react-native';
import AppSafeAreaView from '../../../component/common/AppSafeAreaView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ScreenNameEnum from '../../../routes/screenName.enum';
import FitnessHeader from '../../../component/common/FitnessHeader';
import ScreenHeader from '../../../component/common/ScreenHeader';
import { color } from '../../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';

const categories = ['All', 'Chest', 'Back', 'Legs', 'Arms'];

const exercises = [
    {
        name: 'Dumbbell Chest Press',
        detail: 'Upper Chest • 4 sets',
        image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&q=80',
    },
    {
        name: 'Wide Grip Pull-Up',
        detail: 'Lats, Upper back • 3 sets',
        image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=500&q=80',
    },
    {
        name: 'Barbell Deadlift',
        detail: 'Lower Body • 5 sets',
        image: 'https://images.unsplash.com/photo-1534368420009-621bfab424a8?w=500&q=80',
    },
    {
        name: 'Walking Lunges',
        detail: 'Quads, Glutes • 4 sets',
        image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=500&q=80',
    },
    {
        name: 'Speed Jump Rope',
        detail: 'Cardio • 10 mins',
        image: 'https://images.unsplash.com/photo-1517963628607-235ccdd5476c?w=500&q=80',
    },
];

export default function ExerciseLibraryScreen({ navigation }: any) {
    const [active, setActive] = useState('All');

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#000" barStyle="light-content" />
            <ScreenHeader title="ExerciseLibrary" />
            <View style={{
                paddingHorizontal: 16,

            }}>

                <View style={styles.searchBox}>
                    <Ionicons name="search" size={17} color="#71717A" />
                    <TextInput
                        placeholder="Search exercises (e.g. Chest Press)"
                        placeholderTextColor="#71717A"
                        style={styles.input}
                    />
                </View>

                <View style={styles.categoryRow}>
                    {categories.map(item => (
                        <TouchableOpacity
                            key={item}
                            onPress={() => setActive(item)}
                            style={[styles.chip, active === item && styles.activeChip]}
                        >
                            <Text style={[styles.chipText, active === item && styles.activeChipText]}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <FlatList
                    data={exercises}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 120 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            activeOpacity={0.85}
                            style={styles.card}
                            onPress={() => navigation?.navigate(ScreenNameEnum.WorkoutPlan, { exercise: item })}>
                            <Image source={{ uri: item.image }} style={styles.exerciseImg} />

                            <View style={styles.cardText}>
                                <Text style={styles.exerciseName}>{item.name}</Text>
                                <Text style={styles.exerciseDetail}>{item.detail}</Text>
                            </View>

                            <TouchableOpacity
                                style={styles.plusBtn}
                                onPress={() => navigation?.navigate(ScreenNameEnum.WorkoutPlan, { exercise: item })}
                            >
                                <Ionicons name="add" size={20} color="#BFC7FF" />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background,
    },

    header: {
        marginBottom: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    userRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    avatar: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: '#24242A',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 9,
    },

    avatarText: {
        fontSize: 18,
    },

    hello: {
        color: '#fff',
        fontSize: 9,
    },

    name: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '800',
        marginTop: 2,
    },

    bellBtn: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },

    bellDot: {
        position: 'absolute',
        top: 6,
        right: 7,
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#7C5CFF',
    },

    searchBox: {
        height: 55,
        borderRadius: 10,
        backgroundColor: '#11131A',
        borderWidth: 1,
        borderColor: '#1F2330',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        marginTop: 10
    },

    input: {
        flex: 1,
        color: '#fff',
        fontSize: 12,
        marginLeft: 8,
        paddingVertical: 0,
    },

    categoryRow: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 15,
        marginBottom: 18,
    },

    chip: {
        height: 40,
        paddingHorizontal: 16,
        borderRadius: 14,
        backgroundColor: '#11131A',
        alignItems: 'center',
        justifyContent: 'center',
    },

    activeChip: {
        backgroundColor: '#0A66FF',
    },

    chipText: {
        color: '#E5E7EB',
        fontSize: 11,
        fontWeight: '700',
    },

    activeChipText: {
        color: '#fff',
    },

    card: {
        minHeight: 72,
        borderRadius: 14,
        backgroundColor: '#12151D',
        borderWidth: 1,
        borderColor: '#202432',
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },

    exerciseImg: {
        width: 56,
        height: 56,
        borderRadius: 10,
        backgroundColor: '#222',
    },

    cardText: {
        flex: 1,
        marginLeft: 12,
    },

    exerciseName: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '800',
    },

    exerciseDetail: {
        color: '#8C92A3',
        fontSize: 10,
        marginTop: 5,
        fontWeight: '600',
    },

    plusBtn: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: '#20263A',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
