import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppThemeColors } from '../../theme/colors';
import { useAppTheme } from '../../theme/ThemeProvider';
import ScreenNameEnum from '../../routes/screenName.enum';

type CustomBottomTabProps = {
    active?: string;
    navigation?: any;
};

export default function CustomBottomTab({ active = 'Home', navigation }: CustomBottomTabProps) {
    const { theme } = useAppTheme();
    const styles = makeStyles(theme.colors);
    const tabs = [
        { name: 'Home', icon: 'home-outline', screen: ScreenNameEnum.HomeTab, type: 'ion' },
        { name: 'Explore', icon: 'view-grid-plus-outline', screen: ScreenNameEnum.ExploreTab, type: 'mc' },
        { name: 'Center', icon: 'sparkles', screen: ScreenNameEnum.CoachTab, type: 'ion' },
        { name: 'Profile', icon: 'person-outline', screen: ScreenNameEnum.ProfileTab, type: 'ion' },
        { name: 'Ranks', icon: 'trophy-outline', screen: ScreenNameEnum.RanksTab, type: 'ion' },
    ];

    return (
        <View style={styles.tabBar}>
            {tabs.map(item => {
                const isCenter = item.name === 'Center';
                const isActive = active === item.name;

                return (
                    <TouchableOpacity
                        key={item.name}
                        activeOpacity={0.8}
                        style={styles.tabItem}
                        onPress={() => navigation?.navigate(item.screen)}>
                        {isCenter ? (
                            <View style={styles.centerBtn}>
                                <Ionicons name="sparkles" size={30} color={theme.colors.accentText} />
                            </View>
                        ) : item.type === 'mc' ? (
                            <MaterialCommunityIcons
                                name={item.icon}
                                size={30}
                                color={isActive ? theme.colors.tabActive : theme.colors.tabInactive}
                            />
                        ) : (
                            <Ionicons
                                name={item.icon}
                                size={30}
                                color={isActive ? theme.colors.tabActive : theme.colors.tabInactive}
                            />
                        )}

                        {!isCenter && (
                            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                                {item.name}
                            </Text>
                        )}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const makeStyles = (colors: AppThemeColors) => StyleSheet.create({
    tabBar: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: Platform.OS === 'ios' ? 118 : 105,
        backgroundColor: colors.tabBar,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        borderWidth: 1,
        borderColor: colors.border,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: Platform.OS === 'ios' ? 22 : 10,
        shadowColor: colors.shadow,
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 20,
    },

    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    tabText: {
        color: colors.tabInactive,
        fontSize: 14,
        marginTop: 6,
        fontWeight: '500',
    },

    activeTabText: {
        color: colors.tabActive,
    },

    centerBtn: {
        width: 92,
        height: 92,
        borderRadius: 46,
        backgroundColor: colors.accent,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -52,
        shadowColor: colors.accent,
        shadowOpacity: 0.75,
        shadowRadius: 20,
        elevation: 15,
    },
});
