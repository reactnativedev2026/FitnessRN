import React, { useState, useRef } from 'react';
import { View, StyleSheet, PanResponder, TouchableOpacity, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import ViewShot from 'react-native-view-shot';

interface SignaturePadProps {
  onSave: (path: string) => void;
  onClear: () => void;
}

const SignaturePad: React.FC<SignaturePadProps> = ({ onSave, onClear }) => {
  const [paths, setPaths] = useState<string[]>([]);
  const viewShotRef = useRef<any>(null);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        const startPoint = `M${locationX},${locationY}`;
        setPaths((prev) => [...prev, startPoint]);
      },
      onPanResponderMove: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        const newPoint = ` L${locationX},${locationY}`;
        setPaths((prev) => {
          if (prev.length === 0) return prev;
          const newPaths = [...prev];
          newPaths[newPaths.length - 1] += newPoint;
          return newPaths;
        });
      },
      onPanResponderRelease: () => {
      },
    })
  ).current;

  const handleClear = () => {
    setPaths([]);
    onClear();
  };

  const handleSave = async () => {
    if (paths.length > 0) {
      try {
        if (viewShotRef.current) {
          const uri = await viewShotRef.current.capture();
          // uri is base64 string since we specify format and result
          onSave(`data:image/png;base64,${uri}`);
        }
      } catch (err) {
        console.error("Error capturing signature:", err);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.canvas} {...panResponder.panHandlers}>
        <ViewShot 
          ref={viewShotRef} 
          style={{ flex: 1, backgroundColor: '#fff' }}
          options={{ format: "png", quality: 1, result: "base64" }}
        >
          <Svg style={StyleSheet.absoluteFill}>
            {paths.map((p, i) => (
              <Path key={i} d={p} stroke="black" strokeWidth={3} fill="none" />
            ))}
          </Svg>
        </ViewShot>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleClear}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#2CC59D' }]} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  canvas: {
    flex: 1,
    backgroundColor: '#fff',
  },
  footer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  button: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});

export default SignaturePad;
