'use client'

import { useState } from 'react'
import styles from './page.module.css'

export default function Home() {
  const [selectedLesson, setSelectedLesson] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)

  const lessons = [
    {
      id: 0,
      title: 'Introduction to Quantum Computing',
      content: `Quantum computing harnesses the principles of quantum mechanics to process information in fundamentally different ways than classical computers.

Key Concepts:
• Superposition: A qubit can exist in multiple states simultaneously
• Entanglement: Qubits can be correlated in ways impossible for classical bits
• Quantum Gates: Operations that manipulate qubits
• Measurement: The act of observing a quantum state collapses it to a definite value`,
      visual: '|0⟩ and |1⟩ - The quantum bits'
    },
    {
      id: 1,
      title: 'Qubits vs Classical Bits',
      content: `Classical Bit: Can be 0 OR 1
Quantum Bit (Qubit): Can be 0, 1, OR both simultaneously (superposition)

Mathematical Representation:
|ψ⟩ = α|0⟩ + β|1⟩

Where:
• α and β are complex probability amplitudes
• |α|² + |β|² = 1 (probabilities sum to 1)
• |0⟩ represents the "0" state
• |1⟩ represents the "1" state`,
      visual: 'Bloch Sphere: 3D representation of qubit states'
    },
    {
      id: 2,
      title: 'Quantum Gates',
      content: `Quantum gates are the building blocks of quantum circuits, analogous to classical logic gates.

Common Gates:
• X Gate (NOT): Flips |0⟩ ↔ |1⟩
• H Gate (Hadamard): Creates superposition
• CNOT Gate: Two-qubit controlled operation
• Z Gate: Phase flip
• T Gate: π/8 rotation

All quantum gates are reversible and represented by unitary matrices.`,
      visual: 'Circuit: ─H─●─ (Hadamard + CNOT)'
    },
    {
      id: 3,
      title: 'Quantum Algorithms',
      content: `Famous quantum algorithms that demonstrate quantum advantage:

1. Shor's Algorithm
   • Factors large numbers exponentially faster
   • Threatens current encryption methods

2. Grover's Algorithm
   • Searches unsorted databases with quadratic speedup
   • O(√N) vs classical O(N)

3. Quantum Simulation
   • Simulates quantum systems naturally
   • Applications in chemistry and materials science`,
      visual: 'Quantum speedup: Exponential > Polynomial > Classical'
    },
    {
      id: 4,
      title: 'Real-World Applications',
      content: `Current and near-future applications:

• Cryptography: Quantum key distribution (QKD)
• Drug Discovery: Molecular simulation
• Optimization: Route planning, portfolio optimization
• Machine Learning: Quantum neural networks
• Materials Science: Discovery of new materials
• Financial Modeling: Risk analysis and pricing

Leading platforms: IBM Quantum, Google Cirq, Amazon Braket, Microsoft Azure Quantum`,
      visual: '🔬 Science | 💊 Medicine | 💰 Finance | 🔐 Security'
    }
  ]

  const quizQuestions = [
    {
      id: 0,
      question: 'What is superposition in quantum computing?',
      options: [
        'A qubit can only be 0 or 1',
        'A qubit can be both 0 and 1 simultaneously',
        'A quantum computer is faster than classical',
        'Qubits are made of superconductors'
      ],
      correct: 1
    },
    {
      id: 1,
      question: 'Which gate creates superposition?',
      options: ['X Gate', 'Hadamard Gate', 'CNOT Gate', 'Z Gate'],
      correct: 1
    },
    {
      id: 2,
      question: 'What does Shor\'s algorithm do?',
      options: [
        'Searches databases',
        'Creates entanglement',
        'Factors large numbers',
        'Measures qubits'
      ],
      correct: 2
    },
    {
      id: 3,
      question: 'What happens when you measure a qubit?',
      options: [
        'Nothing changes',
        'The superposition collapses to a definite state',
        'It creates more qubits',
        'It entangles with other qubits'
      ],
      correct: 1
    }
  ]

  const handleQuizAnswer = (questionId, answerIndex) => {
    setQuizAnswers({ ...quizAnswers, [questionId]: answerIndex })
  }

  const submitQuiz = () => {
    setShowResults(true)
  }

  const calculateScore = () => {
    let correct = 0
    quizQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.correct) correct++
    })
    return correct
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.logo}>⚛️ Quantum Computing Academy</h1>
        <p className={styles.tagline}>Master the future of computing</p>
      </header>

      <div className={styles.main}>
        <nav className={styles.sidebar}>
          <h2>Curriculum</h2>
          {lessons.map((lesson) => (
            <button
              key={lesson.id}
              className={`${styles.lessonButton} ${selectedLesson === lesson.id ? styles.active : ''}`}
              onClick={() => setSelectedLesson(lesson.id)}
            >
              {lesson.id + 1}. {lesson.title}
            </button>
          ))}
          <button
            className={`${styles.lessonButton} ${selectedLesson === 'quiz' ? styles.active : ''}`}
            onClick={() => setSelectedLesson('quiz')}
          >
            📝 Take the Quiz
          </button>
        </nav>

        <main className={styles.content}>
          {selectedLesson !== 'quiz' ? (
            <div className={styles.lesson}>
              <h2>{lessons[selectedLesson].title}</h2>
              <div className={styles.lessonContent}>
                {lessons[selectedLesson].content.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
              <div className={styles.visual}>
                <div className={styles.visualBox}>
                  {lessons[selectedLesson].visual}
                </div>
              </div>
              <div className={styles.navigation}>
                {selectedLesson > 0 && (
                  <button
                    className={styles.navButton}
                    onClick={() => setSelectedLesson(selectedLesson - 1)}
                  >
                    ← Previous
                  </button>
                )}
                {selectedLesson < lessons.length - 1 && (
                  <button
                    className={styles.navButton}
                    onClick={() => setSelectedLesson(selectedLesson + 1)}
                  >
                    Next →
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className={styles.quiz}>
              <h2>Knowledge Check</h2>
              <p>Test your understanding of quantum computing concepts:</p>

              {quizQuestions.map((q) => (
                <div key={q.id} className={styles.question}>
                  <h3>Question {q.id + 1}</h3>
                  <p>{q.question}</p>
                  <div className={styles.options}>
                    {q.options.map((option, idx) => (
                      <label
                        key={idx}
                        className={`${styles.option} ${
                          showResults && idx === q.correct ? styles.correct : ''
                        } ${
                          showResults && quizAnswers[q.id] === idx && idx !== q.correct ? styles.incorrect : ''
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${q.id}`}
                          checked={quizAnswers[q.id] === idx}
                          onChange={() => handleQuizAnswer(q.id, idx)}
                          disabled={showResults}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              {!showResults ? (
                <button
                  className={styles.submitButton}
                  onClick={submitQuiz}
                  disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                >
                  Submit Quiz
                </button>
              ) : (
                <div className={styles.results}>
                  <h3>Results</h3>
                  <p className={styles.score}>
                    You scored {calculateScore()} out of {quizQuestions.length}
                  </p>
                  <button
                    className={styles.retryButton}
                    onClick={() => {
                      setQuizAnswers({})
                      setShowResults(false)
                    }}
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      <footer className={styles.footer}>
        <p>Built with quantum enthusiasm | Learn • Explore • Innovate</p>
      </footer>
    </div>
  )
}
