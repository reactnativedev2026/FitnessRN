import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Switch,
} from 'react-native';
import AppSafeAreaView from '../../../../component/common/AppSafeAreaView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, {
    FadeInDown,
    FadeInUp,
} from 'react-native-reanimated';
import ScreenNameEnum from '../../../../routes/screenName.enum';
import { useAppTheme } from '../../../../theme/ThemeProvider';


export default function TrainingReminderScreen({ navigation }: any) {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

    const [enabled, setEnabled] = useState(true);
    const [selectedDay, setSelectedDay] = useState('M');

    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

    return (
        <AppSafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#000" barStyle="light-content" />

            {/* HEADER */}

            <Animated.View
                entering={FadeInDown.duration(500)}
                style={styles.header}
            >
                <TouchableOpacity onPress={() => navigation?.goBack()}>
                    <Ionicons name="arrow-back" size={22} color="#fff" />
                </TouchableOpacity>

                <Text style={styles.stepText}>Step 1 of 5</Text>
            </Animated.View>

            {/* CONTENT */}

            <Animated.View
                entering={FadeInUp.delay(200).duration(600)}
            >
                <Text style={styles.smallTitle}>CONFIGURATION</Text>

                <Text style={styles.title}>
                    Training{'\n'}
                    Reminders
                </Text>

                <Text style={styles.description}>
                    Stay consistent with elite-level scheduling.
                    Precision timing leads to precision results.
                </Text>
            </Animated.View>

            {/* CARD */}

            <Animated.View
                entering={FadeInUp.delay(400).duration(700)}
                style={styles.card}
            >
                <View style={styles.row}>
                    <Text style={styles.cardTitle}>Active Days</Text>

                    <Ionicons
                        name="calendar-outline"
                        size={18}
                        color="#F59E0B"
                    />
                </View>

                <View style={styles.daysRow}>
                    {days.map((day, index) => {
                        const active = selectedDay === `${day}${index}`;

                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setSelectedDay(`${day}${index}`)}
                                style={[
                                    styles.dayBox,
                                    active && styles.activeDay,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.dayText,
                                        active && styles.activeDayText,
                                    ]}
                                >
                                    {day}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* REMINDER */}

                <View style={styles.reminderCard}>
                    <View style={styles.leftSection}>
                        <View style={styles.iconBox}>
                            <MaterialCommunityIcons
                                name="bell-ring"
                                size={18}
                                color="#F59E0B"
                            />
                        </View>

                        <View>
                            <Text style={styles.reminderTitle}>
                                Pre-Workout Nudge
                            </Text>

                            <Text style={styles.reminderSubtitle}>
                                15 mins before start
                            </Text>
                        </View>
                    </View>

                    <Switch
                        value={enabled}
                        onValueChange={setEnabled}
                        trackColor={{
                            false: '#333',
                            true: '#F59E0B',
                        }}
                        thumbColor="#fff"
                    />
                </View>
            </Animated.View>

            {/* BUTTON */}

            <Animated.View
                entering={FadeInUp.delay(700).duration(700)}
            >
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation?.navigate(ScreenNameEnum.ActiveReminders)}
                >
                    <Text style={styles.buttonText}>
                        Continue
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        </AppSafeAreaView>
    );
}

const createStyles = (theme: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingHorizontal: 24,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },

    stepText: {
        color: '#A1A1AA',
        marginLeft: 12,
        fontSize: 13,
    },

    smallTitle: {
        color: '#F59E0B',
        fontSize: 10,
        fontWeight: '700',
        marginTop: 35,
        letterSpacing: 1,
    },

    title: {
        color: theme.colors.text,
        fontSize: 40,
        fontWeight: '900',
        lineHeight: 42,
        marginTop: 10,
    },

    description: {
        color: '#8A8A8A',
        marginTop: 15,
        lineHeight: 22,
        fontSize: 14,
    },

    card: {
        marginTop: 35,
        backgroundColor: '#17171B',
        borderRadius: 22,
        padding: 18,
        borderWidth: 1,
        borderColor: '#232327',
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    cardTitle: {
        color: theme.colors.text,
        fontWeight: '700',
        fontSize: 16,
    },

    daysRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 18,
    },

    dayBox: {
        width: 34,
        height: 34,
        borderRadius: 10,
        backgroundColor: '#242428',
        justifyContent: 'center',
        alignItems: 'center',
    },

    activeDay: {
        backgroundColor: '#3A2A14',
        borderWidth: 1,
        borderColor: '#F59E0B',
    },

    dayText: {
        color: '#7A7A7A',
        fontWeight: '700',
    },

    activeDayText: {
        color: '#F59E0B',
    },

    reminderCard: {
        marginTop: 25,
        backgroundColor: '#0E0E11',
        borderRadius: 18,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    iconBox: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: '#23180A',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },

    reminderTitle: {
        color: theme.colors.text,
        fontWeight: '700',
    },

    reminderSubtitle: {
        color: '#8A8A8A',
        marginTop: 4,
        fontSize: 12,
    },

    button: {
        height: 58,
        backgroundColor: '#F59E0B',
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 35,
    },

    buttonText: {
        color: theme.colors.text,
        fontWeight: '900',
        fontSize: 16,
    },
});
