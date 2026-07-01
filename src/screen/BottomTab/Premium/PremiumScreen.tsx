import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../../component/common/ScreenHeader';

const features = [
    {
        icon: 'block-helper',
        title: 'Zero Interruptions',
        text: 'Focus 100% on your form and calories. No ads, ever.',
    },
    {
        icon: 'rocket-launch-outline',
        title: 'Faster Loading',
        text: 'Optimized data streams for instant workout playback.',
    },
    {
        icon: 'cloud-download-outline',
        title: 'Offline Mode',
        text: 'Download video routines to train anywhere, signal or not.',
    },
];

export default function PremiumScreen() {
    const [selectedPlan, setSelectedPlan] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#050505" barStyle="light-content" />
            <ScreenHeader title="" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scroll}>



                <Text style={styles.title}>
                    Pure Performance,{'\n'}No Distractions.
                </Text>

                <Text style={styles.subtitle}>
                    Unlock the elite workout experience with faster sessions,
                    offline access and zero interruptions.
                </Text>

                <View style={styles.featuresCard}>
                    {features.map((item, index) => (
                        <View
                            key={item.title}
                            style={[
                                styles.featureRow,
                                index !== features.length - 1 && styles.featureBorder,
                            ]}>

                            <View style={styles.featureIconBox}>
                                <MaterialCommunityIcons
                                    name={item.icon}
                                    size={18}
                                    color="#FF9500"
                                />
                            </View>

                            <View style={styles.featureTextBox}>
                                <Text style={styles.featureTitle}>{item.title}</Text>
                                <Text style={styles.featureText}>{item.text}</Text>
                            </View>

                            <View style={styles.checkBox}>
                                <Ionicons name="checkmark" size={12} color="#050505" />
                            </View>
                        </View>
                    ))}
                </View>

                <TouchableOpacity
                    activeOpacity={0.9}
                    style={[styles.planCard, selectedPlan && { borderColor: ORANGE }]}
                    onPress={() => setSelectedPlan(true)}>
                    <View style={styles.planGlow} />

                    <View style={styles.planTop}>
                        <View>
                            <Text style={styles.planSmall}>AD-FREE MONTHLY PLAN</Text>
                            <Text style={styles.planName}>Premium Access</Text>
                        </View>

                        <View style={styles.bestBadge}>
                            <Text style={styles.bestText}>BEST VALUE</Text>
                        </View>
                    </View>

                    <View style={styles.priceRow}>
                        <Text style={styles.price}>$4.99</Text>
                        <Text style={styles.month}>/ month</Text>
                    </View>

                    <Text style={styles.priceSub}>
                        Billed monthly. Cancel anytime.
                    </Text>

                    <View style={styles.planDivider} />

                    <View style={styles.planPoint}>
                        <Ionicons name="checkmark-circle" size={15} color="#FF9500" />
                        <Text style={styles.planPointText}>Ad-free workout experience</Text>
                    </View>

                    <View style={styles.planPoint}>
                        <Ionicons name="checkmark-circle" size={15} color="#FF9500" />
                        <Text style={styles.planPointText}>Offline videos and faster loading</Text>
                    </View>

                    <View style={styles.secureRow}>
                        <Ionicons name="lock-closed" size={12} color="#FF9500" />
                        <Text style={styles.secureText}>PAY SECURELY WITH APP STORE</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.subscribeBtn}
                    onPress={() => Alert.alert(
                        'Premium Access',
                        selectedPlan
                            ? 'App Store purchase setup is ready for integration.'
                            : 'Select the Premium Access plan first.',
                    )}>
                    <Text style={styles.subscribeText}>CONTINUE</Text>
                    <Ionicons name="arrow-forward" size={18} color="#050505" />
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => Alert.alert('Restore Purchase', 'No previous purchase was found.')}>
                    <Text style={styles.restoreText}>Restore Purchase</Text>
                </TouchableOpacity>

                <Text style={styles.footerText}>
                    BY CONTINUING, YOU AGREE TO OUR TERMS OF SERVICE. SUBSCRIPTION
                    RENEWS AUTOMATICALLY UNLESS CANCELLED.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const ORANGE = '#FF9500';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#050505',
    },

    scroll: {
        paddingHorizontal: 22,
        paddingBottom: 60,
    },

    hero: {
        marginTop: 18,
        height: 138,
        alignItems: 'center',
        justifyContent: 'center',
    },

    glowBig: {
        position: 'absolute',
        width: 180,
        height: 180,
        borderRadius: 90,
        backgroundColor: 'rgba(255,149,0,0.16)',
    },

    glowSmall: {
        position: 'absolute',
        width: 115,
        height: 115,
        borderRadius: 58,
        backgroundColor: 'rgba(255,149,0,0.20)',
    },

    heroIconOuter: {
        width: 96,
        height: 96,
        borderRadius: 28,
        backgroundColor: 'rgba(255,149,0,0.10)',
        borderWidth: 1,
        borderColor: 'rgba(255,149,0,0.35)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    heroIcon: {
        width: 72,
        height: 72,
        borderRadius: 22,
        backgroundColor: ORANGE,
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        color: '#FFFFFF',
        fontSize: 25,
        lineHeight: 32,
        fontWeight: '900',
        textAlign: 'center',
        marginTop: 10,
    },

    subtitle: {
        color: '#A1A1AA',
        fontSize: 13,
        lineHeight: 21,
        textAlign: 'center',
        marginTop: 12,
        paddingHorizontal: 10,
    },

    featuresCard: {
        marginTop: 34,
        borderRadius: 24,
        backgroundColor: '#111318',
        borderWidth: 1,
        borderColor: '#242833',
        paddingHorizontal: 14,
    },

    featureRow: {
        minHeight: 78,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
    },

    featureBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#252933',
    },

    featureIconBox: {
        width: 42,
        height: 42,
        borderRadius: 15,
        backgroundColor: 'rgba(255,149,0,0.12)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 13,
    },

    featureTextBox: {
        flex: 1,
    },

    featureTitle: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '900',
    },

    featureText: {
        color: '#8F8F99',
        fontSize: 11,
        lineHeight: 17,
        marginTop: 5,
    },

    checkBox: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: ORANGE,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },

    planCard: {
        marginTop: 24,
        borderRadius: 26,
        borderWidth: 1.6,
        borderColor: ORANGE,
        backgroundColor: '#0B0B0D',
        padding: 18,
        overflow: 'hidden',
    },

    planGlow: {
        position: 'absolute',
        right: -35,
        top: -35,
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255,149,0,0.12)',
    },

    planTop: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },

    planSmall: {
        color: ORANGE,
        fontSize: 10,
        fontWeight: '900',
    },

    planName: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '900',
        marginTop: 5,
    },

    bestBadge: {
        backgroundColor: ORANGE,
        paddingHorizontal: 9,
        paddingVertical: 6,
        borderRadius: 10,
    },

    bestText: {
        color: '#050505',
        fontSize: 8,
        fontWeight: '900',
    },

    priceRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 14,
    },

    price: {
        color: '#FFFFFF',
        fontSize: 42,
        fontWeight: '900',
        letterSpacing: -1,
    },

    month: {
        color: '#A1A1AA',
        fontSize: 13,
        fontWeight: '700',
        marginBottom: 8,
        marginLeft: 5,
    },

    priceSub: {
        color: '#A1A1AA',
        fontSize: 12,
        marginTop: 4,
    },

    planDivider: {
        height: 1,
        backgroundColor: '#252525',
        marginVertical: 16,
    },

    planPoint: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },

    planPointText: {
        color: '#D4D4D8',
        fontSize: 12,
        marginLeft: 8,
        fontWeight: '600',
    },

    secureRow: {
        marginTop: 8,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255,149,0,0.10)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    secureText: {
        color: '#D4D4D8',
        fontSize: 9,
        fontWeight: '900',
        marginLeft: 6,
    },

    subscribeBtn: {
        height: 56,
        borderRadius: 20,
        backgroundColor: ORANGE,
        marginTop: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    subscribeText: {
        color: '#050505',
        fontSize: 15,
        fontWeight: '900',
        marginRight: 8,
    },

    restoreText: {
        color: '#A1A1AA',
        fontSize: 12,
        fontWeight: '800',
        textAlign: 'center',
        marginTop: 18,
    },

    footerText: {
        color: '#5F6068',
        fontSize: 8,
        lineHeight: 14,
        textAlign: 'center',
        marginTop: 18,
        paddingHorizontal: 8,
    },
});
