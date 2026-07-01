// FitnessProgressScreen.js
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import AppSafeAreaView from '../../../component/common/AppSafeAreaView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenNameEnum from '../../../routes/screenName.enum';
import FitnessHeader from '../../../component/common/FitnessHeader';
import ScreenHeader from '../../../component/common/ScreenHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../../../theme/ThemeProvider';

// Removed static color import;

export default function FitnessProgressScreen({ navigation }: any) {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#000" barStyle="light-content" />
            <ScreenHeader title="Fitness Progress" style={styles.header} />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

                <View style={styles.card}>
                    <Text style={styles.orangeText}>CURRENT PROGRESS</Text>
                    <Text style={styles.cardTitle}>Workout Analysis</Text>

                    <View style={styles.row}>
                        <View style={styles.progressBox}>
                            <Text style={styles.label}>WEIGHT</Text>
                            <Text style={styles.big}>182<Text style={styles.unit}> lbs</Text></Text>
                            <Text style={styles.gain}>GAIN</Text>
                        </View>

                        <View style={styles.progressBox}>
                            <Text style={styles.label}>HYDRATION</Text>
                            <Text style={styles.big}>84<Text style={styles.unit}>%</Text></Text>
                            <Text style={styles.high}>HIGH</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>AI Daily Strategy</Text>

                    <View style={styles.circle}>
                        <Text style={styles.circleValue}>2,850</Text>
                        <Text style={styles.circleSub}>KCAL TARGET</Text>
                    </View>
                </View>

                <MetricCard title="PROTEIN" value="180" unit="g" percent={85} onPress={() => navigation?.navigate(ScreenNameEnum.MealRecommendation)} />
                <MetricCard title="CALORIES" value="520" unit="kcal" percent={65} onPress={() => navigation?.navigate(ScreenNameEnum.BMICalculator)} />
                <MetricCard title="FAT" value="85" unit="g" percent={72} onPress={() => navigation?.navigate(ScreenNameEnum.MealPlanList)} />
            </ScrollView>
        </SafeAreaView>
    );
}

function MetricCard({ title, value, unit, percent, onPress }: any) {
    const { theme } = useAppTheme();
    const styles = createStyles(theme);

    return (
        <TouchableOpacity activeOpacity={0.86} style={styles.metricCard} onPress={onPress}>
            <View style={styles.metricTop}>
                <Text style={styles.metricTitle}>{title}</Text>
                <MaterialCommunityIcons name="dots-horizontal" size={18} color="#FFB19F" />
            </View>

            <Text style={styles.metricValue}>
                {value}
                <Text style={styles.unit}> {unit}</Text>
            </Text>

            <View style={styles.barBg}>
                <View style={[styles.barFill, { width: `${percent}%` }]} />
            </View>
        </TouchableOpacity>
    );
}

const createStyles = (theme: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },

    scroll: {
        paddingHorizontal: 18,
        paddingTop: 12,
        paddingBottom: 100,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    hello: {
        color: theme.colors.text,
        fontSize: 9,
    },

    name: {
        color: theme.colors.text,
        fontSize: 13,
        fontWeight: '800',
    },

    dot: {
        position: 'absolute',
        top: 0,
        right: -2,
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: '#7C5CFF',
    },

    card: {
        marginTop: 18,
        backgroundColor: '#17181F',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#292B34',
        padding: 16,
    },

    orangeText: {
        color: '#FF9F43',
        fontSize: 9,
        fontWeight: '900',
        letterSpacing: 1,
    },

    cardTitle: {
        color: theme.colors.text,
        fontSize: 15,
        fontWeight: '800',
        marginTop: 4,
    },

    row: {
        flexDirection: 'row',
        marginTop: 18,
    },

    progressBox: {
        flex: 1,
    },

    label: {
        color: '#777B86',
        fontSize: 9,
        fontWeight: '800',
    },

    big: {
        color: theme.colors.text,
        fontSize: 28,
        fontWeight: '900',
        marginTop: 5,
    },

    unit: {
        color: '#8E929D',
        fontSize: 11,
        fontWeight: '700',
    },

    gain: {
        color: '#FF9F43',
        fontSize: 16,
        fontWeight: '900',
        marginTop: 4,
    },

    high: {
        color: theme.colors.text,
        fontSize: 16,
        fontWeight: '900',
        marginTop: 4,
    },

    circle: {
        alignSelf: 'center',
        marginTop: 20,
        width: 118,
        height: 118,
        borderRadius: 59,
        borderWidth: 6,
        borderColor: '#FF9F43',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#FF9F43',
        shadowOpacity: 0.6,
        shadowRadius: 14,
        elevation: 12,
    },

    circleValue: {
        color: theme.colors.text,
        fontSize: 26,
        fontWeight: '900',
    },

    circleSub: {
        color: '#FFB36B',
        fontSize: 9,
        fontWeight: '900',
        marginTop: 2,
    },

    metricCard: {
        marginTop: 14,
        backgroundColor: '#17181F',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#292B34',
        padding: 15,
    },

    metricTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    metricTitle: {
        color: '#8D929D',
        fontSize: 9,
        fontWeight: '900',
    },

    metricValue: {
        color: theme.colors.text,
        fontSize: 22,
        fontWeight: '900',
        marginTop: 4,
    },

    barBg: {
        height: 4,
        backgroundColor: '#343741',
        borderRadius: 4,
        marginTop: 12,
        overflow: 'hidden',
    },

    barFill: {
        height: '100%',
        backgroundColor: '#FFB19F',
        borderRadius: 4,
    },
});
