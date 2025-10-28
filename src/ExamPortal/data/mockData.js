// Programmatically generate mock questions for large counts
const makeQuestions = (subject, count, startIndex = 1) => {
  const questions = [];
  for (let i = 0; i < count; i++) {
    const num = startIndex + i;
    const base = `${subject} Question ${num}`;
    questions.push({
      number: num,
      text: `${base}: This is a sample English question text for ${subject} #${num}.`,
      localLanguageText: `${base} (स्थानीय भाषा): यह ${subject} के लिए उदाहरण प्रश्न है #${num}.`,
      options: [
        `Option A for ${num}`,
        `Option B for ${num}`,
        `Option C for ${num}`,
        `Option D for ${num}`
      ],
      // deterministic correct answer so it is predictable during tests
      correct: num % 4
    });
  }
  return questions;
};

const mockQuestions = {
  Mathematics: makeQuestions('Mathematics', 80, 1),
  Physics: makeQuestions('Physics', 40, 1),
  Chemistry: makeQuestions('Chemistry', 40, 1)
};

export const mockUser = {
  name: "MOANA V",
  examTitle: "EAPCET 2026",
  timeInMinutes: 180
};

export default mockQuestions;
