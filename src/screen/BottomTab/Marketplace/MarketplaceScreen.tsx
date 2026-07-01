// MarketplaceScreen.js
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    ImageBackground,
    FlatList,
    ScrollView,
    Alert,
} from 'react-native';
import AppSafeAreaView from '../../../component/common/AppSafeAreaView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenNameEnum from '../../../routes/screenName.enum';
import ScreenHeader from '../../../component/common/ScreenHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { color } from '../../../theme';

const tabs = ['All', 'Supplements', 'Equipment'];

const products = [
    {
        id: 1,
        name: 'Stealth Elite Dumbbells',
        price: '$189.00',
        rating: '4.9',
        image: 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=900&q=80',
    },
    {
        id: 2,
        name: 'Vortex Bands Pro',
        price: '$45.00',
        rating: '4.8',
        image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=900&q=80',
    },
    {
        id: 3,
        name: 'Ignition Pre-Workout',
        price: '$54.99',
        rating: '5.0',
        image: 'https://images.unsplash.com/photo-1612532275214-e4ca76d0e4d1?w=900&q=80',
    },
    {
        id: 4,
        name: 'Apex Performance Hub',
        price: '$299.00',
        rating: '4.9',
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=900&q=80',
    },
];

export default function MarketplaceScreen({ navigation }: any) {
    const [active, setActive] = useState('All');

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#000" barStyle="light-content" />
            <ScreenHeader title="Marketplace" />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

                <View style={styles.tabsRow}>
                    {tabs.map(item => (
                        <TouchableOpacity
                            key={item}
                            onPress={() => setActive(item)}
                            style={[styles.tab, active === item && styles.activeTab]}
                        >
                            <Text style={[styles.tabText, active === item && styles.activeTabText]}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <ImageBackground
                    source={{
                        uri: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=1200&q=80',
                    }}
                    style={styles.banner}
                    imageStyle={styles.bannerImg}
                >
                    <View style={styles.bannerOverlay} />

                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>EDITOR'S CHOICE</Text>
                    </View>

                    <Text style={styles.bannerDesc}>
                        Engineered fuel for recovery. Zero sugar, high bioavailability.
                    </Text>

                    <TouchableOpacity
                        style={styles.shopBtn}
                        onPress={() => navigation?.navigate(ScreenNameEnum.MealRecommendation)}
                    >
                        <Text style={styles.shopText}>Shop Now</Text>
                    </TouchableOpacity>
                </ImageBackground>

                <View style={styles.sectionRow}>
                    <Text style={styles.sectionTitle}>Elite Performance</Text>
                    <TouchableOpacity onPress={() => setActive('All')}>
                        <Text style={styles.viewAll}>VIEW ALL</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={products}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                    scrollEnabled={false}
                    columnWrapperStyle={{ gap: 12 }}
                    contentContainerStyle={{ gap: 12 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            activeOpacity={0.88}
                            style={styles.productCard}
                            onPress={() => navigation?.navigate(ScreenNameEnum.MealRecommendation, { product: item })}>
                            <ImageBackground
                                source={{ uri: item.image }}
                                style={styles.productImage}
                                imageStyle={styles.productImgRadius}
                            >
                                <View style={styles.productOverlay} />

                                <TouchableOpacity
                                    style={styles.heartBtn}
                                    onPress={() => Alert.alert('Saved', `${item.name} was added to your favorites.`)}>
                                    <Ionicons name="heart-outline" size={16} color="#fff" />
                                </TouchableOpacity>
                            </ImageBackground>

                            <View style={styles.productInfo}>
                                <Text style={styles.rating}>★ {item.rating}  (120)</Text>
                                <Text style={styles.productName}>{item.name}</Text>

                                <View style={styles.priceRow}>
                                    <Text style={styles.price}>{item.price}</Text>

                                    <TouchableOpacity
                                        style={styles.cartBtn}
                                        onPress={() => navigation?.navigate(ScreenNameEnum.MealRecommendation, { product: item })}
                                    >
                                        <MaterialCommunityIcons name="cart-plus" size={16} color="#000" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: color.background },

    scroll: {
        paddingHorizontal: 18,
        paddingTop: 5,
        paddingBottom: 120,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    headerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '800',
        marginLeft: 12,
        flex: 1,
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

    tabsRow: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 22,
    },

    tab: {
        height: 28,
        paddingHorizontal: 18,
        borderRadius: 15,
        backgroundColor: '#15161C',
        borderWidth: 1,
        borderColor: '#242630',
        alignItems: 'center',
        justifyContent: 'center',
    },

    activeTab: {
        backgroundColor: '#fff',
        borderColor: '#fff',
    },

    tabText: {
        color: '#B9BBC5',
        fontSize: 11,
        fontWeight: '800',
    },

    activeTabText: {
        color: '#000',
    },

    banner: {
        height: 210,
        borderRadius: 14,
        overflow: 'hidden',
        marginTop: 22,
        padding: 16,
        justifyContent: 'flex-end',
    },

    bannerImg: {
        borderRadius: 14,
    },

    bannerOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.45)',
    },

    badge: {
        position: 'absolute',
        left: 16,
        bottom: 106,
        backgroundColor: '#FFB36B',
        paddingHorizontal: 9,
        paddingVertical: 5,
        borderRadius: 3,
    },

    badgeText: {
        color: '#000',
        fontSize: 9,
        fontWeight: '900',
    },

    bannerTitle: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '900',
    },

    bannerDesc: {
        color: '#AEB0B8',
        fontSize: 12,
        lineHeight: 17,
        marginTop: 5,
        width: '82%',
    },

    shopBtn: {
        width: 110,
        height: 34,
        borderRadius: 5,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 14,
    },

    shopText: {
        color: '#000',
        fontSize: 11,
        fontWeight: '900',
    },

    sectionRow: {
        marginTop: 24,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    sectionTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '900',
    },

    viewAll: {
        color: '#FFB36B',
        fontSize: 9,
        fontWeight: '900',
    },

    productCard: {
        flex: 1,
        backgroundColor: '#12141B',
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#252832',
    },

    productImage: {
        height: 120,
    },

    productImgRadius: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },

    productOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.18)',
    },

    heartBtn: {
        position: 'absolute',
        right: 8,
        top: 8,
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: 'rgba(0,0,0,0.45)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    productInfo: {
        padding: 10,
    },

    rating: {
        color: '#FFB36B',
        fontSize: 9,
        fontWeight: '700',
    },

    productName: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '800',
        marginTop: 5,
        minHeight: 34,
    },

    priceRow: {
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    price: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '900',
    },

    cartBtn: {
        width: 26,
        height: 26,
        borderRadius: 5,
        backgroundColor: '#FF9F1C',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
