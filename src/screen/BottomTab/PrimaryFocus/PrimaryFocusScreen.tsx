import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenNameEnum from '../../../routes/screenName.enum';
import ScreenHeader from '../../../component/common/ScreenHeader';

const goals = [
    {
        id: 'gym',
        title: 'Gym',
        desc: 'Weightlifting, bodybuilding, and high-intensity strength training programs.',
        image:
            'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=900',
    },
    {
        id: 'yoga',
        title: 'Yoga',
        desc: 'Mobility, breathwork, and flow-based recovery for elite performance.',
        image:
            'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=900',
    },
    {
        id: 'other',
        title: 'Other',
        desc: 'Running, calisthenics, combat sports, or multi-discipline training.',
        image:
            'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=900',
    },
];

export default function PrimaryFocusScreen({ navigation }: any) {
    const [selected, setSelected] = useState('gym');

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#050505" barStyle="light-content" />
            <ScreenHeader title='Primary Focus' />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scroll}>


                <Text style={styles.question}>What's your primary focus?</Text>
                <Text style={styles.subtitle}>Small Wins. Stronger You.</Text>

                <View style={styles.cards}>
                    {goals.map(item => {
                        const active = selected === item.id;

                        return (
                            <TouchableOpacity
                                key={item.id}
                                activeOpacity={0.88}
                                onPress={() => setSelected(item.id)}
                                style={[styles.card, active && styles.activeCard]}>

                                <ImageBackground
                                    source={{ uri: item.image }}
                                    style={styles.cardImage}
                                    imageStyle={styles.cardImageStyle}>

                                    <View style={styles.overlay} />

                                    {active && (
                                        <View style={styles.checkCircle}>
                                            <Ionicons name="checkmark" size={16} color="#050505" />
                                        </View>
                                    )}

                                    <View style={styles.cardContent}>
                                        <Text style={styles.cardTitle}>{item.title}</Text>
                                        <Text style={styles.cardDesc}>{item.desc}</Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.continueBtn}
                    onPress={() => navigation.navigate(ScreenNameEnum.FitnessDashboard, {
                        primaryFocus: selected,
                    })}>
                    <Text style={styles.continueText}>Continue</Text>
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
        paddingTop: 12,
        paddingBottom: 34,
        minHeight: '100%',
    },

    header: {
        height: 28,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    logo: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '900',
        letterSpacing: -1,
    },

    step: {
        color: '#B8B8C2',
        fontSize: 10,
        fontWeight: '800',
    },

    question: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '800',
        marginTop: 18,
    },

    subtitle: {
        color: '#A1A1AA',
        fontSize: 11,
        marginTop: 5,
    },

    cards: {
        marginTop: 18,
        gap: 10,
    },

    card: {
        height: 118,
        borderRadius: 4,
        overflow: 'hidden',
        backgroundColor: '#14161D',
        borderWidth: 1,
        borderColor: '#272A33',
    },

    activeCard: {
        borderColor: ORANGE,
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
        backgroundColor: 'rgba(5,5,5,0.62)',
    },

    checkCircle: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: ORANGE,
        alignItems: 'center',
        justifyContent: 'center',
    },

    cardContent: {
        padding: 15,
    },

    cardTitle: {
        color: '#FFFFFF',
        fontSize: 23,
        fontWeight: '900',
    },

    cardDesc: {
        color: '#C4C4CC',
        fontSize: 11,
        lineHeight: 16,
        marginTop: 5,
        width: '85%',
    },

    continueBtn: {
        marginTop: 22,
        height: 48,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },

    continueText: {
        color: '#050505',
        fontSize: 13,
        fontWeight: '800',
    },
});
