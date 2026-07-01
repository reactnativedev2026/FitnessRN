import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../../component/common/CustomButton';
// Removed static color import;
import AppSafeAreaView from '../../../component/common/AppSafeAreaView';
import imageIndex from '../../../assets/imageIndex';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../../../theme/ThemeProvider';


const BiometricProfile = ({ navigation }: any) => {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

    const [age, setAge] = useState(28);
    const [height, setHeight] = useState(178);
    const [weight, setWeight] = useState(76.5);

    const FieldCard = ({ no, label, value, unit, onMinus, onPlus }: any) => (
        <View style={styles.card}>
            <View style={styles.cardTop}>
                <Text style={styles.cardLabel}>
                    {no} / {label}
                </Text>

                <View style={styles.valueRow}>
                    <Text style={styles.value}>{value}</Text>
                    <Text style={styles.unit}>{unit}</Text>
                </View>
            </View>

            <View style={styles.controlRow}>
                <TouchableOpacity style={styles.minusBtn} onPress={onMinus}>
                    <Text style={styles.minusText}>−</Text>
                </TouchableOpacity>

                <View style={styles.sliderBox}>
                    <Text style={styles.minusText}>{value}</Text>
                </View>

                <TouchableOpacity style={styles.plusBtn} onPress={onPlus}>
                    <Text style={styles.plusText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <ImageBackground
            source={imageIndex.bag}
            style={styles.bg}
        >
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#000" />

                <View style={styles.header}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={25} color="#fff" />
                    </TouchableOpacity>


                    <View style={styles.progressTrack}>
                        <View style={styles.progressFill} />
                    </View>

                    <Text style={styles.step}>Step 2 of 3</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>

                    <Text style={styles.title}>Biometric Profile</Text>
                    <Text style={styles.subtitle}>
                        Define your physical baseline for high-{'\n'}precision tracking.
                    </Text>

                    <FieldCard
                        no="01"
                        label="AGE"
                        value={age}
                        unit="YRS"
                        onMinus={() => setAge(age - 1)}
                        onPlus={() => setAge(age + 1)}
                    />

                    <FieldCard
                        no="02"
                        label="HEIGHT"
                        value={height}
                        unit="CM"
                        onMinus={() => setHeight(height - 1)}
                        onPlus={() => setHeight(height + 1)}
                    />

                    <FieldCard
                        no="03"
                        label="WEIGHT"
                        value={weight}
                        unit="BG"
                        onMinus={() => setWeight(Number((weight - 0.5).toFixed(1)))}
                        onPlus={() => setWeight(Number((weight + 0.5).toFixed(1)))}
                    />
                </ScrollView>

                <CustomButton title={"Continue"}

                    onPress={() => navigation.navigate(ScreenNameEnum.DefinePathScreen)}
                />

            </SafeAreaView>
        </ImageBackground>
    );
};

export default BiometricProfile;

const createStyles = (theme: any) => StyleSheet.create({
    bg: {
        flex: 1,
    },
    bgImage: {
        opacity: 0.55,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        paddingHorizontal: 22,
    },
    header: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
    },
    progressTrack: {
        flex: 1,
        height: 5,
        backgroundColor: 'rgba(255,255,255,0.22)',
        marginHorizontal: 14,
        borderRadius: 20,
        overflow: 'hidden',
    },
    progressFill: {
        width: '65%',
        height: '100%',
        backgroundColor: '#E09A45',
        borderRadius: 20,
    },
    step: {
        color: theme.colors.text,
        fontSize: 15,
        fontWeight: '800',
    },
    backBtn: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: 'rgba(255,255,255,0.12)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: theme.colors.text,
        fontSize: 44,
        fontWeight: '900',
        marginTop: 22,
        letterSpacing: -1,
    },
    subtitle: {
        color: '#cacad8ff',
        fontSize: 15,
        lineHeight: 23,
        marginTop: 12,
        marginBottom: 28,
    },
    card: {
        backgroundColor: '#1d1e25',
        borderWidth: 1,
        borderColor: '#2b2c34',
        paddingHorizontal: 28,
        paddingVertical: 34,
        marginBottom: 42,
        borderRadius: 12
    },
    cardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardLabel: {
        color: '#c8c8ce',
        fontSize: 17,
        fontWeight: '900',
        letterSpacing: 4,
    },
    valueRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    value: {
        color: theme.colors.text,
        fontSize: 42,
        fontWeight: '900',
    },
    unit: {
        color: '#c8c8ce',
        fontSize: 14,
        fontWeight: '800',
        marginLeft: 6,
        marginBottom: 8,
        letterSpacing: 1,
    },
    controlRow: {
        marginTop: 36,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    minusBtn: {
        width: 58,
        height: 58,
        borderWidth: 1,
        borderColor: '#55565c',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#101116',
    },
    minusText: {
        color: '#ddd',
        fontSize: 32,
    },
    sliderBox: {
        width: 165,
        height: 58,
        backgroundColor: '#0d0e13',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sliderGlow: {
        width: 7,
        height: 34,
        backgroundColor: theme.colors.surface,
        borderRadius: 20,
        shadowColor: '#fff',
        shadowOpacity: 1,
        shadowRadius: 14,
        elevation: 10,
    },
    plusBtn: {
        width: 58,
        height: 58,
        borderWidth: 1,
        borderColor: '#ff9200',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,146,0,0.14)',
    },
    plusText: {
        color: '#ffbd78',
        fontSize: 34,
        fontWeight: '300',
    },
    continueBtn: {
        height: 76,
        borderRadius: 16,
        backgroundColor: theme.colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 26,
        marginTop: -5,
    },
    continueText: {
        color: theme.colors.text,
        fontSize: 22,
        fontWeight: '500',
    },
});
