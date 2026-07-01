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
import { resetToLogin } from '../../../routes/navigationService';
import ScreenHeader from '../../../component/common/ScreenHeader';

const fitnessImg =
    'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=900';

export default function FitnessProfileScreen({ navigation }: any) {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#050505" barStyle="light-content" />
            <ScreenHeader title='Fitness Profile ' />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scroll}>

                <View style={styles.phoneMock}>
                    <ImageBackground
                        source={{ uri: fitnessImg }}
                        style={styles.heroImage}
                        imageStyle={styles.heroImageStyle}>
                        <View style={styles.heroOverlay} />


                    </ImageBackground>
                </View>

                <View style={styles.nameCard}>
                    <View>
                        <Text style={styles.level}>LEVEL 09</Text>
                        <Text style={styles.name}>Alex{'\n'}Vaccaro</Text>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.85}
                        style={styles.editBtn}
                        onPress={() => navigation.navigate(ScreenNameEnum.EditProfile)}>
                        <Text style={styles.editText}>EDIT</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <Text style={styles.statLabel}>AGE</Text>
                        <Text style={styles.statValue}>28</Text>
                    </View>

                    <View style={styles.statCard}>
                        <Text style={styles.statLabel}>HEIGHT</Text>
                        <Text style={styles.statValue}>182 <Text style={styles.unit}>cm</Text></Text>
                    </View>

                    <View style={styles.statCard}>
                        <Text style={styles.statLabel}>WEIGHT</Text>
                        <Text style={styles.statValue}>84 <Text style={styles.unit}>kg</Text></Text>
                    </View>
                </View>

                <View style={styles.goalCard}>
                    <View style={styles.goalTop}>
                        <View>
                            <Text style={styles.goalTitle}>Muscle Gain</Text>
                            <Text style={styles.goalSub}>Phase 2: Hypertrophy focus</Text>
                        </View>

                        <MaterialCommunityIcons name="chart-line" size={18} color="#FF9500" />
                    </View>

                    <View style={styles.progressLabelRow}>
                        <Text style={styles.progressLabel}>PROGRESS</Text>
                        <Text style={styles.progressPercent}>65%</Text>
                    </View>

                    <View style={styles.progressTrack}>
                        <View style={styles.progressFill} />
                    </View>
                </View>

                <Text style={styles.sectionTitle}>PERFORMANCE METRICS</Text>

                <View style={styles.metricCard}>
                    <View style={styles.metricIcon}>
                        <Ionicons name="flame" size={17} color="#FF9500" />
                    </View>

                    <View style={styles.metricInfo}>
                        <Text style={styles.metricTitle}>Weekly Streak</Text>
                        <Text style={styles.metricSub}>Top 5% of athletes</Text>
                    </View>

                    <Text style={styles.metricValue}>12{'\n'}Days</Text>
                </View>

                <View style={styles.metricCard}>
                    <View style={styles.metricIcon}>
                        <MaterialCommunityIcons name="dumbbell" size={17} color="#FF9500" />
                    </View>

                    <View style={styles.metricInfo}>
                        <Text style={styles.metricTitle}>Total Workouts</Text>
                        <Text style={styles.metricSub}>This Month</Text>
                    </View>

                    <Text style={styles.metricValue}>24</Text>
                </View>

                <View style={styles.metricCard}>
                    <View style={styles.metricIcon}>
                        <Ionicons name="flash" size={17} color="#FF9500" />
                    </View>

                    <View style={styles.metricInfo}>
                        <Text style={styles.metricTitle}>Total Calories</Text>
                        <Text style={styles.metricSub}>Energy output</Text>
                    </View>

                    <Text style={styles.metricValue}>15.4k</Text>
                </View>

                <TouchableOpacity
                    activeOpacity={0.85}
                    style={styles.menuCard}
                    onPress={() => navigation.navigate(ScreenNameEnum.FitnessProgress)}>
                    <Text style={styles.menuText}>Biometric History</Text>
                    <Ionicons name="chevron-forward" size={17} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.85}
                    style={styles.menuCard}
                    onPress={() => navigation.navigate(ScreenNameEnum.WatchLock)}>
                    <Text style={styles.menuText}>Connected Devices</Text>
                    <Ionicons name="chevron-forward" size={17} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.85}
                    style={styles.menuCard}
                    onPress={() => navigation.navigate(ScreenNameEnum.ProfileSetup)}>
                    <Text style={styles.menuText}>Account Settings</Text>
                    <Ionicons name="settings-outline" size={16} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.8} onPress={resetToLogin}>
                    <Text style={styles.logout}>TERMINATE SESSION</Text>
                </TouchableOpacity>
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
        paddingHorizontal: 18,
        paddingTop: 10,
        paddingBottom: 50,
    },

    phoneMock: {
        height: 210,
        borderRadius: 32,
        backgroundColor: '#111',
        borderWidth: 1,
        borderColor: '#333',
        overflow: 'hidden',
        marginBottom: 12
    },

    heroImage: {
        flex: 1,
    },

    heroImageStyle: {
        borderRadius: 32,
    },

    heroOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.35)',
    },

    topBar: {
        paddingTop: 20,
        paddingHorizontal: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    topTitle: {
        color: '#fff',
        fontSize: 8,
        fontWeight: '900',
        letterSpacing: 1,
    },

    nameCard: {
        marginHorizontal: 10,
        borderRadius: 4,
        backgroundColor: '#191B22',
        borderWidth: 1,
        borderColor: '#272A33',
        padding: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    level: {
        color: ORANGE,
        fontSize: 9,
        fontWeight: '900',
        marginBottom: 4,
    },

    name: {
        color: '#fff',
        fontSize: 26,
        lineHeight: 28,
        fontWeight: '900',
    },

    editBtn: {
        width: 58,
        height: 34,
        borderRadius: 16,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    editText: {
        color: '#050505',
        fontSize: 9,
        fontWeight: '900',
    },

    statsRow: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 20,
    },

    statCard: {
        flex: 1,
        height: 74,
        borderRadius: 4,
        backgroundColor: '#191B22',
        borderWidth: 1,
        borderColor: '#272A33',
        justifyContent: 'center',
        paddingHorizontal: 14,
    },

    statLabel: {
        color: '#A1A1AA',
        fontSize: 8,
        fontWeight: '900',
        marginBottom: 8,
    },

    statValue: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '900',
    },

    unit: {
        fontSize: 10,
        color: '#D4D4D8',
    },

    goalCard: {
        marginTop: 18,
        borderRadius: 4,
        backgroundColor: '#191B22',
        borderWidth: 1,
        borderColor: '#272A33',
        padding: 18,
    },

    goalTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    goalTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '900',
    },

    goalSub: {
        color: '#A1A1AA',
        fontSize: 10,
        marginTop: 6,
    },

    progressLabelRow: {
        marginTop: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    progressLabel: {
        color: '#A1A1AA',
        fontSize: 8,
        fontWeight: '900',
    },

    progressPercent: {
        color: '#A1A1AA',
        fontSize: 8,
        fontWeight: '900',
    },

    progressTrack: {
        height: 5,
        borderRadius: 4,
        backgroundColor: '#343640',
        marginTop: 8,
        overflow: 'hidden',
    },

    progressFill: {
        width: '65%',
        height: '100%',
        backgroundColor: ORANGE,
    },

    sectionTitle: {
        color: '#A1A1AA',
        fontSize: 9,
        fontWeight: '900',
        marginTop: 20,
        marginBottom: 10,
    },

    metricCard: {
        minHeight: 70,
        borderRadius: 4,
        backgroundColor: '#191B22',
        borderWidth: 1,
        borderColor: '#272A33',
        paddingHorizontal: 14,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },

    metricIcon: {
        width: 32,
        height: 32,
        borderRadius: 4,
        backgroundColor: '#2B251D',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },

    metricInfo: {
        flex: 1,
    },

    metricTitle: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '900',
    },

    metricSub: {
        color: '#8F8F99',
        fontSize: 9,
        marginTop: 3,
    },

    metricValue: {
        color: ORANGE,
        fontSize: 22,
        lineHeight: 24,
        fontWeight: '900',
        textAlign: 'right',
    },

    menuCard: {
        height: 58,
        borderRadius: 4,
        backgroundColor: '#191B22',
        borderWidth: 1,
        borderColor: '#272A33',
        paddingHorizontal: 16,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    menuText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '800',
    },

    logout: {
        color: '#B85A3C',
        fontSize: 8,
        fontWeight: '900',
        textAlign: 'center',
        marginTop: 34,
        letterSpacing: 1,
    },
});
