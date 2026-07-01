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
import { useAppTheme } from '../../../theme/ThemeProvider';
import FastImage from '@d11/react-native-fast-image';

// Removed static color import;

const workouts = [
    {
        id: 1,
        title: 'CHEST',
        exercises: '12 Exercises',
        duration: '45 min',
        image:
            'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGtwdHBseXkyaW9zMThneGp2bGxiOXBnaHBxOXR0azFkZDA5N2NtbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/M2Bromx7Ehlm0/giphy.gif',
    },
    {
        id: 2,
        title: 'BACK',
        exercises: '10 Exercises',
        duration: '40 min',
        image:
            'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnI4bGNrbTdsY2l6OGo1ZmgxamVpczExMXg1Zzk3aGI0ams0OXFjOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JvIwBdr0rX82vzqyLb/giphy.gif',
    },
    
    {
        id: 4,
        title: 'CARDIO',
        exercises: '8 Exercises',
        duration: '30 min',
        image:
            'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3YzOGJpOGYzNnZnYTAzeDlyd3ZnMGswNGg3b3dodXA2b2c0eXRhcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dCBt8HdDHMgdccPTM0/giphy.gif',
    },
];

export default function WorkoutPlanScreen({ navigation }: any) {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

    const renderItem = ({ item }: any) => (
        <TouchableOpacity
            activeOpacity={0.9}
            style={styles.card}
            onPress={() => navigation?.navigate(ScreenNameEnum.ExerciseLibrary, { workout: item })}
        >
            <View style={styles.image}>
                <FastImage
                    source={{ uri: item.image }}
                    style={[StyleSheet.absoluteFillObject, styles.imageRadius]}
                />
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
            </View>
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

const createStyles = (theme: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 14,
    },

    headerTitle: {
        flex: 1,
        color: theme.colors.text,
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
        color: theme.colors.text,
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
