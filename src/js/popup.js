function addFeedback() {
    var inputName = document.querySelector('.form__name');
    var inputPlace = document.querySelector('.form__place');
    var inputText = document.querySelector('.form__text');
    var addButton = document.querySelector('.footer__add');

    addButton.addEventListener('click', () => {
        if (inputName.value && inputPlace.value && inputText.value) {
            var feedbacks = document.querySelector('.feedbacks');
            var feedback = document.createElement('li');

            var name = document.createElement('div');
            var place = document.createElement('div');
            var text = document.createElement('div');
            var day = document.createElement('div');
            var firstLine = document.createElement('div');

            name.innerHTML = inputName.value;
            place.innerHTML = inputPlace.value;
            text.innerHTML = inputText.value;

            var date = new Date();

            day.innerHTML = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();

            feedback.classList.add('feedback');
            name.classList.add('feedback__name');
            place.classList.add('feedback__place');
            text.classList.add('feedback__text');
            firstLine.classList.add('feedback__firstLine');

            firstLine.appendChild(name);
            firstLine.appendChild(place);
            firstLine.appendChild(day);

            feedback.appendChild(firstLine);
            feedback.appendChild(text);

            feedbacks.appendChild(feedback);
        } else {
            alert('Заполните все поля!')
        }
    })
}

export {
    addFeedback
}