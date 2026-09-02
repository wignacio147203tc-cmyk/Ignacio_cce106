import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  View
} from 'react-native';

import { ThemedText } from '@/components/themed-text';

export default function HomeScreen() {
  // ==========================================
  // STATE
  // ==========================================

  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  // ==========================================
  // CALCULATE
  // ==========================================

  const calculate = (operator: string) => {
    // Validate empty inputs
    if (
      firstNumber.trim() === '' ||
      secondNumber.trim() === ''
    ) {
      setError('Please enter both numbers.');
      setResult('');
      return;
    }

    // Convert input to numbers
    const num1 = Number(firstNumber);
    const num2 = Number(secondNumber);

    // Validate numbers
    if (isNaN(num1) || isNaN(num2)) {
      setError('Please enter valid numbers.');
      setResult('');
      return;
    }

    // Prevent division by zero
    if (operator === '/' && num2 === 0) {
      setError('Cannot divide by zero.');
      setResult('');
      return;
    }

    let answer = 0;

    // Perform calculation
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

  // ==========================================
  // CLEAR
  // ==========================================

  const clearCalculator = () => {
    setFirstNumber('');
    setSecondNumber('');
    setResult('');
    setError('');
  };

  // ==========================================
  // USER INTERFACE
  // ==========================================

  return (
    <View style={styles.container}>

      {/* HEADER */}

      <ThemedText style={styles.title}>
        Simple Calculator
      </ThemedText>

      <ThemedText style={styles.subtitle}>
        Enter two numbers and select an operation
      </ThemedText>


      {/* FIRST NUMBER */}

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


      {/* SECOND NUMBER */}

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


      {/* ERROR MESSAGE */}

      {error !== '' && (
        <View style={styles.errorBox}>
          <ThemedText style={styles.errorText}>
            ⚠️ {error}
          </ThemedText>
        </View>
      )}


      {/* OPERATIONS */}

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


      {/* RESULT */}

      <View style={styles.resultCard}>

        <ThemedText style={styles.resultLabel}>
          Result
        </ThemedText>

        <ThemedText style={styles.result}>
          {result === '' ? '—' : result}
        </ThemedText>

      </View>


      {/* CLEAR BUTTON */}

      <Pressable
        style={styles.clearButton}
        onPress={clearCalculator}
      >
        <ThemedText style={styles.clearButtonText}>
          Clear
        </ThemedText>
      </Pressable>

    </View>
  );
}


// ==========================================
// STYLES
// ==========================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
    padding: 20,
    paddingTop: 70,
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

});
