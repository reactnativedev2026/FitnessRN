// MealRecommendationScreen.js

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    Image,
    ImageBackground,
} from 'react-native';
import AppSafeAreaView from '../../../component/common/AppSafeAreaView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ScreenNameEnum from '../../../routes/screenName.enum';
import FitnessHeader from '../../../component/common/FitnessHeader';
import ScreenHeader from '../../../component/common/ScreenHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { color } from '../../../theme';

const recommendations = [
    {
        id: 1,
        image:
            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
    },
    {
        id: 2,
        image:
            'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
    },
    {
        id: 3,
        image:
            'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
    },
];

const meals = [
    {
        id: 1,
        title: 'Protein Power Bowl',
        calories: '480',
        protein: '32g',
        image:
            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80',
    },
    {
        id: 2,
        title: 'Grilled Salmon & Greens',
        calories: '520',
        protein: '42g',
        image:
            'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=80',
    },
];

export default function MealRecommendationScreen({ navigation }: any) {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#000" barStyle="light-content" />
            <ScreenHeader title="Meal Recommendation" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 120, paddingHorizontal: 16,
                }}
            >


                {/* AI INSIGHTS */}

                <View style={styles.aiSection}>
                    <Text style={styles.orangeText}>AI INSIGHTS</Text>

                    <Text style={styles.aiTitle}>
                        Meal Recommendations
                    </Text>

                    <Text style={styles.aiSub}>
                        HEALTHY ALTERNATIVES FOR YOUR GOALS
                    </Text>
                </View>

                {/* TOP RECOMMENDATIONS */}

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ marginTop: 15 }}
                >
                    {recommendations.map(item => (
                        <View key={item.id} style={styles.smallCard}>
                            <Image
                                source={{ uri: item.image }}
                                style={styles.smallImage}
                            />
                        </View>
                    ))}
                </ScrollView>

                {/* FOOD CARDS */}

                {meals.map(item => (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        key={item.id}
                        style={styles.foodCard}
                        onPress={() => navigation?.navigate(ScreenNameEnum.MealPlanList, { meal: item })}
                    >
                        <ImageBackground
                            source={{ uri: item.image }}
                            style={styles.foodImage}
                            imageStyle={{ borderRadius: 18 }}
                        >
                            <View style={styles.overlay} />

                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>
                                    BREAKFAST
                                </Text>
                            </View>

                            <View style={styles.foodContent}>
                                <Text style={styles.foodTitle}>
                                    {item.title}
                                </Text>

                                <View style={styles.statsRow}>
                                    <View>
                                        <Text style={styles.statNumber}>
                                            {item.calories}
                                        </Text>
                                        <Text style={styles.statLabel}>
                                            kcal
                                        </Text>
                                    </View>

                                    <View>
                                        <Text style={styles.statNumber}>
                                            {item.protein}
                                        </Text>
                                        <Text style={styles.statLabel}>
                                            protein
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                ))}

                {/* BUTTON */}

                <TouchableOpacity
                    style={styles.generateBtn}
                    onPress={() => navigation?.navigate(ScreenNameEnum.MealPlanList)}
                >
                    <Ionicons
                        name="flash"
                        size={18}
                        color="white"
                    />

                    <Text style={styles.generateText}>
                        Generate New Meal Plan
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.background,
    },

    header: {
        marginTop: 12,
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
        backgroundColor: '#26262C',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },

    avatarText: {
        fontSize: 18,
    },

    hello: {
        color: '#fff',
        fontSize: 10,
    },

    name: {
        color: '#fff',
        fontWeight: '800',
        fontSize: 13,
    },

    dot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: '#8B5CF6',
        position: 'absolute',
        right: -2,
        top: 1,
    },

    aiSection: {
        marginTop: 22,
    },

    orangeText: {
        color: '#FF9F43',
        fontSize: 9,
        fontWeight: '900',
        letterSpacing: 1,
    },

    aiTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '900',
        marginTop: 4,
    },

    aiSub: {
        color: '#777',
        fontSize: 10,
        marginTop: 3,
    },

    smallCard: {
        width: 90,
        height: 70,
        borderRadius: 12,
        overflow: 'hidden',
        marginRight: 10,
        backgroundColor: '#1A1A1F',
    },

    smallImage: {
        width: '100%',
        height: '100%',
    },

    foodCard: {
        marginTop: 18,
    },

    foodImage: {
        height: 180,
        justifyContent: 'space-between',
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.35)',
        borderRadius: 18,
    },

    badge: {
        marginTop: 12,
        marginLeft: 12,
        backgroundColor: '#FFA62B',
        alignSelf: 'flex-start',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },

    badgeText: {
        color: '#000',
        fontWeight: '800',
        fontSize: 9,
    },

    foodContent: {
        padding: 15,
    },

    foodTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '900',
    },

    statsRow: {
        flexDirection: 'row',
        marginTop: 12,
        gap: 30,
    },

    statNumber: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '900',
    },

    statLabel: {
        color: '#D1D5DB',
        fontSize: 11,
    },

    generateBtn: {
        marginTop: 20,
        height: 52,
        borderRadius: 12,
        backgroundColor: '#FFA62B',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    generateText: {
        color: 'white',
        fontWeight: '900',
        marginLeft: 8,
    },
});
