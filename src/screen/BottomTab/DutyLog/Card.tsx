import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { color } from '../../../constant';

const CircularProgress = ({
  percentage,
  color: strokeColor,
  label,
}) => {
  const radius = 28;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (circumference * percentage) / 100;

  return (
    <View style={styles.progressWrapper}>
      <Svg width={70} height={70}>
        <Circle
          cx="35"
          cy="35"
          r={radius}
          stroke="#eee"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx="35"
          cy="35"
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          rotation="-90"
          origin="35,35"
        />
      </Svg>

      <Text style={styles.percentText}>{percentage}%</Text>
      <Text style={styles.progressLabel}>{label}</Text>
    </View>
  );
};

const LogEntryCard = ({ item }) => {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={{ borderLeftWidth: 4, borderLeftColor: color.primary, paddingLeft: 10 }}>
          <Text style={styles.heading}>Log Entry</Text>
          <Text style={styles.date}>{item?.log_entry}</Text>
        </View>

        <View style={{ alignItems: 'flex-end', borderRightWidth: 4, borderRightColor: color.primary, paddingRight: 10 }}>
          <Text style={styles.heading}>Total Driving Hours</Text>
          <Text style={styles.date}>{item?.total_driving_hours
          }</Text>
        </View>
      </View>



      <View style={styles.headerRow}>
        <View style={{ borderLeftWidth: 4, borderLeftColor: color.primary, paddingLeft: 10 }}>
          <Text style={styles.heading}>Total On Duty</Text>
          <Text style={styles.date}>{item?.total_on_duty
          }</Text>
        </View>

        <View style={{ alignItems: 'flex-end', borderRightWidth: 4, borderRightColor: color.primary, paddingRight: 10 }}>
          <Text style={styles.heading}>Break Time</Text>
          <Text style={styles.date}>{item?.break_time}</Text>
        </View>
      </View>


      {/* Progress */}
      <View style={styles.progressRow}>
        <CircularProgress
          percentage={item?.percentage?.driving}
          color="#4CD964"
          label="Driving"
        />
        <CircularProgress
          percentage={item?.percentage?.on_duty}
          color="#007AFF"
          label="On Duty"
        />
        <CircularProgress
          percentage={item?.percentage?.break}
          color="#FF9500"
          label="Break"
        />
        <CircularProgress
          percentage={item?.percentage?.off_duty}
          color="#FF3B30"
          label="Off Duty"
        />
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Download PDF</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogEntryCard;
const styles = StyleSheet.create({
  card: {
    borderWidth: 1.5,
    borderColor: '#FF3B3B',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },

  heading: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0056B3'
  },

  date: {
    fontSize: 12,
    color: '#424242',
    marginTop: 2,
  },

  subHeading: {
    fontSize: 12,
    color: '#777',
  },

  time: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },

  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },

  progressWrapper: {
    alignItems: 'center',
    width: 70,
  },

  percentText: {
    position: 'absolute',
    top: 24,
    fontSize: 12,
    fontWeight: '600',
  },

  progressLabel: {
    marginTop: 6,
    fontSize: 12,
    color: '#555',
    fontWeight: 'bold'
  },

  button: {
    backgroundColor: '#FF3B3B',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 18,
    alignSelf: 'center',

    paddingHorizontal: 30
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
