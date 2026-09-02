import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';

type Task = {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
};

export default function HomeScreen() {

  // ==========================================
  // STUDENT INFORMATION
  // ==========================================

  const studentName = 'Winchell Ignacio';
  const program = 'BSIT - Bachelor of Science in Information Technology';


  // ==========================================
  // TASK LIST
  // ==========================================

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Finish React Native Project',
      dueDate: 'September 5, 2026',
      completed: false,
    },
    {
      id: '2',
      title: 'Submit Assignment',
      dueDate: 'September 3, 2026',
      completed: true,
    },
    {
      id: '3',
      title: 'Study for Quiz',
      dueDate: 'September 8, 2026',
      completed: false,
    },
  ]);


  // ==========================================
  // INPUT FIELDS
  // ==========================================

  const [taskTitle, setTaskTitle] = useState('');
  const [dueDate, setDueDate] = useState('');


  // ==========================================
  // TASK COUNTS
  // ==========================================

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;


  // ==========================================
  // ADD TASK
  // ==========================================

  const addTask = () => {

    // Validate task title
    if (taskTitle.trim() === '') {
      Alert.alert(
        'Missing Task Title',
        'Please provide a task title before adding the task.'
      );
      return;
    }

    // Validate due date
    if (dueDate.trim() === '') {
      Alert.alert(
        'Missing Due Date',
        'Please provide a due date before adding the task.'
      );
      return;
    }

    // Create new task
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskTitle.trim(),
      dueDate: dueDate.trim(),
      completed: false,
    };

    // Add task
    setTasks((currentTasks) => [
      ...currentTasks,
      newTask,
    ]);

    // Clear inputs
    setTaskTitle('');
    setDueDate('');

    // Success feedback
    Alert.alert(
      'Task Added',
      `"${newTask.title}" was added successfully.`
    );
  };


  // ==========================================
  // COMPLETE / INCOMPLETE TASK
  // ==========================================

  const toggleTask = (id: string) => {

    const selectedTask = tasks.find(
      (task) => task.id === id
    );

    if (!selectedTask) {
      return;
    }

    const newStatus = !selectedTask.completed;

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: newStatus,
            }
          : task
      )
    );

    // Feedback
    Alert.alert(
      newStatus
        ? 'Task Completed'
        : 'Task Updated',

      newStatus
        ? `"${selectedTask.title}" is now completed.`
        : `"${selectedTask.title}" is now incomplete.`
    );
  };


  // ==========================================
  // DELETE TASK
  // ==========================================

  const deleteTask = (id: string) => {

    const selectedTask = tasks.find(
      (task) => task.id === id
    );

    if (!selectedTask) {
      return;
    }

    Alert.alert(
      'Delete Task',
      `Are you sure you want to delete "${selectedTask.title}"?`,

      [
        {
          text: 'Cancel',
          style: 'cancel',
        },

        {
          text: 'Delete',
          style: 'destructive',

          onPress: () => {

            setTasks((currentTasks) =>
              currentTasks.filter(
                (task) => task.id !== id
              )
            );

            Alert.alert(
              'Task Deleted',
              `"${selectedTask.title}" was deleted.`
            );
          },
        },
      ]
    );
  };


  // ==========================================
  // TASK COMPONENT
  // ==========================================

  const renderTask = (task: Task) => {

    return (
      <View
        key={task.id}
        style={styles.taskCard}
      >

        {/* CHECKBOX */}

        <Pressable
          onPress={() => toggleTask(task.id)}

          style={({ pressed }) => [
            styles.checkbox,

            task.completed &&
              styles.checkboxCompleted,

            pressed &&
              styles.pressedButton,
          ]}
        >

          {task.completed && (
            <ThemedText style={styles.checkmark}>
              ✓
            </ThemedText>
          )}

        </Pressable>


        {/* TASK INFORMATION */}

        <View style={styles.taskInformation}>

          <ThemedText
            style={[
              styles.taskTitle,

              task.completed &&
                styles.completedTaskTitle,
            ]}
          >
            {task.title}
          </ThemedText>


          <ThemedText style={styles.dueDate}>
            Due: {task.dueDate}
          </ThemedText>


          <ThemedText
            style={[
              styles.status,

              task.completed
                ? styles.completedStatus
                : styles.pendingStatus,
            ]}
          >
            {task.completed
              ? '✓ Completed'
              : '○ Pending'}
          </ThemedText>

        </View>


        {/* DELETE BUTTON */}

        <Pressable
          onPress={() => deleteTask(task.id)}

          style={({ pressed }) => [
            styles.deleteButton,

            pressed &&
              styles.deletePressed,
          ]}
        >

          <ThemedText style={styles.deleteIcon}>
            🗑️
          </ThemedText>

        </Pressable>

      </View>
    );
  };


  // ==========================================
  // USER INTERFACE
  // ==========================================

  return (

    <ScrollView
      style={styles.container}

      contentContainerStyle={
        styles.contentContainer
      }

      showsVerticalScrollIndicator={false}
    >


      {/* ======================================
          HEADER
      ====================================== */}

      <View style={styles.header}>

        <View>

          <ThemedText style={styles.headerLabel}>
            STUDENT TASK MANAGER
          </ThemedText>

          <ThemedText style={styles.headerTitle}>
            My Tasks
          </ThemedText>

        </View>


        <View style={styles.profileCircle}>

          <ThemedText style={styles.profileLetter}>
            W
          </ThemedText>

        </View>

      </View>


      {/* ======================================
          STUDENT INFORMATION
      ====================================== */}

      <View style={styles.studentCard}>

        <View style={styles.avatar}>

          <ThemedText style={styles.avatarText}>
            W
          </ThemedText>

        </View>


        <View style={styles.studentInformation}>

          <ThemedText style={styles.studentName}>
            {studentName}
          </ThemedText>


          <ThemedText style={styles.program}>
            {program}
          </ThemedText>

        </View>

      </View>


      {/* ======================================
          TASK STATISTICS
      ====================================== */}

      <View style={styles.statisticsContainer}>


        {/* PENDING */}

        <View style={styles.statCard}>

          <ThemedText
            style={[
              styles.statNumber,
              styles.pendingNumber,
            ]}
          >
            {pendingTasks}
          </ThemedText>


          <ThemedText style={styles.statLabel}>
            Pending
          </ThemedText>

        </View>


        {/* COMPLETED */}

        <View style={styles.statCard}>

          <ThemedText
            style={[
              styles.statNumber,
              styles.completedNumber,
            ]}
          >
            {completedTasks}
          </ThemedText>


          <ThemedText style={styles.statLabel}>
            Completed
          </ThemedText>

        </View>

      </View>


      {/* ======================================
          ADD NEW TASK
      ====================================== */}

      <View style={styles.section}>

        <ThemedText style={styles.sectionTitle}>
          Add New Task
        </ThemedText>


        {/* TASK TITLE */}

        <ThemedText style={styles.inputLabel}>
          Task Title
        </ThemedText>


        <TextInput
          style={styles.input}

          placeholder="Enter task title"

          placeholderTextColor="#999"

          value={taskTitle}

          onChangeText={setTaskTitle}
        />


        {/* DUE DATE */}

        <ThemedText style={styles.inputLabel}>
          Due Date
        </ThemedText>


        <TextInput
          style={styles.input}

          placeholder="e.g. September 10, 2026"

          placeholderTextColor="#999"

          value={dueDate}

          onChangeText={setDueDate}
        />


        {/* ADD TASK BUTTON */}

        <Pressable

          onPress={addTask}

          style={({ pressed }) => [
            styles.addButton,

            pressed &&
              styles.addButtonPressed,
          ]}
        >

          {({ pressed }) => (

            <ThemedText
              style={[
                styles.addButtonText,

                pressed &&
                  styles.addButtonTextPressed,
              ]}
            >

              {pressed
                ? '✓ Adding Task...'
                : '+ Add Task'}

            </ThemedText>

          )}

        </Pressable>

      </View>


      {/* ======================================
          TASK LIST HEADER
      ====================================== */}

      <View style={styles.taskListHeader}>

        <ThemedText style={styles.sectionTitle}>
          My Task List
        </ThemedText>


        <ThemedText style={styles.taskTotal}>
          {tasks.length} total
        </ThemedText>

      </View>


      {/* ======================================
          TASK LIST
      ====================================== */}

      {tasks.length === 0 ? (

        <View style={styles.emptyContainer}>

          <ThemedText style={styles.emptyIcon}>
            📋
          </ThemedText>


          <ThemedText style={styles.emptyTitle}>
            No Tasks Yet
          </ThemedText>


          <ThemedText style={styles.emptyText}>
            Add a task above to get started.
          </ThemedText>

        </View>

      ) : (

        tasks.map((task) =>
          renderTask(task)
        )

      )}


      {/* ======================================
          FOOTER
      ====================================== */}

      <View style={styles.footer}>

        <ThemedText style={styles.footerText}>
          Stay organized and complete your goals! 🚀
        </ThemedText>

      </View>

    </ScrollView>
  );
}


// ==================================================
// STYLES
// ==================================================

const styles = StyleSheet.create({

  // ==========================================
  // MAIN CONTAINER
  // ==========================================

  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },

  contentContainer: {
    padding: 20,
    paddingTop: 55,
    paddingBottom: 40,
  },


  // ==========================================
  // HEADER
  // ==========================================

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  headerLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#6C63FF',
    letterSpacing: 1,
  },

  headerTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#202020',
    marginTop: 3,
  },

  profileCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileLetter: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },


  // ==========================================
  // STUDENT CARD
  // ==========================================

  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6C63FF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
  },

  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  avatarText: {
    color: '#6C63FF',
    fontSize: 24,
    fontWeight: 'bold',
  },

  studentInformation: {
    flex: 1,
  },

  studentName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },

  program: {
    color: '#E5E3FF',
    fontSize: 12,
    marginTop: 4,
    lineHeight: 17,
  },


  // ==========================================
  // STATISTICS
  // ==========================================

  statisticsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 22,
  },

  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    alignItems: 'center',
    paddingVertical: 17,

    elevation: 2,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.06,

    shadowRadius: 4,
  },

  statNumber: {
    fontSize: 27,
    fontWeight: '800',
  },

  pendingNumber: {
    color: '#F59E0B',
  },

  completedNumber: {
    color: '#22C55E',
  },

  statLabel: {
    fontSize: 12,
    color: '#777',
    marginTop: 3,
  },


  // ==========================================
  // ADD TASK SECTION
  // ==========================================

  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 23,

    elevation: 2,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.06,

    shadowRadius: 4,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#202020',
    marginBottom: 14,
  },

  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#555',
    marginBottom: 6,
  },

  input: {
    height: 48,

    borderWidth: 1,

    borderColor: '#DDDDDD',

    borderRadius: 10,

    paddingHorizontal: 14,

    fontSize: 14,

    color: '#222',

    backgroundColor: '#FAFAFA',

    marginBottom: 14,
  },


  // ==========================================
  // ADD BUTTON
  // ==========================================

  addButton: {
    height: 50,

    borderRadius: 12,

    backgroundColor: '#6C63FF',

    justifyContent: 'center',

    alignItems: 'center',

    shadowColor: '#6C63FF',

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.30,

    shadowRadius: 6,

    elevation: 5,
  },

  addButtonPressed: {
    backgroundColor: '#5148D8',

    transform: [
      {
        scale: 0.95,
      },
    ],

    shadowOpacity: 0.10,

    elevation: 2,
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  addButtonTextPressed: {
    color: '#E8E6FF',
  },


  // ==========================================
  // TASK LIST HEADER
  // ==========================================

  taskListHeader: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    marginBottom: 12,
  },

  taskTotal: {
    fontSize: 12,
    color: '#888',
  },


  // ==========================================
  // TASK CARD
  // ==========================================

  taskCard: {
    flexDirection: 'row',

    alignItems: 'center',

    backgroundColor: '#FFFFFF',

    borderRadius: 15,

    padding: 15,

    marginBottom: 10,

    elevation: 2,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.05,

    shadowRadius: 4,
  },


  // ==========================================
  // CHECKBOX
  // ==========================================

  checkbox: {
    width: 26,

    height: 26,

    borderRadius: 7,

    borderWidth: 2,

    borderColor: '#6C63FF',

    justifyContent: 'center',

    alignItems: 'center',

    marginRight: 12,
  },

  checkboxCompleted: {
    backgroundColor: '#6C63FF',
  },

  pressedButton: {
    opacity: 0.65,

    transform: [
      {
        scale: 0.85,
      },
    ],
  },

  checkmark: {
    color: '#FFFFFF',

    fontSize: 16,

    fontWeight: 'bold',
  },


  // ==========================================
  // TASK INFORMATION
  // ==========================================

  taskInformation: {
    flex: 1,
  },

  taskTitle: {
    color: '#222',

    fontSize: 15,

    fontWeight: '700',

    marginBottom: 4,
  },

  completedTaskTitle: {
    color: '#999',

    textDecorationLine: 'line-through',
  },

  dueDate: {
    color: '#888',

    fontSize: 12,

    marginBottom: 4,
  },

  status: {
    fontSize: 11,

    fontWeight: '700',
  },

  pendingStatus: {
    color: '#F59E0B',
  },

  completedStatus: {
    color: '#22C55E',
  },


  // ==========================================
  // DELETE BUTTON
  // ==========================================

  deleteButton: {
    width: 40,

    height: 40,

    borderRadius: 10,

    justifyContent: 'center',

    alignItems: 'center',
  },

  deletePressed: {
    backgroundColor: '#FFE5E5',

    transform: [
      {
        scale: 0.85,
      },
    ],
  },

  deleteIcon: {
    fontSize: 18,
  },


  // ==========================================
  // EMPTY TASK LIST
  // ==========================================

  emptyContainer: {
    backgroundColor: '#FFFFFF',

    borderRadius: 15,

    padding: 30,

    alignItems: 'center',
  },

  emptyIcon: {
    fontSize: 40,

    marginBottom: 8,
  },

  emptyTitle: {
    fontSize: 18,

    fontWeight: '800',

    color: '#333',
  },

  emptyText: {
    fontSize: 13,

    color: '#888',

    marginTop: 5,
  },


  // ==========================================
  // FOOTER
  // ==========================================

  footer: {
    alignItems: 'center',

    paddingVertical: 25,
  },

  footerText: {
    color: '#888',

    fontSize: 12,

    textAlign: 'center',
  },

});
