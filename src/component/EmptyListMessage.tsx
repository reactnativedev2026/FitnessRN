import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import font from '../theme/font';

const { height } = Dimensions.get('window');

type EmptyListMessageProps = {
  message?: string;
  icon?: string;
};

const EmptyListMessage: React.FC<EmptyListMessageProps> = ({ 
  message = "No deliveries found at the moment.",
  icon = "cube-outline" 
}) => {
  return (
    <View style={styles.emptyContainer}>
      <View style={styles.iconCircle}>
        <Icon name={icon} size={60} color="#393B48" />
      </View>
      <Text allowFontScaling={false} style={styles.emptyText}>{message}</Text>
      <Text allowFontScaling={false} style={styles.subText}>
        When you have new tasks, they will appear here.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    height: height * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  emptyText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: font.TrialBold,
    textAlign: "center",
    marginBottom: 8,
  },
  subText: {
    fontSize: 14,
    color: '#6F767E',
    fontFamily: font.MonolithRegular,
    textAlign: "center",
    lineHeight: 20,
  },
});

export default EmptyListMessage;
