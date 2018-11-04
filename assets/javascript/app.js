

$( document ).ready(function() {

    var game = {
        questions: [
            {
                question: "In the year 1900 in the U.S. what were the most popular first names given to boy and girl babies?",
                possibles: ["William and Elizabeth", "Joseph and Catherine", "John and Mary", "George and Anne"],
                id: "questionOne",
                answer: 2
            }, 
            {
                question: "When did the Liberty Bell get its name?",
                possibles: ["when it was made, in 1701", "when it rang on July 4, 1776", "in the 19th century, when it became a symbol of the abolition of slavery", "none of the above"],
                id: "questionTwo",
                answer: 2
            }, 
            {
                question: "In the Roy Rogers -Dale Evans Museum, you will find Roy and Dales stuffed horses. Roy's horse was named Trigger, which was Dales horse?",
                possibles: ["Buttermilk", "Daisy", "Scout", "Tulip"],
                id: "questionThree",
                answer: 0
            }, 
            {
                question: "The Daniel Boon museum at the home where he died can best be described how?",
                possibles: ["a log cabin in Kentucky", "a two-story clapboard house in Tennessee", "a four-story Georgian-style home in Missouri", "a three story brick house in Arkansas"],
                id: "questionFour",
                answer: 2
            }, 
            {
                question: "Which of the following items was owned by the fewest U.S. homes in 1990?",
                possibles: ["home computer", "compact disk player", "cordless phone", "dishwasher"],
                id: "questionFive",
                answer: 1
            }, 
            {
                question: "Who holds the record for the most victories in a row on the professional golf tour?",
                possibles: ["Jack Nicklaus", "Arnold Palmer", "Byron Nelson", "Ben Hogan"],
                id: "questionSix",
                answer: 2
    
            }, 
            {
                question: "Who is third behind Hank Aaron and Babe Ruth in major league career home runs?",
                possibles: ["Reggie Jackson", "Harmon Killebrew", " Willie Mays", "Frank Robinson"],
                id: "questionSeven",
                answer: 2
            }, 
            {
                question: "In 1990, in what percentage of U.S. married couples did the wife earn more money than the husband?",
                possibles: ["8", "18", "38", "58"],
                id: "questionEight",
                answer: 1
            }, 
            {
                question: "During the 1980s for six consecutive years what breed of dog was the most popular in the U.S.?",
                possibles: ["cocker spaniel", "German shepherd", "Labrador retriever", "poodle"],
                id: "questionNine",
                answer: 0
            }, 
        ]}
    
    $("#startGame").on("click", function() {
        $(".container").show();
        $(this).hide();
    });

    var number = 60;
    $(".timer").on("click", run);
    function decrement() {
        number--;
        $(".timer").html("<h2>" + "Time Remaining: " + number + " seconds" + "</h2>");
        if (number === 0) {
            stop();
            $(".timeIsUp").html("Time is Up!");
        }
    }

    function run() {
        counter = setInterval(decrement, 1000);
    }
    function stop() {
        clearInterval(counter);
    }
    run();

    function formTemplate(data) {
        var qString = "<form id='questionOne'>" + data.question + "<br>";
        var possibles = data.possibles;
        for (var i= 0; i < possibles.length; i++) {
            var possible = possibles[i];
            qString = qString + "<input type='radio' name='"+ data.id +"' value='"+ i +"'>" + possible;
        }
        return qString + "</form>";
    }

    function buildQuestions() {
        var questionHTML = "";
        for (var i=0; i<game.questions.length; i++) {
            questionHTML = questionHTML + formTemplate(game.questions[i]);
        }
        $("#question").append(questionHTML);
    }

    function isCorrect(question) {
        var answers = $("[name=" + question.id +"]");
        var correct = answers.eq(question.answer);
        var isChecked = correct.is(":checked");
        return isChecked;
    }
    buildQuestions();

    function resultsTemplate(question) {
        var htmlBlock = "<div>";
        htmlBlock = htmlBLock + question.question + ": " + isChecked;
        return htmlBLock + "</div>";
    }

    function checkAnswers() {
        var resultHTML = "";
        var correct = 0;
        var incorrect = 0;
        var unAnswered = 0;
        for (var i=0; i<game.questions.length; i++) {
            if (isCorrect(game.questions[i])) {
                correct++;
            }
            else {
                if (checkAnswered(game.questions[i])) {
                    incorrect++;
                }
                else {
                    unAnswered++;
                }
            }
        }
        $(".results").html("correct: " + "<br>" + "incorrect: " + incorrect + "<br>" + "unanswered: " + unAnswered);
    }

    function checkAnswered(question) {
        var anyAnswered = false;
        var answers = $("[name=" + question.id + "]");
        for (var i=0; i<answers.length; i++) {
            if (answers[i].checked) {
                anyAnswered = true;
            }
        }
        return anyAnswered;
    }

    $("#done").on("click", function() {
        checkAnswers();
        stop();
        $(".timeIsUp").html("Game Over!");
    });
});