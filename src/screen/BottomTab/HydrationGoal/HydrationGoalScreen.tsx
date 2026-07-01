import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import AppSafeAreaView from '../../../component/common/AppSafeAreaView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Animated, { FadeInUp } from 'react-native-reanimated';
import ScreenNameEnum from '../../../routes/screenName.enum';
import FitnessHeader from '../../../component/common/FitnessHeader';
import ScreenHeader from '../../../component/common/ScreenHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HydrationGoalScreen({ navigation }: any) {
    const [selected, setSelected] = useState('Every 1.5 Hours');
    const intervals = ['Every 1 Hour', 'Every 1.5 Hours', 'Every 2 Hours'];
    const selectNextInterval = () => {
        const currentIndex = intervals.indexOf(selected);
        setSelected(intervals[(currentIndex + 1) % intervals.length]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000" />
            <ScreenHeader title='Primary Focus' />


            {/* Step */}



            {/* Progress Ring */}

            <Animated.View
                entering={FadeInUp.duration(700)}
                style={styles.progressCard}
            >
                <AnimatedCircularProgress
                    size={150}
                    width={8}
                    fill={100}
                    tintColor="#FF9500"
                    backgroundColor="#23242B"
                    rotation={0}
                >
                    {() => (
                        <View style={{ alignItems: 'center' }}>
                            <MaterialCommunityIcons
                                name="water"
                                size={42}
                                color="#F7B26A"
                            />

                            <Text style={styles.goalText}>8/8</Text>

                            <Text style={styles.goalSub}>
                                DAILY GOAL
                            </Text>
                        </View>
                    )}
                </AnimatedCircularProgress>
            </Animated.View>

            {/* Frequency */}
            <View style={{
                flex: 1,
                marginHorizontal: 15,
                marginTop: 25,

            }}>
                <Text style={styles.label}>
                    FREQUENCY
                </Text>

                <Animated.View
                    entering={FadeInUp.delay(200).duration(700)}
                    style={styles.frequencyCard}
                >
                    <View style={styles.row}>
                        <Text style={styles.interval}>
                            Interval
                        </Text>

                        <TouchableOpacity style={styles.dropdown} onPress={selectNextInterval}>
                            <Text style={styles.dropdownText}>
                                {selected}
                            </Text>

                            <Ionicons
                                name="chevron-down"
                                size={16}
                                color="#D8A26A"
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.divider} />

                    <Text style={styles.quote}>
                        "It's time to hydrate. Performance is
                        power."
                    </Text>
                </Animated.View>

                <TouchableOpacity
                    activeOpacity={0.86}
                    style={styles.continueButton}
                    onPress={() => navigation.navigate(ScreenNameEnum.HydrationTipScreen, {
                        interval: selected,
                    })}>
                    <Text style={styles.continueText}>SAVE & CONTINUE</Text>
                    <Ionicons name="arrow-forward" size={18} color="#111" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },

    header: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    profileRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#23242B',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },

    hello: {
        color: '#fff',
        fontSize: 10,
    },

    name: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '800',
    },

    dot: {
        position: 'absolute',
        top: 1,
        right: -2,
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: '#7B61FF',
    },

    stepRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 28,
    },

    stepText: {
        color: '#CFCFCF',
        marginLeft: 8,
        fontSize: 13,
    },

    progressCard: {
        alignItems: 'center',
        marginTop: 35,
        marginBottom: 35,
    },

    goalText: {
        color: '#fff',
        fontSize: 34,
        fontWeight: '900',
    },

    goalSub: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1,
    },

    label: {
        color: '#A9A9A9',
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1,
        marginBottom: 10,
    },

    frequencyCard: {
        backgroundColor: '#1A1B22',
        borderRadius: 12,
        padding: 18,
        borderWidth: 1,
        borderColor: '#25262E',
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    interval: {
        color: '#fff',
        fontSize: 14,
    },

    dropdown: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    dropdownText: {
        color: '#E3A46A',
        fontWeight: '700',
        marginRight: 4,
    },

    divider: {
        height: 1,
        backgroundColor: '#2A2C35',
        marginVertical: 20,
    },

    quote: {
        color: '#9C9EA8',
        fontSize: 13,
        fontStyle: 'italic',
        lineHeight: 22,
    },

    continueButton: {
        alignItems: 'center',
        backgroundColor: '#FF9500',
        borderRadius: 12,
        flexDirection: 'row',
        height: 52,
        justifyContent: 'center',
        marginTop: 28,
    },

    continueText: {
        color: '#111',
        fontSize: 13,
        fontWeight: '900',
        marginRight: 8,
    },
});
