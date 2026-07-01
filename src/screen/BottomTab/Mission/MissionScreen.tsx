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

export default function MissionScreen({ navigation }: any) {
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
                            <Ionicons name="arrow-back" size={20} color="#fff" />
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
                        activeOpacity={0.8}
                        style={styles.bellBtn}
                        onPress={() => navigation.navigate(ScreenNameEnum.NotificationsScreen)}>
                        <Ionicons name="notifications" size={20} color="#fff" />
                        <View style={styles.bellDot} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionLabel}>YOUR MISSIONS</Text>

                <View style={styles.calorieCard}>
                    <View style={styles.calorieTop}>
                        <View style={styles.iconBox}>
                            <MaterialCommunityIcons
                                name="silverware-fork-knife"
                                size={22}
                                color="#FFA28F"
                            />
                        </View>

                        <View style={styles.calorieInfo}>
                            <Text style={styles.smallLabel}>CALORIE TRACKER</Text>

                            <View style={styles.calorieRow}>
                                <Text style={styles.calorieMain}>1840</Text>
                                <Text style={styles.calorieSlash}>/</Text>
                                <Text style={styles.calorieTotal}>2,200</Text>
                            </View>

                            <Text style={styles.kcal}>kcal</Text>
                        </View>

                        <View style={styles.remainingBox}>
                            <Text style={styles.remainingNumber}>360</Text>
                            <Text style={styles.remainingText}>REMAINING</Text>
                        </View>
                    </View>

                    <View style={styles.macroRow}>
                        <View style={styles.macroCard}>
                            <Text style={styles.macroLabel}>CARBS</Text>
                            <Text style={styles.macroValue}>145g</Text>
                        </View>

                        <View style={styles.macroCard}>
                            <Text style={styles.macroLabel}>PROTEIN</Text>
                            <Text style={styles.macroValue}>120g</Text>
                        </View>

                        <View style={styles.macroCard}>
                            <Text style={styles.macroLabel}>FATS</Text>
                            <Text style={styles.macroValue}>52g</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.workoutCard}>
                    <View style={styles.workoutTop}>
                        <View style={styles.workIcon}>
                            <MaterialCommunityIcons name="sword-cross" size={22} color="#FFA28F" />
                        </View>

                        <View style={styles.workInfo}>
                            <Text style={styles.smallLabel}>TODAY'S WORKOUT</Text>
                            <Text style={styles.workTitle}>Upper Body Power</Text>
                        </View>

                        <TouchableOpacity
                            accessibilityLabel="Open workout"
                            activeOpacity={0.8}
                            style={styles.emptyBox}
                            onPress={() => navigation.navigate(ScreenNameEnum.WorkoutPlan)}
                        />
                    </View>

                    <View style={styles.tagsRow}>
                        <View style={styles.tag}>
                            <Text style={styles.tagText}>45 MIN</Text>
                        </View>

                        <View style={styles.tag}>
                            <Text style={styles.tagText}>HIGH INTENSITY</Text>
                        </View>

                        <View style={styles.tag}>
                            <Text style={styles.tagText}>STRENGTH</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity
                    accessibilityLabel="Add meal"
                    activeOpacity={0.85}
                    style={styles.floatingBtn}
                    onPress={() => navigation.navigate(ScreenNameEnum.MealRecommendation)}>
                    <Ionicons name="add" size={24} color="#FFA28F" />
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#050505',
    },

    scroll: {
        paddingHorizontal: 22,
        paddingTop: 20,
        paddingBottom: 80,
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
        height: 36,
        justifyContent: 'center',
        marginRight: 8,
        width: 30,
    },

    avatar: {
        width: 43,
        height: 43,
        borderRadius: 22,
        backgroundColor: '#24242B',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        borderWidth: 1,
        borderColor: '#353640',
    },

    avatarText: {
        fontSize: 21,
    },

    hello: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '700',
    },

    name: {
        color: '#FFFFFF',
        fontSize: 19,
        fontWeight: '900',
        marginTop: 3,
    },

    bellBtn: {
        width: 34,
        height: 34,
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

    sectionLabel: {
        color: '#CFCFD6',
        fontSize: 11,
        fontWeight: '900',
        letterSpacing: 4,
        marginTop: 46,
        marginBottom: 14,
    },

    calorieCard: {
        borderRadius: 22,
        backgroundColor: '#0F1016',
        borderWidth: 1,
        borderColor: '#292A35',
        padding: 18,
    },

    calorieTop: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 10,
        backgroundColor: '#22232C',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },

    calorieInfo: {
        flex: 1,
    },

    smallLabel: {
        color: '#D9D9DF',
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 2.2,
    },

    calorieRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 6,
    },

    calorieMain: {
        color: '#FFFFFF',
        fontSize: 30,
        fontWeight: '900',
        letterSpacing: -1,
    },

    calorieSlash: {
        color: '#8A8B96',
        fontSize: 27,
        fontWeight: '900',
        marginHorizontal: 6,
        marginBottom: 1,
    },

    calorieTotal: {
        color: '#E4E4EA',
        fontSize: 27,
        fontWeight: '800',
        letterSpacing: -1,
    },

    kcal: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '900',
        marginTop: -2,
    },

    remainingBox: {
        alignItems: 'center',
        marginTop: 28,
    },

    remainingNumber: {
        color: '#CFCFD6',
        fontSize: 9,
        fontWeight: '800',
    },

    remainingText: {
        color: '#CFCFD6',
        fontSize: 7,
        fontWeight: '900',
        marginTop: 10,
        letterSpacing: 1,
    },

    macroRow: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 24,
    },

    macroCard: {
        flex: 1,
        height: 64,
        borderRadius: 5,
        backgroundColor: '#20212A',
        alignItems: 'center',
        justifyContent: 'center',
    },

    macroLabel: {
        color: '#B8B8C2',
        fontSize: 8,
        fontWeight: '900',
        letterSpacing: 1,
    },

    macroValue: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
        marginTop: 7,
    },

    workoutCard: {
        marginTop: 28,
        borderRadius: 22,
        backgroundColor: '#0F1016',
        padding: 18,
    },

    workoutTop: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    workIcon: {
        width: 48,
        height: 48,
        borderRadius: 10,
        backgroundColor: '#22232C',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },

    workInfo: {
        flex: 1,
    },

    workTitle: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '700',
        marginTop: 5,
    },

    emptyBox: {
        width: 30,
        height: 30,
        borderWidth: 2,
        borderColor: '#3A3B47',
    },

    tagsRow: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 22,
    },

    tag: {
        height: 32,
        paddingHorizontal: 14,
        backgroundColor: '#20212A',
        alignItems: 'center',
        justifyContent: 'center',
    },

    tagText: {
        color: '#B8B8C2',
        fontSize: 8,
        fontWeight: '900',
        letterSpacing: 1,
    },

    floatingBtn: {
        position: 'absolute',
        right: 28,
        bottom: 28,
        width: 46,
        height: 46,
        borderRadius: 13,
        borderWidth: 2,
        borderColor: '#FFA28F',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0B0B0D',
    },
});
