/*choose lanuge button */
let button = document.querySelector("button.circle-button");
let circle = document.querySelector("button.circle-button span");

button.addEventListener("click", () => {
  circle.classList.toggle("left");
  if (circle.classList.contains("left")) {
    button.nextElementSibling.classList.remove("on");
    button.previousElementSibling.classList.add("on");
  } else {
    button.nextElementSibling.classList.add("on");
    button.previousElementSibling.classList.remove("on");
  }
});
//start the Quize button
let startButton = document.querySelector("section button");

let welcomeCont = document.querySelector(".container.first");
let QuizeCont = document.querySelector(".container.Quize");
startButton.addEventListener("click", () => {
  welcomeCont.classList.add("up");
  QuizeCont.classList.add("up");
});

//selectors
let QustionCont = document.querySelector(".Quize-area .Question > div");
let answersCont = document.querySelector(".answers");
let cat = document.querySelector(".category span");
let submitButton = document.querySelector(".answers button");
let bullets = document.querySelectorAll(".bullet-cont span");
let count = 0;
let goodAnswer = 0;
let badAnswer = 0;
let answersArr = [];

/*random differnt numbers for Quistions*/
let randomNumArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let randomNum =
  randomNumArr[parseInt(Math.floor(Math.random() * randomNumArr.length))];
randomNumArr.splice(randomNumArr.indexOf(randomNum), 1);

let random2 =
  randomNumArr[parseInt(Math.floor(Math.random() * randomNumArr.length))];
randomNumArr.splice(randomNumArr.indexOf(random2), 1);

let random3 =
  randomNumArr[parseInt(Math.floor(Math.random() * randomNumArr.length))];
randomNumArr.splice(randomNumArr.indexOf(random3), 1);

let random4 =
  randomNumArr[parseInt(Math.floor(Math.random() * randomNumArr.length))];
randomNumArr.splice(randomNumArr.indexOf(random4), 1);

let random5 =
  randomNumArr[parseInt(Math.floor(Math.random() * randomNumArr.length))];
randomNumArr.splice(randomNumArr.indexOf(random5), 1);
let randomNumNum = -1;
/*end of randomize */
let num;
let allQuiOpt = [];
let timeCounter;
let choosedQuestionFCat;

/*random between category*/
/*functions */
let chooseQustion = (re, QuizeCate) => {
  /*change the Quistion  */
  if (count === 0) {
    num = randomNum;
  } else if (count === 1) {
    num = random2;
  } else if (count === 2) {
    num = random3;
  } else if (count === 3) {
    num = random4;
  } else if (count === 4) {
    num = random5;
  }

  /*end Qustion choose */

  choosedQuestionFCat = re[QuizeCate][num];

  let form = document.createElement("form");
  let makeFun = () => {
    cat.innerHTML = QuizeCate;
    QustionCont.innerHTML = choosedQuestionFCat["question"];

    bullets[count].classList.add("clicked");
    bullets[count].classList.add("on");

    /*randomize the answers */
    let newOptionsArr = [];

    let optionsArr = [
      choosedQuestionFCat["options"]["answer1"],
      choosedQuestionFCat["options"]["answer2"],
      choosedQuestionFCat["options"]["answer3"],
      choosedQuestionFCat["options"]["answer4"]
    ];
    let option1 = optionsArr[Math.floor(Math.random() * optionsArr.length)];
    optionsArr.splice(optionsArr.indexOf(option1), 1);
    newOptionsArr.push(option1);
    let option2 = optionsArr[Math.floor(Math.random() * optionsArr.length)];
    optionsArr.splice(optionsArr.indexOf(option2), 1);
    newOptionsArr.push(option2);
    let option3 = optionsArr[Math.floor(Math.random() * optionsArr.length)];
    optionsArr.splice(optionsArr.indexOf(option3), 1);
    newOptionsArr.push(option3);
    let option4 = optionsArr[Math.floor(Math.random() * optionsArr.length)];
    optionsArr.splice(optionsArr.indexOf(option4), 1);
    newOptionsArr.push(option4);
    allQuiOpt.push(newOptionsArr);
    /* end randomize*/
    /*make the answers div */
    for (let j = 0; j < newOptionsArr.length; j++) {
      let div = document.createElement("div");
      let radioInput = document.createElement("input");
      let label = document.createElement("label");
      radioInput.type = "radio";
      radioInput.name = "answer";
      radioInput.id = `answer_${j}`;
      label.htmlFor = `answer_${j}`;
      label.innerHTML = newOptionsArr[j];
      div.append(radioInput);
      div.append(label);
      form.appendChild(div);
      if (j === 0) {
        radioInput.checked = true;
      }
    }
    /*end answers make function */
  };
  makeFun();
  answersCont.prepend(form);
  return QuizeCate;
};
//
//
//
//
//
//
/*on submit answer function */
let submitFun = (re, QuizeCate, catOptArr) => {
  clearInterval(timeCounter);
  countDown(150);
  welcomeCont.classList.add("re-load");

  for (let i = 0; i < bullets.length; i++) {
    bullets[i].classList.remove("on");
  }
  count++;
  /*compare the answer with the true answer */
  if (count < 6) {
    let choosed = document.querySelectorAll(`.answers div input`);
    let labelChoosed = document.querySelectorAll(`.answers div`);
    let ch;
    let chLabel;
    /*get the choosed answer */
    choosed.forEach(element => {
      element.checked === true ? (chLabel = element.nextElementSibling) : false;
    });
    let type;
    let singleAnswerArr = [];
    if (chLabel.innerHTML === re[QuizeCate][num].answer) {
      goodAnswer++;
      singleAnswerArr.push(
        Array.from(labelChoosed).indexOf(chLabel.parentElement)
      );
      type = "trueAnswer";
      console.log(type);
      singleAnswerArr.push(type);
      answersArr.push(singleAnswerArr);
    } else {
      type = "falseAnswer";
      badAnswer++;
      singleAnswerArr.push(
        Array.from(labelChoosed).indexOf(chLabel.parentElement)
      );

      singleAnswerArr.push(type);
      answersArr.push(singleAnswerArr);
    }
  }
  if (count < 5) {
    document.forms[0].remove();
    /*add the classes to bullets */
    if (count < 5) {
      bullets[count].classList.add("on");
      bullets[count].classList.add("clicked");
    }
    /*remake the form*/

    chooseQustion(re, QuizeCate);
  } else if (count === 5) {
    /*when the Qustions end */
    QustionCont.innerHTML = "see results";
    submitButton.innerHTML = "Let's see";
    document.forms[0].remove();
    let categoryDiv = document.querySelector(".category");
    categoryDiv.innerHTML = "Exam result's ";

    submitButton.addEventListener("click", () => {
      /*add modified classes */
      QuizParent.classList.add("up-relod");
      QuizeCont.classList.add("up-relod");
      QuizParent.classList.remove("hideFlow");

      /*re making the answers to apper togather */

      let remakeFun = (cat, number, remakeCounter, answer) => {
        console.log(answer);
        let choosedQuestionFCat2 = re[cat];
        let choosedAnswer = answer[0];
        let typing = answer[1];
        console.log(typing);
        /* main cont */
        let QuizeArea = document.createElement("div");
        QuizeArea.classList.add("Quize-area");
        /*Quistion cont */
        let Quis = document.createElement("div");
        Quis.classList.add("Question");
        let innerDiv = document.createElement("div");
        innerDiv.innerHTML = choosedQuestionFCat2[number]["question"];
        Quis.appendChild(innerDiv);
        /* answers cont */
        let answers = document.createElement("div");
        answers.classList.add("answers");
        let form1 = document.createElement("form");
        for (let j = 0; j < allQuiOpt[remakeCounter].length; j++) {
          let div = document.createElement("div");
          let radioInput = document.createElement("input");
          let label = document.createElement("label");
          radioInput.type = "radio";
          radioInput.name = "answer";
          radioInput.id = `answer_${j}`;
          radioInput.classList.add("noClick");
          label.htmlFor = `answer_${j}`;
          label.innerHTML = allQuiOpt[remakeCounter][j];
          label.classList.add("noClick");
          div.append(radioInput);
          div.append(label);
          div.classList.add("noClick");
          if (label.innerHTML === choosedQuestionFCat2[number].answer) {
            div.classList.add("trueAnswer");
          }

          form1.appendChild(div);
          console.log(typing);
          console.log(form1.children);
          console.log(Array.from(form1.children).indexOf(div));
          console.log(choosedAnswer);
        }
        for (let h = 0; h < form1.children.length; h++) {
          if (
            Array.from(form1.children).indexOf(form1.children[h]) ===
            parseInt(choosedAnswer)
          ) {
            if (typing === "trueAnswer") {
              form1.children[h].classList.add("trueAnswer");
              form1.children[h].children[0].checked = true;
            } else if (typing === "falseAnswer") {
              form1.children[h].classList.add("falseAnswer");
              form1.children[h].children[0].checked = true;
            }
          }
        }
        answers.appendChild(form1);
        QuizeArea.appendChild(Quis);
        QuizeArea.appendChild(answers);
        /*append to the new div */
        document.querySelector(".cont").append(QuizeArea);
      };
      //
      count = -1;
      for (let i = 0; i < 5; i++) {
        count++;
        if (count === 0) {
          remakeFun(catOptArr[0], randomNum, 0, answersArr[0]);
        } else if (count === 1) {
          remakeFun(catOptArr[1], random2, 1, answersArr[1]);
        } else if (count === 2) {
          remakeFun(catOptArr[2], random3, 2, answersArr[2]);
        } else if (count === 3) {
          remakeFun(catOptArr[3], random4, 3, answersArr[3]);
        } else if (count === 4) {
          remakeFun(catOptArr[4], random5, 4, answersArr[4]);
        }
        /*making the form */
      }
    });
  } else if (count < 7) {
    if (count === 6) {
      submitButton.style.marginBottom = "20px";
      document.querySelector(".Quiz-footer").style.display = "none";
    }
    /*get the number of the correct and false answer*/
    let badAnswer = 5 - goodAnswer;
    QustionCont.style.display = "none";
    submitButton.innerHTML = "Let's do this agine";
    submitButton.addEventListener("click", () => {
      location.reload();
    });
  }
};

/*count down */
function countDown(duration) {
  if (count < 5) {
    let min, sec;
    timeCounter = setInterval(() => {
      min = parseInt(duration / 60);
      sec = parseInt(duration % 60);

      document.querySelector(".Timer").innerHTML = `${min < 10
        ? `0${min}`
        : min}:${sec < 10 ? `0${sec}` : sec}`;
      if (duration-- < 1) {
        clearInterval(timeCounter);
        submitButton.click();
      }
    }, 1000);
  }
}
/*get the data */
let ExtractData = url => {
  fetch(url)
    .then(res => {
      return res.json();
    })
    .then(re => {
      /*click submit button*/
      let catOptArr = ["world facts"];
      submitButton.addEventListener("click", () => {
        let catOpt = Object.keys(re);
        let catRandoNum = Math.floor(Math.random() * catOpt.length);
        let QuizeCate = catOpt[catRandoNum];
        catOptArr.push(QuizeCate);
        submitFun(re, QuizeCate, catOptArr);
      });
      countDown(150);
      chooseQustion(re, "world facts");
    });
};
/*switch between the lanuges */
let QuizParent = document.querySelector(".parent");
startButton.addEventListener("click", () => {
  if (circle.classList.contains("left")) {
    ExtractData("JSON/arabic.json");
    submitButton.innerHTML = "سجل جوابك";
  } else {
    ExtractData("JSON/english.json");
  }
});
