import render from './../templates/popup.hbs';

var feedbacksArray = [];

function openPopup(obj, myMap, position, clusterer) {
    var popup = document.querySelector('.popup');

    popup.innerHTML = render();
    popup.style.position = 'absolute';
    popup.style.top = position[1] + 'px'; 
    popup.style.left = position[0] + 'px';

    addFeedback(obj, myMap, clusterer, popup);

    closePopup();
}

function addFeedback(obj, myMap, clusterer, popup) {
    var inputName = document.querySelector('.form__name');
    var inputPlace = document.querySelector('.form__place');
    var inputText = document.querySelector('.form__text');
    var addButton = document.querySelectorAll('.footer__add')[document.querySelectorAll('.footer__add').length - 1];

    var headerAddress = document.querySelector('.header__address-text');

    headerAddress.innerHTML = obj.address;

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

            inputName.value = '';
            inputPlace.value = '';
            inputText.value = '';
    
            placemarks(obj, myMap, clusterer, popup);
            feedbacksArray.push(feedback);
        } else {
            alert('Заполните все поля!')
        }
    })
}

function placemarks(obj, myMap, clusterer, popup) {     
    var placemark = new ymaps.Placemark(obj.coords, {
        hintContent: obj.address,
        balloonContent: popup.children[1].innerHTML
    }, {
        preset: 'islands#darkOrangeDotIcon'
    });

    myMap.geoObjects.add(placemark);
    clusterer.add(placemark);
}

function closePopup() {
    var closeButton = document.querySelector('.header__close');
    var popup = document.querySelector('.popup');

    closeButton.addEventListener('click', () => {
        popup.innerHTML = '';
    })
}

export {
    openPopup
}