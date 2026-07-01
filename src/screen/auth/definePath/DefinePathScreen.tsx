import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ImageBackground,
    TouchableOpacity,
    Platform,
    ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import imageIndex from '../../../assets/imageIndex';
import { resetToMainTabs } from '../../../routes/navigationService';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../../../theme/ThemeProvider';


export default function DefinePathScreen({ navigation }: any) {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

    const [selected, setSelected] = useState('Muscle Gain');
    const enterApp = () => resetToMainTabs();

    const options = [
        {
            icon: 'dumbbell',
            tag: 'HYPERTROPHY',
            title: 'Muscle Gain',
            desc: 'Power, mass, and structural integrity.',
        },
        {
            icon: 'speedometer',
            tag: 'METABOLIC',
            title: 'Weight Loss',
            desc: 'High-intensity fat oxidation and lean tone.',
        },
        {
            icon: 'food-apple-outline',
            tag: 'BALANCE',
            title: 'General Fitness',
            desc: 'Mobility, heart health, and daily vigor.',
        },
    ];

    return (
        <ImageBackground source={imageIndex.bag} style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />


            <SafeAreaView style={styles.safe}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation?.goBack()}>
                        <Ionicons name="arrow-back" size={25} color="#fff" />
                    </TouchableOpacity>

                    <View style={styles.progress}>
                        <View style={styles.progressFill} />
                    </View>

                    <Text style={styles.step}>3/3</Text>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.content}>
                    <Text style={styles.title}>Define Your Path</Text>

                    <Text style={styles.subtitle}>
                        Elite performance starts with a singular focus.
                        Select your primary mission.
                    </Text>

                    {options.map(item => (
                        <OptionCard
                            key={item.title}
                            {...item}
                            selected={selected === item.title}
                            onPress={() => setSelected(item.title)}
                        />
                    ))}
                </ScrollView>

                <View style={styles.bottomBox}>
                    <TouchableOpacity style={styles.nextBtn}

                        onPress={enterApp}
                    >
                        <Text style={styles.nextText}>Continue</Text>
                        <Ionicons name="arrow-forward" size={22} color="#101010" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={enterApp}
                    >
                        <Text style={styles.skipText}>Skip for now</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

function OptionCard({ icon, tag, title, desc, selected, onPress }: any) {
    const { theme } = useAppTheme();
    const styles = createStyles(theme);

    return (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={onPress}
            style={[styles.card, selected && styles.activeCard]}>
            <View style={[styles.iconBox, selected && styles.activeIconBox]}>
                <MaterialCommunityIcons
                    name={icon}
                    size={34}
                    color={selected ? '#111' : '#FFB77A'}
                />
            </View>

            <View style={styles.cardTextBox}>
                <Text style={styles.tag}>{tag}</Text>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardDesc}>{desc}</Text>
            </View>

            <View style={[styles.radio, selected && styles.radioActive]}>
                {selected && <Ionicons name="checkmark" size={16} color="#111" />}
            </View>
        </TouchableOpacity>
    );
}

const createStyles = (theme: any) => StyleSheet.create({
    container: {
        flex: 1,
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(5,7,12,0.78)',
    },

    safe: {
        flex: 1,
    },

    header: {
        height: 64,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },

    backBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.10)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.12)',
    },

    progress: {
        flex: 1,
        height: 5,
        backgroundColor: 'rgba(255,255,255,0.18)',
        borderRadius: 20,
        marginHorizontal: 18,
        overflow: 'hidden',
    },

    progressFill: {
        width: '100%',
        height: '100%',
        backgroundColor: '#E09A45',
        borderRadius: 20,
    },

    step: {
        color: theme.colors.text,
        fontSize: 15,
        fontWeight: '800',
    },

    content: {
        paddingHorizontal: 22,
        paddingTop: 48,
        paddingBottom: 150,
    },

    title: {
        color: theme.colors.text,
        fontSize: 38,
        lineHeight: 46,
        fontWeight: '900',
        textAlign: 'center',
        marginBottom: 14,
    },

    subtitle: {
        color: '#B8B8B8',
        fontSize: 16,
        lineHeight: 25,
        textAlign: 'center',
        marginBottom: 34,
        fontWeight: '500',
    },

    card: {
        minHeight: 124,
        backgroundColor: 'rgba(17,20,28,0.92)',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.12)',
        marginBottom: 18,
        padding: 18,
        flexDirection: 'row',
        alignItems: 'center',
    },

    activeCard: {
        borderColor: '#FFB77A',
        backgroundColor: 'rgba(255,183,122,0.13)',
    },

    iconBox: {
        width: 62,
        height: 62,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: 'rgba(255,183,122,0.35)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
        backgroundColor: 'rgba(255,183,122,0.08)',
    },

    activeIconBox: {
        backgroundColor: '#FFB77A',
        borderColor: '#FFB77A',
    },

    cardTextBox: {
        flex: 1,
    },

    tag: {
        color: '#FFB77A',
        fontSize: 11,
        fontWeight: '900',
        letterSpacing: 2.2,
        marginBottom: 6,
    },

    cardTitle: {
        color: theme.colors.text,
        fontSize: 23,
        lineHeight: 29,
        fontWeight: '900',
    },

    cardDesc: {
        color: '#C9C9C9',
        fontSize: 14,
        lineHeight: 21,
        marginTop: 6,
        fontWeight: '500',
    },

    radio: {
        width: 26,
        height: 26,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.35)',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
    },

    radioActive: {
        backgroundColor: '#FFB77A',
        borderColor: '#FFB77A',
    },

    bottomBox: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 22,
        paddingTop: 16,
        paddingBottom: Platform.OS === 'ios' ? 11 : 5,

    },

    nextBtn: {
        height: 58,
        borderRadius: 20,
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
        marginBottom: 14,
    },

    nextText: {
        color: '#101010',
        fontSize: 14,
        fontWeight: '600',
    },

    skipText: {
        color: theme.colors.text,
        fontSize: 15,
        fontWeight: '700',
        textAlign: 'center',
    },
});
