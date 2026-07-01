import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from 'react-native';
import AppSafeAreaView from '../../../../component/common/AppSafeAreaView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StatusBarComponent from '../../../../component/common/StatusBarCompoent';
import { useAppTheme } from '../../../../theme/ThemeProvider';
import { AppThemeColors } from '../../../../theme/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoutModal from '../../../../component/LogoutModal';

const { width } = Dimensions.get('window');

const leaders = [
    { rank: 1, name: 'Alfred Owen', points: 420, emoji: '👦🏻' },
    { rank: 2, name: 'Linh Nguyen', points: 390, emoji: '👩🏻' },
    { rank: 3, name: 'Marco Silva', points: 370, emoji: '👨🏽' },
    { rank: 4, name: 'Elena Rodriguez', points: 380, emoji: '👩‍🎤', days: 5 },
    { rank: 5, name: 'You (Alex)', points: 340, emoji: '🧑🏻‍💻', days: 8 },
    { rank: 4, name: 'Elena Rodriguez', points: 380, emoji: '👩‍🎤', days: 5 },
];

export default function RanksScreen() {
    const { theme } = useAppTheme();
    const styles = makeStyles(theme.colors);

    const topThree = leaders.slice(0, 3);
    const list = leaders.slice(3);

    const [logoutModalVisible, setLogoutModalVisible] = useState(false);
    const { isDark, setThemeMode } = useAppTheme();
    const handleLogout = async () => {
        setLogoutModalVisible(false);
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('authData');
    };
    return (
        <SafeAreaView style={styles.container}>
            <StatusBarComponent />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scroll}>


                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flex: 1,
                    marginHorizontal: 5,
                    marginBottom: 15

                }}>


                    <Text style={styles.screenTitle}></Text>
                    <Text style={styles.screenTitle}>Ranking</Text>
                    <TouchableOpacity
                        style={{
                            right: 15
                        }}
                        onPress={() => setLogoutModalVisible(true)}>

                        <Ionicons name="log-out-outline" size={27} color="red" />
                    </TouchableOpacity>

                </View>

                <View style={styles.podiumWrapper}>
                    <View style={styles.sideUser}>
                        <View style={styles.avatarSide}>
                            <Text style={styles.sideEmoji}>{topThree[1].emoji}</Text>
                        </View>
                        <View style={styles.rankBadgeDark}>
                            <Text style={styles.badgeText}>#2</Text>
                        </View>
                        <Text style={styles.sideName}>{topThree[1].name}</Text>
                        <Text style={styles.sidePoints}>{topThree[1].points} pts</Text>
                    </View>

                    <View style={styles.centerUser}>
                        <View style={styles.crownBox}>
                            <Ionicons name="trophy" size={20} color="#F5B942" />
                        </View>

                        <View style={styles.avatarGlow}>
                            <View style={styles.avatarBig}>
                                <Text style={styles.centerEmoji}>{topThree[0].emoji}</Text>
                            </View>
                        </View>

                        <View style={styles.rankBadgeBlue}>
                            <Text style={styles.badgeTextWhite}>#1</Text>
                        </View>

                        <Text style={styles.centerName}>{topThree[0].name}</Text>
                        <Text style={styles.centerPoints}>{topThree[0].points} pts</Text>
                    </View>

                    <View style={styles.sideUser}>
                        <View style={styles.avatarSide}>
                            <Text style={styles.sideEmoji}>{topThree[2].emoji}</Text>
                        </View>
                        <View style={styles.rankBadgeDark}>
                            <Text style={styles.badgeText}>#3</Text>
                        </View>
                        <Text style={styles.sideName}>{topThree[2].name}</Text>
                        <Text style={[styles.sidePoints]}>{topThree[2].points} pts</Text>
                    </View>
                </View>

                <View style={styles.leaderBox}>
                    <View style={styles.headerRow}>
                        <View>
                            <Text style={styles.title}>Leader Board</Text>
                            <Text style={styles.subtitle}>Weekly ranking progress</Text>
                        </View>

                        <View style={styles.filterBtn}>
                            <Ionicons name="filter" size={17} color={theme.colors.iconMuted} />
                        </View>
                    </View>

                    {list.map(item => {
                        const isMe = item.rank === 5;

                        return (
                            <View
                                key={`${item.rank}-${item.name}`}
                                style={[styles.card, isMe && styles.activeCard]}>

                                <View style={[styles.rankCircle, isMe && styles.rankCircleActive]}>
                                    <Text style={[styles.rank, isMe && styles.rankActive]}>
                                        {item.rank}
                                    </Text>
                                </View>

                                <View style={[styles.listAvatar, isMe && styles.meAvatar]}>
                                    <Text style={styles.listEmoji}>{item.emoji}</Text>
                                </View>

                                <View style={styles.info}>
                                    <Text style={styles.userName}>{item.name}</Text>

                                    <View style={styles.pointsRow}>
                                        <Ionicons
                                            name="star"
                                            size={12}
                                            color={isMe ? theme.colors.primary : theme.colors.textMuted}
                                        />
                                        <Text style={styles.points}>{item.points} Points</Text>
                                    </View>
                                </View>

                                <View style={[styles.daysBox, isMe && styles.daysBlue]}>
                                    <Ionicons
                                        name={isMe ? 'flash' : 'flame'}
                                        size={13}
                                        color={theme.colors.textInverse}
                                    />
                                    <Text style={styles.daysText}>{item.days} Days</Text>
                                </View>
                            </View>
                        );
                    })}
                </View>
                <LogoutModal
                    visible={logoutModalVisible}
                    onCancel={() => setLogoutModalVisible(false)}
                    onLogout={handleLogout}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const AVATAR_BIG = width * 0.29;
const AVATAR_SIDE = width * 0.21;

const makeStyles = (colors: AppThemeColors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },

        scroll: {
            paddingTop: 16,
            paddingBottom: 20,

        },

        topHeader: {
            paddingHorizontal: 20,
            marginBottom: 26,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },

        iconBtn: {
            width: 42,
            height: 42,
            borderRadius: 21,
            backgroundColor: colors.card,
            borderWidth: 1,
            borderColor: colors.border,
            alignItems: 'center',
            justifyContent: 'center',
        },

        screenTitle: {
            color: colors.text,
            fontSize: 20,
            fontWeight: '900',
            textAlign: "center"
        },

        podiumWrapper: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            paddingHorizontal: 18,
            marginBottom: 25,
        },

        sideUser: {
            width: '30%',
            alignItems: 'center',
            marginTop: 50,
        },

        centerUser: {
            width: '38%',
            alignItems: 'center',
        },

        crownBox: {
            width: 38,
            height: 38,
            borderRadius: 19,
            backgroundColor: colors.card,
            borderWidth: 1,
            borderColor: colors.border,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 8,
        },

        avatarSide: {
            width: AVATAR_SIDE,
            height: AVATAR_SIDE,
            borderRadius: AVATAR_SIDE / 2,
            backgroundColor: colors.rankSideAvatar,
            borderWidth: 5,
            borderColor: colors.rankSideBorder,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOpacity: 0.12,
            shadowRadius: 10,
            elevation: 5,
        },

        avatarGlow: {
            width: AVATAR_BIG + 14,
            height: AVATAR_BIG + 14,
            borderRadius: (AVATAR_BIG + 14) / 2,
            backgroundColor: colors.rankGoldGlow,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: colors.rankGoldShadow,
            shadowOpacity: 0.45,
            shadowRadius: 16,
            elevation: 10,
        },

        avatarBig: {
            width: AVATAR_BIG,
            height: AVATAR_BIG,
            borderRadius: AVATAR_BIG / 2,
            backgroundColor: colors.rankGold,
            borderWidth: 5,
            borderColor: colors.surface,
            alignItems: 'center',
            justifyContent: 'center',
        },

        sideEmoji: {
            fontSize: 35,
        },

        centerEmoji: {
            fontSize: 56,
        },

        rankBadgeDark: {
            marginTop: -11,
            backgroundColor: colors.surfaceMuted,
            borderRadius: 20,
            paddingHorizontal: 13,
            paddingVertical: 5,
            borderWidth: 1,
            borderColor: colors.border,
        },

        rankBadgeBlue: {
            marginTop: -12,
            backgroundColor: colors.primary,
            borderRadius: 20,
            paddingHorizontal: 16,
            paddingVertical: 6,
        },

        badgeText: {
            color: colors.text,
            fontSize: 11,
            fontWeight: '900',
        },

        badgeTextWhite: {
            color: colors.textInverse,
            fontSize: 11,
            fontWeight: '900',
        },

        sideName: {
            color: colors.text,
            fontSize: 12,
            fontWeight: '800',
            marginTop: 8,
            textAlign: 'center',
        },

        sidePoints: {
            color: colors.textMuted,
            fontSize: 11,
            marginTop: 3,
        },

        centerName: {
            color: colors.text,
            fontSize: 16,
            fontWeight: '900',
            marginTop: 8,
            textAlign: 'center',
        },

        centerPoints: {
            color: colors.primary,
            fontSize: 12,
            fontWeight: '800',
            marginTop: 3,
        },

        leaderBox: {
            marginHorizontal: 18,
            borderRadius: 26,

        },

        headerRow: {
            marginBottom: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },

        title: {
            color: colors.text,
            fontSize: 22,
            fontWeight: '900',
        },

        subtitle: {
            color: colors.textMuted,
            fontSize: 15,
        },

        filterBtn: {
            width: 38,
            height: 38,
            borderRadius: 19,
            backgroundColor: colors.card,
            borderWidth: 1,
            borderColor: colors.border,
            alignItems: 'center',
            justifyContent: 'center',
        },

        card: {
            minHeight: 76,
            borderRadius: 20,
            backgroundColor: colors.card,
            borderWidth: 1,
            borderColor: colors.border,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 12,
            marginBottom: 10,
        },

        activeCard: {
            backgroundColor: colors.primarySoft,
            borderColor: colors.primary,
            shadowColor: colors.primary,
            shadowOpacity: 0.15,
            shadowRadius: 12,
            elevation: 5,
        },

        rankCircle: {
            width: 28,
            height: 28,
            borderRadius: 14,
            backgroundColor: colors.surfaceMuted,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10,
        },

        rankCircleActive: {
            backgroundColor: colors.primary,
        },

        rank: {
            color: colors.textSecondary,
            fontSize: 12,
            fontWeight: '900',
        },

        rankActive: {
            color: colors.textInverse,
        },

        listAvatar: {
            width: 46,
            height: 46,
            borderRadius: 23,
            backgroundColor: colors.rankPink,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
        },

        meAvatar: {
            backgroundColor: colors.rankMeAvatar,
        },

        listEmoji: {
            fontSize: 25,
        },

        info: {
            flex: 1,
        },

        userName: {
            color: colors.text,
            fontSize: 14,
            fontWeight: '800',
        },

        pointsRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            marginTop: 4,
        },

        points: {
            color: colors.textMuted,
            fontSize: 12,
            fontWeight: '600',
        },

        daysBox: {
            height: 32,
            borderRadius: 18,
            paddingHorizontal: 10,
            backgroundColor: colors.streakFire,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
        },

        daysBlue: {
            backgroundColor: colors.streakFireActive,
        },

        daysText: {
            color: colors.textInverse,
            fontSize: 11,
            fontWeight: '900',
        },
    });
