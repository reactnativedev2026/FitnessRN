import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import ScreenNameEnum from '../../../routes/screenName.enum';
import ScreenHeader from '../../../component/common/ScreenHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { color } from '../../../theme';

const workouts = [
    {
        id: 1,
        title: 'CHEST',
        exercises: '12 Exercises',
        duration: '45 min',
        image:
            'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80',
    },
    {
        id: 2,
        title: 'BACK',
        exercises: '10 Exercises',
        duration: '40 min',
        image:
            'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1200&q=80',
    },
    {
        id: 3,
        title: 'LEGS',
        exercises: '14 Exercises',
        duration: '55 min',
        image:
            'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80',
    },
    {
        id: 4,
        title: 'CARDIO',
        exercises: '8 Exercises',
        duration: '30 min',
        image:
            'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80',
    },
];

export default function WorkoutPlanScreen({ navigation }: any) {
    const renderItem = ({ item }: any) => (
        <TouchableOpacity
            activeOpacity={0.9}
            style={styles.card}
            onPress={() => navigation?.navigate(ScreenNameEnum.ExerciseLibrary, { workout: item })}
        >
            <ImageBackground
                source={{ uri: item.image }}
                style={styles.image}
                imageStyle={styles.imageRadius}
            >
                <View style={styles.overlay} />

                <View style={styles.content}>
                    <Text style={styles.title}>{item.title}</Text>

                    <Text style={styles.subtitle}>
                        {item.exercises}
                    </Text>

                    <View style={styles.bottomRow}>
                        <Text style={styles.duration}>
                            {item.duration}
                        </Text>

                        <TouchableOpacity
                            style={styles.playButton}
                            onPress={() => navigation?.navigate(ScreenNameEnum.WorkoutComplete, { workout: item })}
                        >
                            <Ionicons
                                name="play"
                                color="#000"
                                size={18}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScreenHeader title="Workout Plan" style={styles.header} />
            <View style={{
                marginHorizontal: 15,
                marginTop: 15

            }}>
                <FlatList
                    data={workouts}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
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
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 14,
    },

    headerTitle: {
        flex: 1,
        color: '#fff',
        fontSize: 18,
        fontWeight: '900',
        marginLeft: 12,
    },

    card: {
        height: 170,
        marginBottom: 15,
        borderRadius: 20,
        overflow: 'hidden',
    },

    image: {
        flex: 1,
        justifyContent: 'flex-end',
    },

    imageRadius: {
        borderRadius: 20,
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.35)',
    },

    content: {
        padding: 15,
    },

    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '900',
    },

    subtitle: {
        color: '#ddd',
        marginTop: 4,
        fontSize: 12,
    },

    bottomRow: {
        marginTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    duration: {
        color: '#FFB19F',
        fontWeight: '700',
    },

    playButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#FFB19F',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
