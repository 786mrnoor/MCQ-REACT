export default function getFilteredQuiz(questions, filter) {
    let newQuestions = questions.filter((question) => {
        if (
            (filter.created === '' || question.created >= filter.created) &&
            (filter.attend === '' || question.attend <= filter.attend) &&
            (filter.correct === '' || question.correct <= filter.correct)
        ) {
            return true;
        }
        return false;
    });
    newQuestions = newQuestions.slice(0, filter.questions || newQuestions.length);

    if (newQuestions.length) {
        return newQuestions;
    }
    return null;
}