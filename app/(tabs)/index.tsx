import React, { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';

export default function HomeScreen() {
  const router = useRouter();

  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const calculate = (operator: string) => {
    if (
      firstNumber.trim() === '' ||
      secondNumber.trim() === ''
    ) {
      setError('Please enter both numbers.');
      setResult('');
      return;
    }

    const num1 = Number(firstNumber);
    const num2 = Number(secondNumber);

    if (isNaN(num1) || isNaN(num2)) {
      setError('Please enter valid numbers.');
      setResult('');
      return;
    }

    if (operator === '/' && num2 === 0) {
      setError('Cannot divide by zero.');
      setResult('');
      return;
    }

    let answer = 0;

    switch (operator) {
      case '+':
        answer = num1 + num2;
        break;

      case '-':
        answer = num1 - num2;
        break;

      case '*':
        answer = num1 * num2;
        break;

      case '/':
        answer = num1 / num2;
        break;

      default:
        return;
    }

    setResult(answer.toString());
    setError('');
  };

  const clearCalculator = () => {
    setFirstNumber('');
    setSecondNumber('');
    setResult('');
    setError('');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <ThemedText style={styles.title}>
        Simple Calculator
      </ThemedText>

      <ThemedText style={styles.subtitle}>
        Enter two numbers and select an operation
      </ThemedText>

      <ThemedText style={styles.label}>
        First Number
      </ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Enter first number"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={firstNumber}
        onChangeText={setFirstNumber}
      />

      <ThemedText style={styles.label}>
        Second Number
      </ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Enter second number"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={secondNumber}
        onChangeText={setSecondNumber}
      />

      {error !== '' && (
        <View style={styles.errorBox}>
          <ThemedText style={styles.errorText}>
            ⚠️ {error}
          </ThemedText>
        </View>
      )}

      <ThemedText style={styles.operationTitle}>
        Select Operation
      </ThemedText>

      <View style={styles.buttonRow}>
        <Pressable
          style={styles.operationButton}
          onPress={() => calculate('+')}
        >
          <ThemedText style={styles.buttonText}>
            +
          </ThemedText>
        </Pressable>

        <Pressable
          style={styles.operationButton}
          onPress={() => calculate('-')}
        >
          <ThemedText style={styles.buttonText}>
            −
          </ThemedText>
        </Pressable>

        <Pressable
          style={styles.operationButton}
          onPress={() => calculate('*')}
        >
          <ThemedText style={styles.buttonText}>
            ×
          </ThemedText>
        </Pressable>

        <Pressable
          style={styles.operationButton}
          onPress={() => calculate('/')}
        >
          <ThemedText style={styles.buttonText}>
            ÷
          </ThemedText>
        </Pressable>
      </View>

      <View style={styles.resultCard}>
        <ThemedText style={styles.resultLabel}>
          Result
        </ThemedText>

        <ThemedText style={styles.result}>
          {result === '' ? '—' : result}
        </ThemedText>
      </View>

      <Pressable
        style={styles.clearButton}
        onPress={clearCalculator}
      >
        <ThemedText style={styles.clearButtonText}>
          Clear
        </ThemedText>
      </Pressable>

      <View style={styles.navigationContainer}>
        <Pressable
          style={styles.navigationButton}
          onPress={() => router.push('/profile')}
        >
          <ThemedText style={styles.navigationButtonText}>
            Go to Profile
          </ThemedText>
        </Pressable>

        <Link href="/settings" asChild>
          <Pressable style={styles.navigationButton}>
            <ThemedText style={styles.navigationButtonText}>
              Go to Settings
            </ThemedText>
          </Pressable>
        </Link>

        <Link href="/course/CCE106" asChild>
          <Pressable style={styles.navigationButton}>
            <ThemedText style={styles.navigationButtonText}>
              View Course
            </ThemedText>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },

  contentContainer: {
    padding: 20,
    paddingTop: 70,
    paddingBottom: 120,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#202020',
    textAlign: 'center',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 35,
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#444',
    marginBottom: 7,
  },

  input: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 17,
    color: '#222',
    marginBottom: 18,
  },

  errorBox: {
    backgroundColor: '#FFE5E5',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },

  errorText: {
    color: '#D32F2F',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },

  operationTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#333',
    marginBottom: 12,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  operationButton: {
    width: '23%',
    height: 55,
    borderRadius: 12,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
  },

  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 25,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },

  resultLabel: {
    fontSize: 14,
    color: '#777',
    marginBottom: 8,
  },

  result: {
    fontSize: 36,
    fontWeight: '800',
    color: '#6C63FF',
  },

  clearButton: {
    height: 50,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  clearButtonText: {
    color: '#6C63FF',
    fontSize: 16,
    fontWeight: '800',
  },

  navigationContainer: {
    marginTop: 15,
    gap: 10,
  },

  navigationButton: {
    height: 48,
    borderRadius: 12,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  navigationButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});

