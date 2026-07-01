// MealPlanListScreen.js
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
import ScreenNameEnum from '../../../routes/screenName.enum';
import FitnessHeader from '../../../component/common/FitnessHeader';
import ScreenHeader from '../../../component/common/ScreenHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../../../theme/ThemeProvider';

// Removed static color import;

const meals = [
    {
        id: 1,
        tag: 'BREAKFAST',
        title: 'Keto Avocado Nest',
        kcal: '420 kcal',
        time: '20 min',
        desc: 'High-fat, nutrient-dense breakfast with egg and avocado.',
        image:
            'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=1200&q=80',
    },
    {
        id: 2,
        tag: 'LUNCH',
        title: 'Ahi Tuna Power Bowl',
        kcal: '520 kcal',
        time: '25 min',
        desc: 'Fresh tuna, greens, vegetables and clean protein for energy.',
        image:
            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80',
    },
    {
        id: 3,
        tag: 'DINNER',
        title: 'Truffle Essence Salmon',
        kcal: '610 kcal',
        time: '35 min',
        desc: 'Premium salmon with asparagus and balanced healthy fats.',
        image:
            'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=80',
    },
];

export default function MealPlanListScreen({ navigation }: any) {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#000" barStyle="light-content" />
            <ScreenHeader title="Meal Recommendation" />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

                <View style={styles.titleRow}>
                    <Text style={styles.screenTitle}>MEAL PLAN</Text>
                    <Ionicons name="ellipsis-horizontal" size={18} color="#FFB36B" />
                </View>

                {meals.map(item => (
                    <View key={item.id} style={styles.card}>
                        <ImageBackground
                            source={{ uri: item.image }}
                            style={styles.image}
                            imageStyle={styles.imageRadius}>
                            <View style={styles.overlay} />

                            <View style={styles.tag}>
                                <Text style={styles.tagText}>{item.tag}</Text>
                            </View>

                            <View style={styles.imageBottom}>
                                <Text style={styles.mealTitle}>{item.title}</Text>
                                <Text style={styles.meta}>
                                    {item.kcal}  •  {item.time}
                                </Text>
                            </View>
                        </ImageBackground>

                        <View style={styles.infoBox}>
                            <Text style={styles.desc}>{item.desc}</Text>

                            <TouchableOpacity
                                style={styles.actionBtn}
                                onPress={() => navigation?.goBack()}
                            >
                                <Text style={styles.actionText}>ADD MEAL</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation?.navigate(ScreenNameEnum.MealRecommendation)}
            >
                <Ionicons name="add" size={22} color="#000" />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const createStyles = (theme: any) => StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },

    scroll: {
        paddingHorizontal: 18,
        paddingBottom: 120,
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

    titleRow: {
        marginTop: 18,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    screenTitle: {
        color: theme.colors.text,
        fontSize: 13,
        fontWeight: '900',
        letterSpacing: 1,
    },

    card: {
        backgroundColor: '#11131A',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#252832',
        marginBottom: 18,
        overflow: 'hidden',
    },

    image: {
        height: 160,
        justifyContent: 'space-between',
    },

    imageRadius: {
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.26)',
    },

    tag: {
        marginTop: 12,
        marginLeft: 12,
        backgroundColor: '#FFB36B',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 4,
        alignSelf: 'flex-start',
    },

    tagText: {
        color: theme.colors.text,
        fontSize: 9,
        fontWeight: '900',
    },

    imageBottom: {
        padding: 14,
    },

    mealTitle: {
        color: theme.colors.text,
        fontSize: 18,
        fontWeight: '900',
    },

    meta: {
        color: '#D6D6D6',
        fontSize: 11,
        marginTop: 4,
        fontWeight: '700',
    },

    infoBox: {
        padding: 14,
    },

    desc: {
        color: '#9DA0AA',
        fontSize: 12,
        lineHeight: 18,
    },

    actionBtn: {
        height: 38,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#FFB36B',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 14,
    },

    actionText: {
        color: '#FFB36B',
        fontSize: 10,
        fontWeight: '900',
    },

    fab: {
        position: 'absolute',
        right: 22,
        bottom: 30,
        width: 46,
        height: 46,
        borderRadius: 14,
        backgroundColor: '#FFB36B',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
