import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    Animated,
    ScrollView,
    StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import StatusBarComponent from '../../../../component/common/StatusBarCompoent';
import FitnessHeader from '../../../../component/common/FitnessHeader';
import { useAppTheme } from '../../../../theme/ThemeProvider';
import { AppThemeColors } from '../../../../theme/colors';
import ScreenNameEnum from '../../../../routes/screenName.enum';

const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

export default function ExploreScreen() {
    const navigation = useNavigation<any>();
    const { theme } = useAppTheme();
    const styles = makeStyles(theme.colors);

    const fade = useRef(new Animated.Value(0)).current;
    const slide = useRef(new Animated.Value(30)).current;
    const scale = useRef(new Animated.Value(0.96)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fade, {
                toValue: 1,
                duration: 650,
                useNativeDriver: true,
            }),
            Animated.spring(slide, {
                toValue: 0,
                useNativeDriver: true,
                friction: 7,
            }),
            Animated.spring(scale, {
                toValue: 1,
                useNativeDriver: true,
                friction: 6,
            }),
        ]).start();
    }, [fade, slide, scale]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />


            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scroll}>

                <Animated.View
                    style={[
                        styles.content,
                        {
                            opacity: fade,
                            transform: [{ translateY: slide }, { scale }],
                        },
                    ]}>

                    <FitnessHeader style={styles.header} iconSize={20} />

                    <View style={styles.weekCard}>
                        {days.map((day, index) => {
                            const active = index < 4;
                            const today = index === 3;

                            return (
                                <View
                                    key={day}
                                    style={[styles.dayBox, today && styles.todayBox]}>

                                    <Text style={[styles.dayText, active && styles.dayActiveText]}>
                                        {day}
                                    </Text>

                                    <View style={[styles.fireBox, active && styles.fireActive]}>
                                        <MaterialCommunityIcons
                                            name="lightning-bolt"
                                            size={18}
                                            color={active ? theme.colors.warning : theme.colors.iconMuted}
                                        />
                                    </View>
                                </View>
                            );
                        })}
                    </View>

                    <View style={styles.streakCard}>
                        <View style={styles.flameCircle}>
                            <Ionicons name="flame" size={28} color={theme.colors.warning} />
                        </View>

                        <View style={styles.streakInfo}>
                            <Text style={styles.streakTitle}>12 DAY STREAK</Text>
                            <Text style={styles.streakSub}>Keep pushing, you’re on fire!</Text>
                        </View>

                        <View style={styles.streakBadge}>
                            <Text style={styles.streakBadgeText}>+24%</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={styles.challengeCard}
                        onPress={() => navigation.navigate(ScreenNameEnum.IsolationCardio)}>

                        <ImageBackground
                            source={{
                                uri: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200',
                            }}
                            style={styles.challengeImage}
                            imageStyle={styles.challengeImageStyle}>

                            <View style={styles.overlay} />

                            <View style={styles.challengeTag}>
                                <Ionicons name="flash" size={14} color={theme.colors.textInverse} />
                                <Text style={styles.challengeTagText}>New Challenge</Text>
                            </View>

                            <View style={styles.challengeContent}>
                                <Text style={styles.challengeTitle}>Elite Cardio Burn</Text>

                                <Text style={styles.challengeSub}>
                                    Train with Coach Sarah and push your limits today.
                                </Text>

                                <TouchableOpacity
                                    activeOpacity={0.85}
                                    style={styles.startBtn}
                                    onPress={() => navigation.navigate(ScreenNameEnum.IsolationCardio)}>

                                    <Text style={styles.startText}>START NOW</Text>
                                    <Ionicons
                                        name="arrow-forward"
                                        size={16}
                                        color={theme.colors.buttonText}
                                    />
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>

                    <View style={styles.sectionHeader}>
                        <View>
                            <Text style={styles.sectionTitle}>Today Workout</Text>
                            <Text style={styles.sectionSub}>Recommended for your goal</Text>
                        </View>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate(ScreenNameEnum.ExerciseLibrary)}>
                            <Text style={styles.seeAll}>See all</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.86}
                        style={styles.workoutCard}
                        onPress={() => navigation.navigate(ScreenNameEnum.WorkoutPlan)}>

                        <View style={styles.workIcon}>
                            <Ionicons
                                name="barbell-outline"
                                size={26}
                                color={theme.colors.warning}
                            />
                        </View>

                        <View style={styles.workInfo}>
                            <Text style={styles.workTitle}>Upper Body Strength</Text>
                            <Text style={styles.workSub}>35 min • 8 exercises</Text>
                        </View>

                        <View style={styles.chevronBox}>
                            <Ionicons
                                name="chevron-forward"
                                size={20}
                                color={theme.colors.iconMuted}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.86}
                        style={styles.workoutCard}
                        onPress={() => navigation.navigate(ScreenNameEnum.WorkoutTime)}>

                        <View style={styles.workIcon}>
                            <Ionicons
                                name="walk-outline"
                                size={26}
                                color={theme.colors.warning}
                            />
                        </View>

                        <View style={styles.workInfo}>
                            <Text style={styles.workTitle}>Fat Burn Cardio</Text>
                            <Text style={styles.workSub}>20 min • Beginner friendly</Text>
                        </View>

                        <View style={styles.chevronBox}>
                            <Ionicons
                                name="chevron-forward"
                                size={20}
                                color={theme.colors.iconMuted}
                            />
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
}

const makeStyles = (colors: AppThemeColors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },

        scroll: {
            paddingBottom: 120,
        },

        content: {
            paddingHorizontal: 20,
            paddingTop: 16,
            paddingBottom: 20,
        },

        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },

        weekCard: {
            marginTop: 30,
            paddingVertical: 14,
            paddingHorizontal: 10,
            borderRadius: 24,
            backgroundColor: colors.card,
            borderWidth: 1,
            borderColor: colors.border,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },

        dayBox: {
            width: 42,
            alignItems: 'center',
            paddingVertical: 4,
            borderRadius: 16,
        },

        todayBox: {
            backgroundColor: colors.primarySoft,
        },

        dayText: {
            color: colors.textMuted,
            fontSize: 11,
            fontWeight: '800',
            marginBottom: 8,
        },

        dayActiveText: {
            color: colors.text,
        },

        fireBox: {
            width: 36,
            height: 36,
            borderRadius: 14,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
            alignItems: 'center',
            justifyContent: 'center',
        },

        fireActive: {
            borderColor: colors.warning,
            backgroundColor: colors.primarySoft,
        },

        streakCard: {
            marginTop: 24,
            padding: 18,
            borderRadius: 26,
            backgroundColor: colors.card,
            borderWidth: 1,
            borderColor: colors.border,
            flexDirection: 'row',
            alignItems: 'center',
        },

        flameCircle: {
            width: 50,
            height: 50,
            borderRadius: 18,
            backgroundColor: colors.primarySoft,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 14,
        },

        streakInfo: {
            flex: 1,
        },

        streakTitle: {
            color: colors.text,
            fontSize: 25,
            fontWeight: '900',
            letterSpacing: -0.8,
        },

        streakSub: {
            color: colors.textMuted,
            fontSize: 13,
            marginTop: 4,
        },

        streakBadge: {
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 14,
            backgroundColor: colors.primarySoft,
        },

        streakBadgeText: {
            color: colors.primary,
            fontSize: 12,
            fontWeight: '900',
        },

        challengeCard: {
            marginTop: 26,
            height: 265,
            borderRadius: 30,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.card,
            elevation: 8,
        },

        challengeImage: {
            flex: 1,
            justifyContent: 'flex-end',
        },

        challengeImageStyle: {
            borderRadius: 30,
        },

        overlay: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: colors.overlay,
        },

        challengeTag: {
            position: 'absolute',
            top: 18,
            left: 18,
            height: 34,
            paddingHorizontal: 13,
            borderRadius: 17,
            backgroundColor: colors.button,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
        },

        challengeTagText: {
            color: colors.buttonText,
            fontSize: 11,
            fontWeight: '900',
        },

        challengeContent: {
            margin: 18,
            padding: 20,
            borderRadius: 24,
            backgroundColor: colors.modal,
        },

        challengeTitle: {
            color: colors.text,
            fontSize: 24,
            fontWeight: '900',
        },

        challengeSub: {
            color: colors.textSecondary,
            fontSize: 13,
            lineHeight: 19,
            marginTop: 8,
        },

        startBtn: {
            marginTop: 18,
            height: 46,
            borderRadius: 16,
            backgroundColor: colors.button,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: 8,
        },

        startText: {
            color: colors.buttonText,
            fontSize: 12,
            fontWeight: '900',
            letterSpacing: 1,
        },

        sectionHeader: {
            marginTop: 30,
            marginBottom: 14,
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
        },

        sectionTitle: {
            color: colors.text,
            fontSize: 21,
            fontWeight: '900',
        },

        sectionSub: {
            color: colors.textMuted,
            fontSize: 12,
            marginTop: 4,
        },

        seeAll: {
            color: colors.primary,
            fontSize: 13,
            fontWeight: '800',
        },

        workoutCard: {
            minHeight: 84,
            borderRadius: 24,
            backgroundColor: colors.card,
            borderWidth: 1,
            borderColor: colors.border,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            marginBottom: 14,
            elevation: 3,
        },

        workIcon: {
            width: 54,
            height: 54,
            borderRadius: 19,
            backgroundColor: colors.primarySoft,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 14,
        },

        workInfo: {
            flex: 1,
        },

        workTitle: {
            color: colors.text,
            fontSize: 15,
            fontWeight: '900',
        },

        workSub: {
            color: colors.textMuted,
            fontSize: 12,
            marginTop: 5,
        },

        chevronBox: {
            width: 34,
            height: 34,
            borderRadius: 17,
            backgroundColor: colors.surface,
            alignItems: 'center',
            justifyContent: 'center',
        },
    });
