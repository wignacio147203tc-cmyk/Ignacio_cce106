import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#2563EB', dark: '#1E3A8A' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Profile Introduction App</ThemedText>
      </ThemedView>

      <ThemedView style={styles.card}>
        <ThemedText type="subtitle">👨‍🎓 Student Name</ThemedText>
        <ThemedText style={styles.content}>
          Winchell Ignacio
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.card}>
        <ThemedText type="subtitle">📚 Course</ThemedText>
        <ThemedText style={styles.content}>
          BSIT - Bachelor of Science in Information Technology
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.card}>
        <ThemedText type="subtitle">💡 App Idea</ThemedText>
        <ThemedText style={styles.content}>
          This mobile application introduces a student profile,
          showcasing personal information, course details,
          skills, and future software development projects.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.card}>
        <ThemedText type="subtitle">🚀 Future Goal</ThemedText>
        <ThemedText style={styles.content}>
          Become a Software Engineer and build useful
          applications that solve real-world problems.
        </ThemedText>
      </ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  card: {
    padding: 20,
    marginBottom: 15,
    borderRadius: 16,
    backgroundColor: '#2563EB',
  },

  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF',
  },

  reactLogo: {
    height: 180,
    width: 300,
    position: 'absolute',
    bottom: 0,
    left: 0,
    opacity: 0.3,
  },
});