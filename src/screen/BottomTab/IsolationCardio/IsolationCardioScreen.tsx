// IsolationCardioScreen.js
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
import AppSafeAreaView from '../../../component/common/AppSafeAreaView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenNameEnum from '../../../routes/screenName.enum';
import FitnessHeader from '../../../component/common/FitnessHeader';
import ScreenHeader from '../../../component/common/ScreenHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../../../theme/ThemeProvider';


export default function IsolationCardioScreen({ navigation }: any) {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#000" barStyle="light-content" />
            <ScreenHeader title="Isolation Cardio" style={styles.header} />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

                <ImageBackground
                    source={{
                        uri: 'https://images.unsplash.com/photo-1549476464-37392f717541?w=1200&q=80',
                    }}
                    style={styles.hero}
                    imageStyle={styles.heroImg}>
                    <View style={styles.heroOverlay} />

                    <View style={styles.heroContent}>
                        <Text style={styles.featured}>FEATURED MODE</Text>
                        <Text style={styles.heroTitle}>NON-STOP{'\n'}CARDIO</Text>

                        <View style={styles.isoBtn}>
                            <Ionicons name="flash" size={13} color="#fff" />
                            <Text style={styles.isoText}>ISOLATION</Text>
                        </View>
                    </View>
                </ImageBackground>

                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <Text style={styles.statTop}>🧡  BPM SYNC</Text>
                        <Text style={styles.statValue}>142<Text style={styles.unit}> Live</Text></Text>
                        <View style={styles.line} />
                    </View>

                    <View style={styles.statCard}>
                        <Text style={styles.statTop}>🔥  CALORIES</Text>
                        <Text style={styles.statValue}>482<Text style={styles.unit}> kcal</Text></Text>
                        <Text style={styles.orangeSmall}>ELITE PERFORMANCE</Text>
                    </View>
                </View>

                <View style={styles.activeCard}>
                    <View>
                        <Text style={styles.statTop}>⏱  ACTIVE TIME</Text>
                        <Text style={styles.statValue}>24:42.08</Text>
                    </View>

                    <View>
                        <Text style={styles.zone}>ZONE 4</Text>
                        <Text style={styles.zoneSub}>ANAEROBIC</Text>
                    </View>
                </View>

                <View style={styles.intensityRow}>
                    <Text style={styles.intensityTitle}>Intensity</Text>
                    <Text style={styles.elite}>ELITE 85%</Text>
                </View>

                <View style={styles.sliderBox}>
                    <View style={styles.sliderTrack}>
                        <View style={styles.sliderFill} />
                        <View style={styles.sliderDot} />
                    </View>

                    <View style={styles.sliderLabels}>
                        <Text style={styles.sliderLabel}>ENDURANCE</Text>
                        <Text style={styles.sliderLabel}>MAX OUTPUT</Text>
                    </View>
                </View>

                <TouchableOpacity
                    activeOpacity={0.85}
                    style={styles.startBtn}
                    onPress={() => navigation?.navigate(ScreenNameEnum.WorkoutComplete)}
                >
                    <Ionicons name="play-outline" size={28} color="#5A2B12" />
                    <Text style={styles.startText}>START</Text>
                </TouchableOpacity>

                <Text style={styles.footer}>TOUCH TO BEGIN ISOLATION PROTOCOL</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const createStyles = (theme: any) => StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },

    scroll: {
        paddingHorizontal: 18,
        paddingTop: 12,
        paddingBottom: 80,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    userRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#24242A',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },

    avatarText: { fontSize: 18 },
    hello: { color: theme.colors.text, fontSize: 10 },
    name: { color: theme.colors.text, fontSize: 14, fontWeight: '800' },

    dot: {
        position: 'absolute',
        top: 0,
        right: -2,
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: '#7C5CFF',
    },

    hero: {
        height: 220,
        borderRadius: 16,
        overflow: 'hidden',
        marginTop: 28,
        justifyContent: 'flex-end',
    },

    heroImg: { borderRadius: 16 },

    heroOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.46)',
    },

    heroContent: {
        padding: 16,
    },

    featured: {
        color: '#FFB36B',
        fontSize: 10,
        fontWeight: '900',
    },

    heroTitle: {
        color: theme.colors.text,
        fontSize: 18,
        fontWeight: '900',
        marginTop: 4,
    },

    isoBtn: {
        position: 'absolute',
        right: 14,
        bottom: 16,
        height: 32,
        paddingHorizontal: 16,
        borderRadius: 5,
        backgroundColor: '#262630',
        borderWidth: 1,
        borderColor: '#4A4A55',
        flexDirection: 'row',
        alignItems: 'center',
    },

    isoText: {
        color: theme.colors.text,
        fontSize: 11,
        fontWeight: '900',
        marginLeft: 6,
    },

    statsRow: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 18,
    },

    statCard: {
        flex: 1,
        height: 104,
        borderRadius: 8,
        backgroundColor: '#17181F',
        borderWidth: 1,
        borderColor: '#282B34',
        padding: 14,
        justifyContent: 'center',
    },

    statTop: {
        color: '#B8BBC5',
        fontSize: 10,
        fontWeight: '900',
    },

    statValue: {
        color: theme.colors.text,
        fontSize: 29,
        fontWeight: '900',
        marginTop: 10,
    },

    unit: {
        color: '#B8BBC5',
        fontSize: 11,
        fontWeight: '700',
    },

    line: {
        height: 3,
        width: '85%',
        borderRadius: 3,
        backgroundColor: '#FFB36B',
        marginTop: 10,
    },

    orangeSmall: {
        color: '#FFB36B',
        fontSize: 8,
        fontWeight: '900',
        marginTop: 5,
    },

    activeCard: {
        marginTop: 14,
        height: 86,
        borderRadius: 8,
        backgroundColor: '#17181F',
        borderWidth: 1,
        borderColor: '#282B34',
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    zone: {
        color: '#FFB36B',
        fontSize: 12,
        fontWeight: '900',
    },

    zoneSub: {
        color: '#B8BBC5',
        fontSize: 8,
        fontWeight: '900',
        marginTop: 4,
    },

    intensityRow: {
        marginTop: 28,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    intensityTitle: {
        color: theme.colors.text,
        fontSize: 20,
        fontWeight: '900',
    },

    elite: {
        color: '#FFB36B',
        fontSize: 10,
        fontWeight: '900',
        backgroundColor: '#2B1C10',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 3,
    },

    sliderBox: {
        marginTop: 14,
    },

    sliderTrack: {
        height: 4,
        backgroundColor: '#3B3D45',
        borderRadius: 4,
    },

    sliderFill: {
        width: '85%',
        height: '100%',
        backgroundColor: '#FFB36B',
        borderRadius: 4,
    },

    sliderDot: {
        position: 'absolute',
        left: '82%',
        top: -8,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#FF9500',
        borderWidth: 3,
        borderColor: '#fff',
    },

    sliderLabels: {
        marginTop: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    sliderLabel: {
        color: '#B8BBC5',
        fontSize: 10,
        fontWeight: '900',
    },

    startBtn: {
        marginTop: 60,
        alignSelf: 'center',
        width: 140,
        height: 140,
        borderRadius: 10,
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'center',
   
    },

    startText: {
        color: "black",
        fontSize: 20,
        fontWeight: '900',
        marginTop: 6,
    },

    footer: {
        color: '#777',
        fontSize: 10,
        textAlign: 'center',
        marginTop: 26,
        fontWeight: '700',
    },
});
