function addFeedback(balloonContent) {
    var inputName = document.querySelector('.form__name');
    var inputPlace = document.querySelector('.form__place');
    var inputText = document.querySelector('.form__text');
    var addButton = document.querySelector('.footer__add');

    return new Promise(function (resolve, reject) {
        addButton.addEventListener('click', () => {
            if (inputName.value && inputPlace.value && inputText.value) {
                var feedbacks = document.querySelector('.feedbacks');
                var feedback = document.createElement('li');

                feedbacks.innerHTML = balloonContent;

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
                resolve();
            } else {
                alert('Заполните все поля!')
                reject(new Error('Заполните все поля!'));
            }
        })
    })
}

function closePopup() {
    var closeButton = document.querySelector('.header__close');
    var popup = document.querySelector('.popup');

    closeButton.addEventListener('click', () => {
        popup.innerHTML = '';
    })
}

export {
    addFeedback,
    closePopup
}