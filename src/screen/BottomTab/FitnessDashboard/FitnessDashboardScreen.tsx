// FitnessDashboardScreen.js
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
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../../routes/screenName.enum';
import FitnessHeader from '../../../component/common/FitnessHeader';
import ScreenHeader from '../../../component/common/ScreenHeader';

export default function FitnessDashboardScreen() {
    const navigation = useNavigation<any>();
    return (
        <AppSafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#000" barStyle="light-content" />
            <ScreenHeader title='Fitness' />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

                <ImageBackground
                    source={{
                        uri: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80',
                    }}
                    style={styles.hero}
                    imageStyle={styles.heroImg}>
                    <View style={styles.overlay} />

                    <View style={styles.heroContent}>
                        <Text style={styles.heroTitle}>Your{'\n'}Workout</Text>

                        <TouchableOpacity
                            style={styles.startBtn}
                            onPress={() => navigation.navigate(ScreenNameEnum.WorkoutPlan)}
                        >
                            <Text style={styles.startText}>START</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                <View style={styles.statsRow}>
                    <StatBox icon="flame" title="Calories" value="520" />
                    <StatBox icon="time-outline" title="Duration" value="45m" />
                    <StatBox icon="barbell-outline" title="Workout" value="12" />
                </View>

                <TouchableOpacity
                    activeOpacity={0.86}
                    style={styles.card}
                    onPress={() => navigation.navigate(ScreenNameEnum.FitnessProgress)}
                >
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>Workout Analysis</Text>
                        <Ionicons name="chevron-forward" size={18} color="#777" />
                    </View>

                    <View style={styles.progressLine}>
                        <View style={{ width: '72%', height: '100%', backgroundColor: '#FFB19F' }} />
                    </View>
                </TouchableOpacity>

                <Metric title="Protein" value="180g" icon="nutrition-outline" onPress={() => navigation.navigate(ScreenNameEnum.MealRecommendation)} />
                <Metric title="Calories Burned" value="520 kcal" icon="flame-outline" onPress={() => navigation.navigate(ScreenNameEnum.BMICalculator)} />
                <Metric title="Hydration" value="84%" icon="water-outline" onPress={() => navigation.navigate(ScreenNameEnum.HydrationGoal)} />
                <Metric title="Workout Strategy" value="AI Plan Ready" icon="sparkles-outline" onPress={() => navigation.navigate(ScreenNameEnum.WorkoutPlan)} />

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(ScreenNameEnum.WorkoutPlan)}>
                    <Text style={styles.buttonText}>START WORKOUT</Text>
                </TouchableOpacity>
            </ScrollView>
        </AppSafeAreaView>
    );
}

function StatBox({ icon, title, value }: any) {
    return (
        <View style={styles.statBox}>
            <Ionicons name={icon} size={18} color="#FFB19F" />
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statTitle}>{title}</Text>
        </View>
    );
}

function Metric({ title, value, icon, onPress }: any) {
    return (
        <TouchableOpacity activeOpacity={0.86} style={styles.metric} onPress={onPress}>
            <View style={styles.metricLeft}>
                <View style={styles.iconBox}>
                    <Ionicons name={icon} size={18} color="#FFB19F" />
                </View>
                <Text style={styles.metricTitle}>{title}</Text>
            </View>

            <Text style={styles.metricValue}>{value}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },

    scroll: {
        paddingHorizontal: 18,
        paddingTop: 12,
        paddingBottom: 120,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    hello: { color: '#fff', fontSize: 9 },
    name: { color: '#fff', fontSize: 13, fontWeight: '800' },

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
        height: 190,
        marginTop: 18,
        borderRadius: 18,
        overflow: 'hidden',
        justifyContent: 'flex-end',
    },

    heroImg: { borderRadius: 18 },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.45)',
    },

    heroContent: {
        padding: 16,
    },

    heroTitle: {
        color: '#fff',
        fontSize: 28,
        fontWeight: '900',
        lineHeight: 30,
    },

    startBtn: {
        marginTop: 12,
        width: 76,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    startText: {
        color: '#000',
        fontSize: 10,
        fontWeight: '900',
    },

    statsRow: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 14,
    },

    statBox: {
        flex: 1,
        height: 74,
        borderRadius: 12,
        backgroundColor: '#15171E',
        borderWidth: 1,
        borderColor: '#282B35',
        alignItems: 'center',
        justifyContent: 'center',
    },

    statValue: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '900',
        marginTop: 4,
    },

    statTitle: {
        color: '#8D929D',
        fontSize: 9,
        marginTop: 3,
    },

    card: {
        marginTop: 14,
        backgroundColor: '#15171E',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#282B35',
        padding: 14,
    },

    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    cardTitle: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '800',
    },

    progressLine: {
        height: 5,
        backgroundColor: '#343741',
        borderRadius: 5,
        overflow: 'hidden',
        marginTop: 14,
    },

    metric: {
        height: 58,
        borderRadius: 12,
        backgroundColor: '#15171E',
        borderWidth: 1,
        borderColor: '#282B35',
        marginTop: 12,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    metricLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    iconBox: {
        width: 34,
        height: 34,
        borderRadius: 10,
        backgroundColor: '#282A33',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },

    metricTitle: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '700',
    },

    metricValue: {
        color: '#FFB19F',
        fontSize: 12,
        fontWeight: '900',
    },

    button: {
        marginTop: 18,
        height: 48,
        borderRadius: 14,
        backgroundColor: '#FFB19F',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        color: '#000',
        fontSize: 12,
        fontWeight: '900',
    },
});
