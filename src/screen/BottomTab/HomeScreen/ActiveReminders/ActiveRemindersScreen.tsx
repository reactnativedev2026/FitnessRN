// ActiveRemindersScreen.js
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    Switch,
    ScrollView,
} from 'react-native';
import AppSafeAreaView from '../../../../component/common/AppSafeAreaView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import ScreenNameEnum from '../../../../routes/screenName.enum';
import FitnessHeader from '../../../../component/common/FitnessHeader';
import { useAppTheme } from '../../../../theme/ThemeProvider';


export default function ActiveRemindersScreen({ navigation }: any) {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

    const [reminders, setReminders] = useState([
        {
            title: 'Morning Workout',
            sub: 'Daily • 07:30 AM',
            icon: 'dumbbell',
            active: true,
        },
        {
            title: 'Hydration Goal',
            sub: 'Every 1.5 Hours',
            icon: 'water-outline',
            active: true,
        },
        {
            title: 'Meal Reminders',
            sub: 'Next: 12:30 PM',
            icon: 'silverware-fork-knife',
            active: true,
        },
        {
            title: 'Sleep Prep',
            sub: 'Daily • 10:00 PM',
            icon: 'moon-waning-crescent',
            active: false,
        },
    ]);

    const toggleReminder = (index: number) => {
        const updated = [...reminders];
        updated[index].active = !updated[index].active;
        setReminders(updated);
    };

    return (
        <AppSafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#000" barStyle="light-content" />

            <ScrollView showsVerticalScrollIndicator={false}>
                <Animated.View entering={FadeInDown.duration(500)}>
                    <FitnessHeader style={styles.header} iconSize={18} />
                </Animated.View>

                <Animated.View entering={FadeInUp.delay(100).duration(500)} style={styles.stepRow}>
                    <TouchableOpacity onPress={() => navigation?.goBack()}>
                        <Ionicons name="arrow-back" size={22} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.stepText}>Step 3 of 5</Text>
                </Animated.View>

                <Animated.Text entering={FadeInUp.delay(200).duration(500)} style={styles.sectionTitle}>
                    ACTIVE REMINDERS
                </Animated.Text>

                <View style={styles.list}>
                    {reminders.map((item, index) => (
                        <Animated.View
                            key={index}
                            entering={FadeInUp.delay(280 + index * 120).duration(550)}
                            style={styles.card}
                        >
                            <View style={styles.iconBox}>
                                <MaterialCommunityIcons
                                    name={item.icon}
                                    size={22}
                                    color="#FFB19F"
                                />
                            </View>

                            <View style={styles.textBox}>
                                <Text style={styles.cardTitle}>{item.title}</Text>
                                <Text style={styles.cardSub}>{item.sub}</Text>
                            </View>

                            <Switch
                                value={item.active}
                                onValueChange={() => toggleReminder(index)}
                                trackColor={{ false: '#3B3D46', true: '#FFB19F' }}
                                thumbColor="#fff"
                                ios_backgroundColor="#3B3D46"
                                style={styles.switch}
                            />
                        </Animated.View>
                    ))}
                </View>

                <TouchableOpacity
                    activeOpacity={0.85}
                    style={styles.continueBtn}
                    onPress={() => navigation?.navigate(ScreenNameEnum.HydrationGoal)}
                >
                    <Text style={styles.continueText}>Continue</Text>
                </TouchableOpacity>
            </ScrollView>
        </AppSafeAreaView>
    );
}

const createStyles = (theme: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingHorizontal: 8,
    },

    header: {
        marginTop: 12,
        paddingHorizontal: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    userRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    avatar: {
        width: 39,
        height: 39,
        borderRadius: 20,
        backgroundColor: '#24242A',
        alignItems: 'center',
        justifyContent: 'center',
    },

    avatarText: {
        fontSize: 20,
    },

    hello: {
        color: theme.colors.text,
        fontSize: 10,
        marginLeft: 10,
    },

    name: {
        color: theme.colors.text,
        fontSize: 15,
        fontWeight: '800',
        marginLeft: 10,
        marginTop: 2,
    },

    bellBtn: {
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: 'center',
        justifyContent: 'center',
    },

    bellDot: {
        position: 'absolute',
        top: 7,
        right: 8,
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: '#7C5CFF',
    },

    stepRow: {
        marginTop: 28,
        paddingHorizontal: 14,
        flexDirection: 'row',
        alignItems: 'center',
    },

    stepText: {
        color: '#E5E5E5',
        fontSize: 13,
        marginLeft: 12,
        fontWeight: '600',
    },

    sectionTitle: {
        color: '#FFB36B',
        fontSize: 11,
        fontWeight: '900',
        letterSpacing: 1.2,
        marginTop: 34,
        marginBottom: 22,
        paddingHorizontal: 14,
    },

    list: {
        gap: 16,
    },

    card: {
        minHeight: 74,
        backgroundColor: '#17171D',
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#2A2A33',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 18,
    },

    iconBox: {
        width: 43,
        height: 43,
        borderRadius: 5,
        backgroundColor: '#2B2B35',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 18,
    },

    textBox: {
        flex: 1,
    },

    cardTitle: {
        color: theme.colors.text,
        fontSize: 18,
        fontWeight: '800',
    },

    cardSub: {
        color: '#C7C7C7',
        fontSize: 12,
        marginTop: 5,
        fontWeight: '600',
    },

    switch: {
        transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }],
    },

    continueBtn: {
        marginTop: 34,
        height: 56,
        borderRadius: 16,
        backgroundColor: '#FFB19F',
        alignItems: 'center',
        justifyContent: 'center',
    },

    continueText: {
        color: '#080808',
        fontSize: 15,
        fontWeight: '900',
    },
});
