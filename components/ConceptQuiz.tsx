import React from 'react';

const ConceptQuiz = ({ conceptKey, quizBank, onComplete }) => {
  const quiz = quizBank[conceptKey];
  if (!quiz) return null;

  return (
    <div className="concept-quiz">
      <h3>{quiz.question}</h3>
      {quiz.options.map((opt, idx) => (
        <button key={idx} onClick={() => onComplete(idx === quiz.correct)}>
          {opt}
        </button>
      ))}
    </div>
  );
};

export default ConceptQuiz;
