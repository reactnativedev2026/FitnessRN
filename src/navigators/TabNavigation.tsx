import React, { useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
    Animated,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeScreen from '../screen/BottomTab/HomeScreen/HomeScreen';
import RanksScreen from '../screen/BottomTab/HomeScreen/Ranks/RanksScreen';
import Login from '../screen/auth/login/LoginScreen';
import ProfileScreen from '../screen/Profile/profile-screen/ProfileScreen';
import ExploreScreen from '../screen/BottomTab/HomeScreen/Explore/ExploreScreen';
import { useAppTheme } from '../theme/ThemeProvider';
import { AppThemeColors } from '../theme/colors';
import SkinnyAIChatScreen from '../screen/BottomTab/SkinnyAIChat/SkinnyAIChatScreen';
import ProfileIndex from '../screen/Profile/ProfileIndex';

const Tab = createBottomTabNavigator();

const TAB_CONFIG = {
    Home: {
        label: 'Home',
        icon: 'home-outline',
        activeIcon: 'home',
        type: 'ion',
    },
    Explore: {
        label: 'Explore',
        icon: 'view-grid-plus-outline',
        activeIcon: 'view-grid-plus',
        type: 'mc',
    },
    Center: {
        label: '',
        icon: 'sparkles',
        activeIcon: 'sparkles',
        type: 'ion',
    },
    Stats: {
        label: 'Stats',
        icon: 'heart-outline',
        activeIcon: 'heart',
        type: 'ion',
    },
    Ranks: {
        label: 'Ranks',
        icon: 'trophy-outline',
        activeIcon: 'trophy',
        type: 'ion',
    },
};
type TabRouteName = keyof typeof TAB_CONFIG;
type TabButtonProps = {
    route: {
        key: string;
        name: string;
    };
    focused: boolean;
    navigation: any;
};
type CustomBottomTabProps = {
    state: {
        index: number;
        routes: Array<{ key: string; name: string }>;
    };
    navigation: any;
};

function TabButton({ route, focused, navigation }: TabButtonProps) {
    const scale = useRef(new Animated.Value(focused ? 1 : 0)).current;
    const isCenter = route.name === 'Center';
    const item = TAB_CONFIG[route.name as TabRouteName];
    const { theme } = useAppTheme();
    const styles = makeStyles(theme.colors);

    React.useEffect(() => {
        Animated.spring(scale, {
            toValue: focused ? 1 : 0,
            useNativeDriver: true,
            friction: 5,
            tension: 90,
        }).start();
    }, [focused]);

    const iconScale = scale.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.14],
    });

    const dotScale = scale.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    const onPress = () => {
        const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
        });

        if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name);
        }
    };

    const iconColor = focused ? theme.colors.tabActive : theme.colors.tabInactive;

    return (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={onPress}
            style={styles.tabItem}
        >
            {isCenter ? (
                <Animated.View
                    style={[
                        styles.centerBtn,
                        {
                            transform: [
                                {
                                    scale: focused
                                        ? scale.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [1, 1.08],
                                        })
                                        : 1,
                                },
                            ],
                        },
                    ]}
                >
                    <Ionicons name="sparkles" size={30} color={theme.colors.accentText} />
                </Animated.View>
            ) : (
                <>
                    <Animated.View style={{ transform: [{ scale: iconScale }] }}>
                        {item.type === 'mc' ? (
                            <MaterialCommunityIcons
                                name={focused ? item.activeIcon : item.icon}
                                size={25}
                                color={iconColor}
                            />
                        ) : (
                            <Ionicons
                                name={focused ? item.activeIcon : item.icon}
                                size={25}
                                color={iconColor}
                            />
                        )}
                    </Animated.View>

                    <Text style={[styles.tabText, focused && styles.activeText]}>
                        {item.label}
                    </Text>

                    <Animated.View
                        style={[
                            styles.activeDot,
                            {
                                transform: [{ scale: dotScale }],
                                opacity: scale,
                            },
                        ]}
                    />
                </>
            )}
        </TouchableOpacity>
    );
}

function CustomBottomTab({ state, navigation }: CustomBottomTabProps) {
    const insets = useSafeAreaInsets();
    const { theme } = useAppTheme();
    const styles = makeStyles(theme.colors);

    return (
        <View
            style={[
                styles.tabBarWrapper,
                {
                    paddingBottom: Platform.OS === 'ios' ? insets.bottom + 8 : 10,
                },
            ]}
        >
            <View style={styles.tabBar}>
                {state.routes.map((route, index) => (
                    <TabButton
                        key={route.key}
                        route={route}
                        focused={state.index === index}
                        navigation={navigation}
                    />
                ))}
            </View>
        </View>
    );
}

export default function TabNavigator() {
    return (
        <Tab.Navigator
            tabBar={props => <CustomBottomTab {...props} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Explore" component={ExploreScreen} />
            <Tab.Screen name="Center" component={SkinnyAIChatScreen} />
            <Tab.Screen name="Ranks" component={RanksScreen} />
            <Tab.Screen name="Stats" component={ProfileIndex} />

        </Tab.Navigator>
    );
}

const makeStyles = (colors: AppThemeColors) => StyleSheet.create({
    tabBarWrapper: {
        position: 'absolute',
        left: 22,
        right: 22,
        bottom: -1,
    },

    tabBar: {
        height: 86,
        backgroundColor: colors.tabBar,
        borderRadius: 24,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',

    },

    tabItem: {
        flex: 1,
        height: 86,
        alignItems: 'center',
        justifyContent: 'center',
    },

    tabText: {
        color: colors.tabInactive,
        fontSize: 12,
        marginTop: 5,
        fontWeight: '600',
    },

    activeText: {
        color: colors.tabActive,
    },

    activeDot: {
        width: 5,
        height: 5,
        borderRadius: 3,
        backgroundColor: colors.tabActive,
        marginTop: 4,
    },

    centerBtn: {
        width: 66,
        height: 66,
        borderRadius: 43,
        backgroundColor: colors.accent,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -58,


    },
});
