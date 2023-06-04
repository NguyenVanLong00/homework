
var quiz = {
    table: 'quiz',
    questionKey: "question",
    answer: "answer"
}

working()

function working() {
    questions = document.querySelectorAll('p:has(+ * + .answer)')
    answers = document.querySelectorAll('.answer')
    nextpage = document.querySelector('#mod_quiz-next-nav')
    submit = document.querySelector('button[type="submit"] .btn .btn-primary')


    finishReview = document.querySelector('.mod_quiz-next-nav')

    let quizData = getQuiz()
    newQuiz = analyzeQuiz(questions, answers)

    submary = document.querySelector('.rui-summary-table');

    processQuiz(quizData, newQuiz)

    if (nextpage) {
        nextpage.click()
    }
}

function processQuiz(quizData, newQuiz) {
    for (let i = 0; i < newQuiz.length; i++) {
        const quiz = newQuiz[i];

        processed = false;
        for (let j = 0; j < quizData.length; j++) {
            const oldQuiz = quizData[j];

            if (quiz.question == oldQuiz.question) {
                processed = true


                for (let k = 0; k < quiz.answers.length; k++) {
                    const answer = quiz.answers[k];

                    answerd = false
                    for (let h = 0; h < oldQuiz.answers.length; h++) {
                        const oldAnswer = oldQuiz.answers[h];

                        if (answer.answer == oldAnswer.answer) {
                            answerd = true

                            if (oldAnswer.correct) {
                                answer.input.click()
                            }

                            if (!answer.correct) {
                                oldAnswer.correct = false;
                            }
                        }
                    }

                    if (!answerd) {
                        oldQuiz.answers.push(answer)
                        answer.input.click()
                    }
                }

                break;
            }
        }

        if (!processed) {
            quizData.push(quiz)
            quiz.answers[0].input.click()
        }
    }

    saveQuiz(quizData)
    console.log(quizData)
}

function recorrectQuiz(quizData, newQuiz) {
    saveQuiz(newQuiz)
}

function analyzeQuiz(questions, answers) {
    records = []
    questions.forEach((question, index) => {
        answer = answers[index]
        record = {
            question: question.textContent,
            answers: []
        }

        listAnswer = answer.querySelectorAll('div')

        listAnswer.forEach(element => {
            label = element.querySelector('label');
            input = element.querySelector('input');

            incorrect = element.classList.contains('incorrect')

            record.answers.push({
                answer: label.textContent,
                correct: !incorrect,
                input: input
            });
        });

        records.push(record)
    });

    return records
}

function getQuiz() {
    return JSON.parse(localStorage.getItem(quiz.table)) ?? []
}

function saveQuiz(records) {

    localStorage.setItem(quiz.table, JSON.stringify(records))
}