// BMICalculatorScreen.js
import React, { useMemo, useState } from 'react';
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
import ScreenNameEnum from '../../../routes/screenName.enum';
import ScreenHeader from '../../../component/common/ScreenHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { color } from '../../../theme';

export default function BMICalculatorScreen({ navigation }: any) {
    const [height, setHeight] = useState(180);
    const [weight, setWeight] = useState(78.5);

    const bmi = useMemo(() => {
        const meter = height / 100;
        return (weight / (meter * meter)).toFixed(1);
    }, [height, weight]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#000" barStyle="light-content" />
            <ScreenHeader title="BMI Calculator" style={styles.header} />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                <View style={styles.circle}>
                    <Text style={styles.bmiValue}>{bmi}</Text>
                    <Text style={styles.bmiLabel}>BMI INDEX</Text>
                </View>

                <View style={styles.badge}>
                    <Text style={styles.badgeText}>NORMAL WEIGHT</Text>
                </View>

                <CounterCard
                    title="HEIGHT (CM)"
                    value={height}
                    onMinus={() => setHeight(v => Math.max(100, v - 1))}
                    onPlus={() => setHeight(v => v + 1)}
                />

                <CounterCard
                    title="WEIGHT (KG)"
                    value={weight}
                    onMinus={() => setWeight(v => Math.max(30, +(v - 0.5).toFixed(1)))}
                    onPlus={() => setWeight(v => +(v + 0.5).toFixed(1))}
                />

                <View style={styles.insightCard}>
                    <Text style={styles.insightTitle}>✨ AI BIOMETRIC INSIGHTS</Text>

                    <Insight
                        icon="shield-checkmark-outline"
                        text="Your current BMI is within the Optimal Peak Zone for your age demographic. Excellent metabolic consistency."
                    />

                    <Insight
                        icon="flame-outline"
                        text="Maintain your current lean protein intake and hydration to sustain healthy energy and metabolic rate."
                    />
                </View>

                <TouchableOpacity
                    activeOpacity={0.85}
                    style={styles.saveBtn}
                    onPress={() => navigation?.navigate(ScreenNameEnum.FitnessProgress, { bmi })}
                >
                    <Text style={styles.saveText}>SAVE</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

function CounterCard({ title, value, onMinus, onPlus }: any) {
    return (
        <View style={styles.counterCard}>
            <Text style={styles.counterTitle}>{title}</Text>

            <View style={styles.counterRow}>
                <TouchableOpacity style={styles.roundBtn} onPress={onMinus}>
                    <Ionicons name="remove" size={17} color="#BFC3CC" />
                </TouchableOpacity>

                <Text style={styles.counterValue}>{value}</Text>

                <TouchableOpacity style={styles.roundBtn} onPress={onPlus}>
                    <Ionicons name="add" size={17} color="#BFC3CC" />
                </TouchableOpacity>
            </View>

            <View style={styles.slider}>
                <View style={styles.sliderFill} />
                <View style={styles.sliderDot} />
            </View>
        </View>
    );
}

function Insight({ icon, text }: any) {
    return (
        <View style={styles.insightRow}>
            <Ionicons name={icon} size={18} color="#FF9F1C" />
            <Text style={styles.insightText}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background,
    },

    scroll: {
        paddingHorizontal: 18,
        paddingTop: 12,
        paddingBottom: 80,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    headerTitle: {
        flex: 1,
        color: '#fff',
        fontSize: 17,
        fontWeight: '900',
        marginLeft: 12,
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

    circle: {
        marginTop: 48,
        alignSelf: 'center',
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 12,
        borderColor: '#FFB16B',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#FF9F1C',
        shadowOpacity: 0.6,
        shadowRadius: 20,
        elevation: 12,
    },

    bmiValue: {
        color: '#fff',
        fontSize: 31,
        fontWeight: '900',
    },

    bmiLabel: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '900',
        marginTop: 2,
    },

    badge: {
        marginTop: 26,
        alignSelf: 'center',
        height: 28,
        paddingHorizontal: 26,
        borderRadius: 8,
        backgroundColor: '#FF9500',
        alignItems: 'center',
        justifyContent: 'center',
    },

    badgeText: {
        color: '#fff',
        fontSize: 9,
        fontWeight: '900',
        letterSpacing: 0.7,
    },

    counterCard: {
        marginTop: 24,
        backgroundColor: '#17181F',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#292B34',
        padding: 16,
    },

    counterTitle: {
        color: '#8E929D',
        textAlign: 'center',
        fontSize: 9,
        fontWeight: '900',
        letterSpacing: 1,
    },

    counterRow: {
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    roundBtn: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#3A3D47',
        alignItems: 'center',
        justifyContent: 'center',
    },

    counterValue: {
        color: '#fff',
        fontSize: 23,
        fontWeight: '900',
        marginHorizontal: 24,
    },

    slider: {
        height: 4,
        backgroundColor: '#3A3D47',
        borderRadius: 4,
        marginTop: 14,
    },

    sliderFill: {
        width: '52%',
        height: '100%',
        borderRadius: 4,
        backgroundColor: '#FFB16B',
    },

    sliderDot: {
        position: 'absolute',
        left: '50%',
        top: -5,
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#FF9500',
        borderWidth: 2,
        borderColor: '#fff',
    },

    insightCard: {
        marginTop: 22,
        backgroundColor: '#17181F',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#292B34',
        padding: 16,
    },

    insightTitle: {
        color: '#FFB16B',
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1,
        marginBottom: 16,
    },

    insightRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
    },

    insightText: {
        flex: 1,
        color: '#B9BBC5',
        fontSize: 12,
        lineHeight: 18,
        marginLeft: 10,
    },

    saveBtn: {
        marginTop: 28,
        alignSelf: 'flex-end',
        width: 68,
        height: 38,
        borderRadius: 6,
        backgroundColor: '#FFB16B',
        alignItems: 'center',
        justifyContent: 'center',
    },

    saveText: {
        color: '#000',
        fontSize: 12,
        fontWeight: '900',
    },
});
