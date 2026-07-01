import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenNameEnum from '../../../routes/screenName.enum';
import ScreenHeader from '../../../component/common/ScreenHeader';
import { color } from '../../../theme';

const protocols = [
    {
        id: 1,
        title: '16:8 Protocol',
        desc: 'The gold standard. 16 hours of fasting followed by an 8-hour metabolic window for peak performance.',
        icon: 'timer-outline',
        image:
            'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=900',
    },
    {
        id: 2,
        title: 'Custom Schedule',
        desc: 'Design your own windows. Perfect for advanced practitioners or athletes with unique training cycles.',
        icon: 'calendar-clock',
        image:
            'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=900',
    },
];

export default function FastingProtocolScreen({ navigation }: any) {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#050505" barStyle="light-content" />
            <ScreenHeader title="Fasting Protocol" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scroll}>



                <View style={styles.titleBox}>
                    <Text style={styles.kicker}>FASTING FOCUS</Text>
                    <Text style={styles.title}>Choose Your{'\n'}Fasting Path</Text>
                    <Text style={styles.subtitle}>
                        Tailor your intermittent fasting protocol to align with your
                        metabolism and performance goals.
                    </Text>
                </View>

                <View style={styles.cardsWrapper}>
                    {protocols.map(item => (
                        <TouchableOpacity
                            key={item.id}
                            activeOpacity={0.88}
                            style={styles.card}
                            onPress={() => navigation.navigate(ScreenNameEnum.FastingScreen, {
                                protocol: item.title,
                            })}>

                            <ImageBackground
                                source={{ uri: item.image }}
                                style={styles.cardImage}
                                imageStyle={styles.cardImageStyle}>

                                <View style={styles.overlay} />
                                <View style={styles.cardGlow} />

                                <View style={styles.iconBox}>
                                    {item.id === 1 ? (
                                        <Ionicons name={item.icon} size={22} color="#FF9500" />
                                    ) : (
                                        <MaterialCommunityIcons
                                            name={item.icon}
                                            size={22}
                                            color="#FF9500"
                                        />
                                    )}
                                </View>

                                <View style={styles.cardContent}>
                                    <Text style={styles.cardTitle}>{item.title}</Text>
                                    <Text style={styles.cardDesc}>{item.desc}</Text>
                                </View>

                                <View style={styles.arrowBox}>
                                    <Ionicons name="arrow-forward" size={16} color="#fff" />
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.quickStartBtn}
                    onPress={() => navigation.navigate(ScreenNameEnum.FastingScreen, {
                        protocol: '16:8 Protocol',
                    })}>
                    <Ionicons name="flash" size={17} color="#050505" />
                    <Text style={styles.quickStartText}>START 16:8 FAST</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

const ORANGE = '#FF9500';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background,
    },

    scroll: {
        paddingHorizontal: 22,
        paddingBottom: 60,
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
        borderWidth: 1,
        borderColor: '#353640',
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

    titleBox: {
        marginTop: 34,
    },

    kicker: {
        color: ORANGE,
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1.7,
        marginBottom: 7,
    },

    title: {
        color: '#FFFFFF',
        fontSize: 31,
        lineHeight: 32,
        fontWeight: '900',
        letterSpacing: -1,
    },

    subtitle: {
        color: '#A1A1AA',
        fontSize: 11,
        lineHeight: 17,
        marginTop: 12,
        width: '86%',
    },

    cardsWrapper: {
        marginTop: 24,
        gap: 12,
    },

    card: {
        height: 138,
        borderRadius: 4,
        overflow: 'hidden',
        backgroundColor: '#14161D',
        borderWidth: 1,
        borderColor: '#30323C',
    },

    cardImage: {
        flex: 1,
        justifyContent: 'flex-end',
    },

    cardImageStyle: {
        borderRadius: 4,
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(5,5,5,0.68)',
    },

    cardGlow: {
        position: 'absolute',
        right: -35,
        top: -35,
        width: 125,
        height: 125,
        borderRadius: 65,
        backgroundColor: 'rgba(255,149,0,0.10)',
    },

    iconBox: {
        position: 'absolute',
        top: 14,
        right: 14,
        width: 34,
        height: 34,
        borderRadius: 12,
        backgroundColor: 'rgba(255,149,0,0.12)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,149,0,0.25)',
    },

    cardContent: {
        padding: 20,
        paddingRight: 56,
    },

    cardTitle: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: '900',
        letterSpacing: -0.4,
    },

    cardDesc: {
        color: '#C5C5CE',
        fontSize: 11,
        lineHeight: 17,
        marginTop: 7,
    },

    arrowBox: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(255,255,255,0.08)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    quickStartBtn: {
        height: 54,
        borderRadius: 6,
        backgroundColor: ORANGE,
        marginTop: 26,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    quickStartText: {
        color: '#050505',
        fontSize: 13,
        fontWeight: '900',
        marginLeft: 8,
        letterSpacing: 0.4,
    },
});
