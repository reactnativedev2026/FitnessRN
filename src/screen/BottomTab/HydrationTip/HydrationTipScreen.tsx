import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenNameEnum from '../../../routes/screenName.enum';

export default function HydrationTipScreen({ navigation }: any) {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#050505" barStyle="light-content" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scroll}>

                <View style={styles.header}>
                    <View style={styles.userRow}>
                        <TouchableOpacity
                            accessibilityLabel="Go back"
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" size={19} color="#fff" />
                        </TouchableOpacity>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>👨🏻‍🦱</Text>
                        </View>

                        <View>
                            <Text style={styles.hello}>Hello!</Text>
                            <Text style={styles.name}>Alex Vaccaro</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.bellBtn}
                        onPress={() => navigation.navigate(ScreenNameEnum.NotificationsScreen)}>
                        <Ionicons name="notifications" size={18} color="#fff" />
                        <View style={styles.bellDot} />
                    </TouchableOpacity>
                </View>

                <View style={styles.hydrationCard}>
                    <View style={styles.waterIcon}>
                        <Ionicons name="water" size={16} color="#FFB072" />
                    </View>

                    <View style={styles.hydrationInfo}>
                        <Text style={styles.hydrationTitle}>3.5L Daily Hydration</Text>
                        <Text style={styles.hydrationSub}>
                            OPTIMAL FOR MUSCLE VOLUMIZATION
                        </Text>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.85}
                        style={styles.logBtn}
                        onPress={() => navigation.navigate(ScreenNameEnum.HydrationGoal)}>
                        <Text style={styles.logText}>LOG{'\n'}WATER</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.tipCard}>
                    <View style={styles.tipIcon}>
                        <MaterialCommunityIcons
                            name="head-cog-outline"
                            size={28}
                            color="#1A1210"
                        />
                    </View>

                    <Text style={styles.tipLabel}>AI PRO TIP</Text>

                    <Text style={styles.tipTitle}>Nutrient Timing for Hypertrophy</Text>

                    <Text style={styles.tipText}>
                        Consuming 40g of fast-acting protein and 60g of complex
                        carbohydrates within 45 minutes of your high-intensity sessions is
                        critical. This maximizes the anabolic window, spikes insulin
                        strategically to transport amino acids, and accelerates myofibrillar
                        repair.
                    </Text>

                    <TouchableOpacity
                        activeOpacity={0.88}
                        style={styles.protocolBtn}
                        onPress={() => navigation.navigate(ScreenNameEnum.MealRecommendation)}>
                        <Text style={styles.protocolText}>VIEW PROTOCOL</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const ORANGE = '#FFB072';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#050505',
    },

    scroll: {
        paddingHorizontal: 24,
        paddingTop: 22,
        paddingBottom: 70,
        minHeight: '100%',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    userRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    backButton: {
        alignItems: 'center',
        height: 34,
        justifyContent: 'center',
        marginRight: 7,
        width: 28,
    },

    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#24242B',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },

    avatarText: {
        fontSize: 18,
    },

    hello: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: '700',
    },

    name: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '900',
        marginTop: 2,
    },

    bellBtn: {
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },

    bellDot: {
        position: 'absolute',
        top: 7,
        right: 7,
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: '#7B61FF',
    },

    hydrationCard: {
        marginTop: 42,
        minHeight: 86,
        borderRadius: 6,
        backgroundColor: '#191B22',
        borderWidth: 1,
        borderColor: '#292C35',
        paddingHorizontal: 18,
        flexDirection: 'row',
        alignItems: 'center',
    },

    waterIcon: {
        width: 32,
        height: 32,
        borderRadius: 4,
        backgroundColor: '#30313A',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 18,
    },

    hydrationInfo: {
        flex: 1,
    },

    hydrationTitle: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '700',
        letterSpacing: 0.4,
    },

    hydrationSub: {
        color: '#FFFFFF',
        fontSize: 9,
        lineHeight: 13,
        fontWeight: '900',
        letterSpacing: 1.2,
        marginTop: 3,
        width: '80%',
    },

    logBtn: {
        width: 70,
        height: 42,
        borderRadius: 2,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },

    logText: {
        color: '#050505',
        fontSize: 8,
        fontWeight: '900',
        textAlign: 'center',
        lineHeight: 11,
    },

    tipCard: {
        marginTop: 72,
        borderRadius: 6,
        backgroundColor: '#373840',
        borderWidth: 1,
        borderColor: ORANGE,
        paddingHorizontal: 34,
        paddingTop: 58,
        paddingBottom: 28,
        minHeight: 420,
    },

    tipIcon: {
        alignSelf: 'center',
        width: 76,
        height: 76,
        borderRadius: 8,
        backgroundColor: ORANGE,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 42,
    },

    tipLabel: {
        color: ORANGE,
        fontSize: 9,
        fontWeight: '900',
        letterSpacing: 1.2,
        marginBottom: 8,
    },

    tipTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 22,
        marginBottom: 16,
    },

    tipText: {
        color: '#FFFFFF',
        fontSize: 14,
        lineHeight: 24,
        fontWeight: '400',
    },

    protocolBtn: {
        alignSelf: 'center',
        marginTop: 42,
        width: 154,
        height: 46,
        borderRadius: 2,
        borderWidth: 1.4,
        borderColor: ORANGE,
        alignItems: 'center',
        justifyContent: 'center',
    },

    protocolText: {
        color: ORANGE,
        fontSize: 9,
        fontWeight: '900',
        letterSpacing: 1,
    },
});
