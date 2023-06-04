
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
    submit = document.querySelector('input[value="Submit all and finish"]')


    finishReview = document.querySelector('.mod_quiz-next-nav')

    let quiz = getQuiz()

    submary = document.querySelector('.rui-summary-table');
    if (submary) {

        questions.forEach((question, index) => {
            answer = answers[index]

            listAnswer = answer.querySelectorAll('div')

            for (let index = 0; index < listAnswer.length; index++) {
                const element = listAnswer[index];

                isIncorrect = !!element.classList.contains('incorrect');

                label = element.querySelector('label');
                input = element.querySelector('input');

                record = {
                    question: question.textContent,
                    answer: label.textContent,
                    correct: true
                };

                for (let j = 0; j < quiz.length; j++) {
                    item = quiz[index];
                    if (item.question == record.question && item.answer == record.answer) {
                        quiz[index].correct = !isIncorrect
                        break;
                    }
                }
            }
        });

        saveQuiz(quiz)

        finishReview.click()
    } else {
        questions.forEach((question, index) => {
            answer = answers[index]

            listAnswer = answer.querySelectorAll('div')

            listAnswer.forEach(element => {

                label = element.querySelector('label');
                input = element.querySelector('input');

                record = {
                    question: question.textContent,
                    answer: label.textContent,
                    correct: true
                };

                hasQuiz = quiz?.find(item => {
                    return item.question == record.question && item.answer == record.answer
                })

                if (hasQuiz != undefined) {
                    if (hasQuiz.correct) {
                        input.click()
                    }
                } else {
                    quiz.push(record)
                    input.click()
                }
            });
        });

        saveQuiz(quiz)
        if (nextpage) {
            nextpage.click()
        } else {
            submit.click()
        }
    }
}

function getQuiz() {
    return JSON.parse(localStorage.getItem(quiz.table))
}

function saveQuiz(records) {

    localStorage.setItem(quiz.table, JSON.stringify(records))
}