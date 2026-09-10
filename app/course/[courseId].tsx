import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function CourseScreen() {
  const { courseId } = useLocalSearchParams();
  const router = useRouter();

  const validCourseIds = ['CCE106'];

  const currentCourseId = Array.isArray(courseId)
    ? courseId[0]
    : courseId;

  const isValid = validCourseIds.includes(currentCourseId ?? '');

  if (!isValid) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Invalid Course</Text>

        <Text style={styles.errorText}>
          The course ID "{currentCourseId}" does not exist.
        </Text>

        <Pressable
          style={styles.button}
          onPress={() => router.push('/')}
        >
          <Text style={styles.buttonText}>
            Back to Home
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Course Details</Text>

      <Text style={styles.label}>
        Course ID:
      </Text>

      <Text style={styles.courseId}>
        {currentCourseId}
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => router.push('/')}
      >
        <Text style={styles.buttonText}>
          Back to Home
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FB',
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },

  courseId: {
    fontSize: 28,
    fontWeight: '800',
    color: '#6C63FF',
    marginBottom: 30,
  },

  errorText: {
    fontSize: 16,
    color: '#D32F2F',
    textAlign: 'center',
    marginBottom: 30,
  },

  button: {
    backgroundColor: '#6C63FF',
    paddingHorizontal: 25,
    paddingVertical: 14,
    borderRadius: 12,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});