import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Switch,
} from 'react-native';
import AppSafeAreaView from '../../../component/common/AppSafeAreaView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, {
    FadeInDown,
    FadeInUp,
} from 'react-native-reanimated';
import ScreenNameEnum from '../../../routes/screenName.enum';
import FitnessHeader from '../../../component/common/FitnessHeader';

export default function SmartNotificationScreen({ navigation }: any) {
    const [enabled, setEnabled] = useState(true);

    return (
        <AppSafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#000" barStyle="light-content" />

            {/* Header */}

            <Animated.View
                entering={FadeInDown.duration(500)}
            >
                <FitnessHeader style={styles.header} />
            </Animated.View>

            {/* Step */}

            <Animated.View
                entering={FadeInUp.delay(150).duration(500)}
                style={styles.stepRow}
            >
                <TouchableOpacity
                    onPress={() => navigation?.goBack()}
                >
                    <Ionicons
                        name="arrow-back"
                        size={20}
                        color="#fff"
                    />
                </TouchableOpacity>

                <Text style={styles.stepText}>
                    Step 4 of 5
                </Text>
            </Animated.View>

            {/* Smart Card */}

            <Animated.View
                entering={FadeInUp.delay(300).duration(700)}
                style={styles.card}
            >
                <View style={styles.titleRow}>
                    <MaterialCommunityIcons
                        name="star-four-points"
                        size={18}
                        color="#FFB48A"
                    />

                    <Text style={styles.cardTitle}>
                        Smart Notifications
                    </Text>
                </View>

                <Text style={styles.description}>
                    Users receive personalized nudges based on
                    their daily activity. Our AI analyzes your
                    performance data and biometric markers to
                    optimize reminder timing for maximum
                    adherence.
                </Text>

                <View style={styles.bottomRow}>
                    <Text style={styles.toggleText}>
                        Enable Adaptive Timing
                    </Text>

                    <Switch
                        value={enabled}
                        onValueChange={setEnabled}
                        trackColor={{
                            false: '#32343D',
                            true: '#FFB48A',
                        }}
                        thumbColor="#fff"
                    />
                </View>
            </Animated.View>

            {/* Button */}

            <Animated.View
                entering={FadeInUp.delay(500).duration(700)}
            >
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation?.navigate(ScreenNameEnum.TrainingReminder)}
                >
                    <Ionicons
                        name="add"
                        size={18}
                        color="#7B3F24"
                    />

                    <Text style={styles.buttonText}>
                        New Reminder
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        </AppSafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingHorizontal: 24,
    },

    header: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    userRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    avatar: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#23252D',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },

    avatarEmoji: {
        fontSize: 22,
    },

    hello: {
        color: '#fff',
        fontSize: 10,
    },

    name: {
        color: '#fff',
        fontWeight: '800',
        fontSize: 15,
        marginTop: 2,
    },

    dot: {
        position: 'absolute',
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: '#7B5CFF',
        right: -2,
        top: 1,
    },

    stepRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
    },

    stepText: {
        color: '#BDBDBD',
        marginLeft: 10,
        fontSize: 13,
        fontWeight: '600',
    },

    card: {
        marginTop: 45,
        backgroundColor: '#171920',
        borderRadius: 10,
        padding: 22,
        borderWidth: 1,
        borderColor: '#22242C',
    },

    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    cardTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        marginLeft: 10,
    },

    description: {
        color: '#B2B4BE',
        fontSize: 13,
        lineHeight: 22,
        marginTop: 18,
    },

    bottomRow: {
        marginTop: 35,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    toggleText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '500',
    },

    button: {
        marginTop: 26,
        height: 56,
        backgroundColor: '#F6B199',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: '#7B3F24',
        fontWeight: '700',
        marginLeft: 6,
    },
});
