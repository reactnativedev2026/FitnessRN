import React, { useRef, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Animated,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenNameEnum from '../../../routes/screenName.enum';
import FitnessHeader from '../../../component/common/FitnessHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SkinnyAIChatScreen({ navigation }: any) {
    const [message, setMessage] = useState('');
    const fade = useRef(new Animated.Value(0)).current;
    const slide = useRef(new Animated.Value(25)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fade, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.spring(slide, {
                toValue: 0,
                friction: 7,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#050507" barStyle="light-content" />

            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
            >

                <Animated.View
                    style={[
                        styles.content,
                        {
                            opacity: fade,
                            transform: [{ translateY: slide }],
                        },
                    ]}>

                    <FitnessHeader style={styles.topHeader} iconSize={18} />

                    <View style={styles.aiHeader}>
                        <View style={styles.aiLeft}>
                            <View style={styles.aiIconBox}>
                                <MaterialCommunityIcons
                                    name="robot-happy-outline"
                                    size={22}
                                    color="#FFB19F"
                                />
                            </View>

                            <View>
                                <Text style={styles.aiTitle}>Skinny AI</Text>
                                <Text style={styles.aiStatus}>Online • Fitness assistant</Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.settingBtn}
                            onPress={() => navigation?.navigate(ScreenNameEnum.SmartNotification)}>
                            <Ionicons name="settings-outline" size={19} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.chatContent}>

                        <View style={styles.userBubble}>
                            <Text style={styles.userText}>
                                I want to lose weight and gain muscle. What’s the best workout plan?
                            </Text>
                        </View>

                        <View style={styles.aiMessageRow}>
                            <View style={styles.sparkIcon}>
                                <MaterialCommunityIcons
                                    name="star-four-points"
                                    size={16}
                                    color="#FFB86B"
                                />
                            </View>


                        </View>

                        <View style={styles.userBubbleSmall}>
                            <Text style={styles.userText}>
                                What are some healthy diet ideas for muscle gain?
                            </Text>
                        </View>

                        <View style={styles.aiMessageRow}>
                            <View style={styles.sparkIcon}>
                                <Ionicons name="nutrition-outline" size={17} color="#FFB86B" />
                            </View>

                            <View style={styles.aiCard}>
                                <Text style={styles.planTitle}>Muscle Gain Diet Ideas</Text>

                                <Text style={styles.planText}>
                                    Focus on high-protein meals, complex carbs, healthy fats, and
                                    hydration. Keep your meals simple and consistent.
                                </Text>

                                <View style={styles.chipsRow}>
                                    <View style={styles.chip}>
                                        <Text style={styles.chipText}>Protein</Text>
                                    </View>
                                    <View style={styles.chip}>
                                        <Text style={styles.chipText}>Clean carbs</Text>
                                    </View>
                                    <View style={styles.chip}>
                                        <Text style={styles.chipText}>Hydration</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>

                    <View style={styles.inputBox}>
                        <Ionicons
                            name="chatbubble-ellipses-outline"
                            size={20}
                            color="#6E7480"
                        />

                        <TextInput
                            placeholder="Describe your performance goals..."
                            placeholderTextColor="#6E7480"
                            style={styles.input}
                            value={message}
                            onChangeText={setMessage}
                            returnKeyType="send"
                            onSubmitEditing={() => {
                                if (!message.trim()) return;
                                Alert.alert('Message sent', message.trim());
                                setMessage('');
                            }}
                        />

                        <TouchableOpacity
                            activeOpacity={0.85}
                            style={styles.sendBtn}
                            onPress={() => {
                                if (!message.trim()) return;
                                // Alert.alert('Message sent', message.trim());
                                setMessage('');
                            }}>
                            <Ionicons name="send" size={17} color="#2A120B" />
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },

    container: {
        flex: 1,
        backgroundColor: '#050507',
    },

    content: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 12,
    },

    topHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    aiHeader: {
        minHeight: 68,
        borderRadius: 22,
        backgroundColor: '#14161D',
        borderWidth: 1,
        borderColor: '#252833',
        marginTop: 18,
        paddingHorizontal: 14,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    aiLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    aiIconBox: {
        width: 44,
        height: 44,
        borderRadius: 16,
        backgroundColor: '#252730',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    aiTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '900',
    },

    aiStatus: {
        color: '#8F96A3',
        fontSize: 11,
        marginTop: 3,
        fontWeight: '600',
    },

    settingBtn: {
        width: 38,
        height: 38,
        borderRadius: 14,
        backgroundColor: '#22252D',
        alignItems: 'center',
        justifyContent: 'center',
    },

    chatContent: {
        paddingTop: 24,
        paddingBottom: 120,
    },

    userBubble: {
        alignSelf: 'flex-end',
        maxWidth: '82%',
        backgroundColor: '#2B2D36',
        borderRadius: 22,
        borderTopRightRadius: 6,
        padding: 16,
        marginBottom: 20,
    },

    userBubbleSmall: {
        alignSelf: 'flex-end',
        maxWidth: '78%',
        backgroundColor: '#2B2D36',
        borderRadius: 22,
        borderTopRightRadius: 6,
        padding: 15,
        marginTop: 20,
        marginBottom: 20,
    },

    userText: {
        color: '#F1F2F5',
        fontSize: 13,
        lineHeight: 20,
        fontWeight: '500',
    },

    aiMessageRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    sparkIcon: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: '#1C1E25',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        marginTop: 4,
    },

    aiCard: {
        flex: 1,
        backgroundColor: '#11131A',
        borderRadius: 22,
        borderTopLeftRadius: 6,
        borderWidth: 1,
        borderColor: '#292C36',
        padding: 16,
    },

    aiCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    planTitle: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '900',
        flex: 1,
    },

    aiTag: {
        backgroundColor: '#FFB19F',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
        marginLeft: 8,
    },

    aiTagText: {
        color: '#2A120B',
        fontSize: 10,
        fontWeight: '900',
    },

    planText: {
        color: '#C8CAD3',
        fontSize: 13,
        lineHeight: 21,
        marginTop: 10,
    },

    bulletBox: {
        marginTop: 12,
        padding: 12,
        borderRadius: 16,
        backgroundColor: '#1B1E27',
        borderWidth: 1,
        borderColor: '#2A2D38',
    },

    bullet: {
        color: '#E3E4EA',
        fontSize: 12,
        lineHeight: 21,
        fontWeight: '600',
    },

    chipsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 14,
    },

    chip: {
        height: 32,
        paddingHorizontal: 13,
        borderRadius: 16,
        backgroundColor: '#1B1E27',
        borderWidth: 1,
        borderColor: '#2A2D38',
        justifyContent: 'center',
    },

    chipText: {
        color: '#FFB19F',
        fontSize: 11,
        fontWeight: '900',
    },

    inputBox: {
        position: 'absolute',
        left: 16,
        right: 16,
        bottom: 90,
        minHeight: 64,
        borderRadius: 22,
        backgroundColor: '#11131A',
        borderWidth: 1,
        borderColor: '#2A2D38',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
    },

    input: {
        flex: 1,
        color: '#fff',
        fontSize: 13,
        paddingHorizontal: 12,
    },

    sendBtn: {
        width: 42,
        height: 42,
        borderRadius: 16,
        backgroundColor: '#FFB19F',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
