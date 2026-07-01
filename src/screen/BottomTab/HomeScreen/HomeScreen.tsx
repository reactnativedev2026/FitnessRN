import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import AppSafeAreaView from '../../../component/common/AppSafeAreaView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Svg, { Circle } from 'react-native-svg';
import StatusBarComponent from '../../../component/common/StatusBarCompoent';
import { useAppTheme } from '../../../theme/ThemeProvider';
import { AppThemeColors } from '../../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../../routes/screenName.enum';
import FitnessHeader from '../../../component/common/FitnessHeader';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type InfoCardProps = {
    icon: string;
    iconColor: string;
    label: string;
    value: string;
    right?: string;
    progress?: number;
    actionIcon?: string;
    badge?: string;
    onPress?: () => void;
};

export default function HomeScreen() {
    const navigation = useNavigation<any>();
    const { theme } = useAppTheme();
    const styles = makeStyles(theme.colors);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />


            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                <FitnessHeader style={styles.header} iconSize={21} />

                <View style={styles.progressCard}>
                    <View>
                        <Text style={styles.cardTitle}>Daily Progress</Text>
                        <Text style={styles.cardSub}>4 of 6 tasks completed</Text>
                    </View>

                    <View style={styles.percentBox}>
                        <Svg width={78} height={78}>
                            <Circle
                                cx="39"
                                cy="39"
                                r="31"
                                stroke={theme.colors.border}
                                strokeWidth="5"
                                fill="none"
                            />
                            <Circle
                                cx="39"
                                cy="39"
                                r="31"
                                stroke={theme.colors.accent}
                                strokeWidth="5"
                                fill="none"
                                strokeDasharray={`${195 * 0.65} 195`}
                                strokeLinecap="round"
                                rotation="-90"
                                origin="39,39"
                            />
                        </Svg>
                        <Text style={styles.percentText}>65%</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.claimBtn}
                        onPress={() => navigation.navigate(ScreenNameEnum.Marketplace)}
                    >
                        <Ionicons name="star" size={17} color={theme.colors.accentText} />
                        <Text style={styles.claimText}>CLAIM 250 REWARDS POINTS</Text>
                    </TouchableOpacity>
                </View>

                <InfoCard
                    icon="checkmark-done"
                    iconColor={theme.colors.accent}
                    label="TODAY'S MISSIONS"
                    value="4"
                    right="/ 6 Complete"
                    actionIcon="arrow-forward"
                    onPress={() => navigation.navigate(ScreenNameEnum.MissionScreen)}
                />

                <InfoCard
                    icon="barbell"
                    iconColor={theme.colors.accent}
                    label="WORKOUT TIME"
                    value="45"
                    right=" / 60 min"
                    progress={0.75}
                    actionIcon="fitness"
                    onPress={() => navigation.navigate(ScreenNameEnum.FitnessDashboard)}
                />
                <InfoCard
                    icon="water"
                    iconColor={theme.colors.accent}
                    label="DRINK WATER"
                    value="5"
                    right="/ 8 Glasses"
                    actionIcon="add"
                    onPress={() => navigation.navigate(ScreenNameEnum.HydrationGoal)}
                />

                <InfoCard
                    icon="timer"
                    iconColor={theme.colors.icon}
                    label="FASTING"
                    value="Choose a protocol"
                    badge="START"
                    onPress={() => navigation.navigate(ScreenNameEnum.FastingProtocolScreen)}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

function InfoCard({ icon, iconColor, label, value, right, progress, actionIcon, badge, onPress }: InfoCardProps) {
    const { theme } = useAppTheme();
    const styles = makeStyles(theme.colors);

    return (
        <TouchableOpacity activeOpacity={0.86} onPress={onPress} style={styles.infoCard}>
            <View style={styles.iconBox}>
                <Ionicons name={icon} size={23} color={iconColor} />
            </View>

            <View style={styles.infoMiddle}>
                <Text style={styles.label}>{label}</Text>

                <View style={styles.valueRow}>
                    <Text style={styles.value}>{value}</Text>
                    {!!right && <Text style={styles.rightValue}> {right}</Text>}
                </View>

                {progress ? (
                    <View style={styles.lineBg}>
                        <View style={[styles.lineFill, { width: `${progress * 100}%` }]} />
                    </View>
                ) : null}
            </View>

            {actionIcon ? (
                <View style={actionIcon === 'add' ? styles.plusBtn : styles.graphBtn}>
                    <Ionicons name={actionIcon} size={22} color={theme.colors.text} />
                </View>
            ) : null}

            {badge ? (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{badge}</Text>
                </View>
            ) : null}
        </TouchableOpacity>
    );
}

const makeStyles = (colors: AppThemeColors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    scroll: {
        paddingHorizontal: 18,
        paddingTop: 18,
        paddingBottom: 40,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 18,
    },

    userRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.primarySoft,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },

    avatarText: {
        fontSize: 22,
    },

    hello: {
        color: colors.text,
        fontSize: 12,
        fontWeight: '500',
    },

    name: {
        color: colors.text,
        fontSize: 18,
        fontWeight: '900',
        marginTop: 2,
    },

    bellBox: {
        width: 34,
        height: 34,
        alignItems: 'center',
        justifyContent: 'center',
    },

    dot: {
        position: 'absolute',
        top: 6,
        right: 7,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.primary,
    },

    progressCard: {
        minHeight: 165,
        backgroundColor: colors.card,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 20,
        marginBottom: 18,
    },

    cardTitle: {
        color: colors.text,
        fontSize: 15,
        fontWeight: '700',
        marginTop: 20,
    },

    cardSub: {
        color: colors.textMuted,
        fontSize: 13,
        marginTop: 8,
    },

    percentBox: {
        position: 'absolute',
        top: 22,
        right: 20,
        width: 78,
        height: 78,
        alignItems: 'center',
        justifyContent: 'center',
    },

    percentText: {
        position: 'absolute',
        color: colors.text,
        fontSize: 23,
        fontWeight: '900',
    },

    claimBtn: {
        height: 43,
        borderRadius: 7,
        backgroundColor: colors.accent,
        marginTop: 34,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },

    claimText: {
        color: colors.accentText,
        fontSize: 11,
        fontWeight: '900',
        letterSpacing: 2,
        marginLeft: 8,
    },

    infoCard: {
        backgroundColor: colors.card,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.border,
        paddingHorizontal: 17,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 18,
        padding: 12,
    },

    iconBox: {
        width: 43,
        height: 43,
        borderRadius: 10,
        backgroundColor: colors.surfaceMuted,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },

    infoMiddle: {
        flex: 1,
    },

    label: {
        color: colors.textSecondary,
        fontSize: 9,
        fontWeight: '900',
        letterSpacing: 2.2,
    },

    valueRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginTop: 2,
    },

    value: {
        color: colors.text,
        fontSize: 20,
        fontWeight: '900',
    },

    rightValue: {
        color: colors.textSecondary,
        fontSize: 20,
        fontWeight: '800',
    },

    lineBg: {
        height: 5,
        backgroundColor: colors.border,
        borderRadius: 10,
        marginTop: 8,
        overflow: 'hidden',
    },

    lineFill: {
        height: '100%',
        backgroundColor: colors.accent,
        borderRadius: 10,
    },

    graphBtn: {
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },

    plusBtn: {
        width: 38,
        height: 38,
        borderRadius: 9,
        borderWidth: 1.6,
        borderColor: colors.text,
        alignItems: 'center',
        justifyContent: 'center',
    },

    badge: {
        height: 24,
        borderRadius: 12,
        backgroundColor: colors.primarySoft,
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },

    badgeText: {
        color: colors.primary,
        fontSize: 9,
        fontWeight: '900',
        letterSpacing: 1.5,
    },
});
