const CheckBoxList = document.querySelectorAll(".custom_checkbox");
const inputFields = document.querySelectorAll(".goal-input");
const error_label = document.querySelectorAll(".error-label");
const error_par = document.querySelectorAll(".error_par");
const progressBar = document.querySelector(".progress_bar");
const progressValue = document.querySelector(".progress_value");
const progressLabel = document.querySelector(".sub_para");

const allQuotes = [
    'Raise the bar by completing your goals!',
    'Well begun is half done!',
    'Just a step away, Keep going!',
    'Whoa! You just completed all the goals, for chill :D'
]

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {};
let ComplitedGoalsCount = Object.values(allGoals).filter((goal) => goal.complited).length;

progressValue.style.width = `${(ComplitedGoalsCount / inputFields.length) * 100}%`;
progressValue.firstElementChild.innerText = `${ComplitedGoalsCount}/${inputFields.length} complited`
progressLabel.innerText = allQuotes[ComplitedGoalsCount];

CheckBoxList.forEach((checkbox) => {
    checkbox.addEventListener("click", (e) => {
        const allFieldFills = [...inputFields].every((input) => {
            return input.value;
        });
        if (allFieldFills) {
            checkbox.parentElement.classList.toggle("complited");
            const inputId = checkbox.nextElementSibling.id;
            allGoals[inputId].complited = !allGoals[inputId].complited;
            ComplitedGoalsCount = Object.values(allGoals).filter((goal) => goal.complited).length;

            progressValue.style.width = `${(ComplitedGoalsCount / inputFields.length) * 100}%`;
            progressValue.firstElementChild.innerText = `${ComplitedGoalsCount}/${inputFields.length} complited`

            progressLabel.innerText = allQuotes[ComplitedGoalsCount];


            localStorage.setItem('allGoals', JSON.stringify(allGoals));
        }
        else {
            error_label.forEach((label) => {
                label.style.opacity = 1;
            });
            // error_par.classList.add("show_error");
        }
    });
});
inputFields.forEach((input) => {
    // console.log(allGoals[input.id]);
if (allGoals[input.id]){
    input.value = allGoals[input.id].name;

    if (allGoals[input.id].complited) {
        input.parentElement.classList.add('complited');
    }
}
    
    input.addEventListener('focus', () => {
        error_label.forEach((label) => {
            label.style.opacity = 0;
        });
    });



    input.addEventListener('input', (e) => {


        if (allGoals[input.id] && allGoals[input.id].complited) {
            input.value = allGoals[input.id].name;
            return
        }
        if(allGoals[input.id]){
            allGoals[input.id].name = input.value
        }
        else {allGoals[input.id] = {
           name: input.value,
            complited: false,
        }}
        console.log(e.target.id);
        // console.log(allGoals);
        localStorage.setItem('allGoals', JSON.stringify(allGoals));
    })
});