import render from './../templates/popup.hbs';

import { addFeedback } from './../js/popup';

var map = new Map();

/* function geocode(address) {
    if (map.has(address)) {
        return map.get(address);
    }

    map.set(address, ymaps.geocode(address)
        .then(result => {
            var points = result.geoObjects.toArray();

            if (points.length) {
                return points[0].geometry.getCoordinates();
            }
        }));

    return map.get(address);
}*/


function getAddress(coords) {
    ymaps.geocode(coords).then(function (res) {
        var firstGeoObject = res.geoObjects.get(0);

        myPlacemark.properties
            .set({
                // Формируем строку с данными об объекте.
                iconCaption: [
                    // Название населенного пункта или вышестоящее административно-территориальное образование.
                    firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                    // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
                    firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                ].filter(Boolean).join(', '),
                // В качестве контента балуна задаем строку с адресом объекта.
                balloonContent: firstGeoObject.getAddressLine()
            });
    });
}

function mapInit() {
    ymaps.ready(() => {
        var myMap = new ymaps.Map('map', {
            center: [55.76, 37.64], // Москва
            zoom: 13,
            controls: ['zoomControl'],
            behaviors: ['drag', 'dblClickZoom'/* , 'scrollZoom'*/]
        }, { 
            searchControlProvider: 'yandex#search' 
        });

        // var placemarksArray = [];

        myMap.events.add('click', e => {
            var popup = document.createElement('div');
            var coords = e.get('coords');

            popup.innerHTML = render();
            popup.style.position = 'absolute';
            popup.style.top = '50px';
            popup.style.left = '100px';
            /* console.log(popup.style.top);
            console.log(popup.style.left);*/

            document.querySelector('.container').appendChild(popup);

            /* var placemark;

            placemark = new ymaps.Placemark(coords, {
                hintContent: 'адрес',
                balloonContent: 'baloon'
            });
            myMap.geoObjects.add(placemark);
            placemarksArray.push(placemark);
            clusterer.add(placemark);*/

            // console.log(getAddress(coords));
            // console.log(ymaps.geocode(coords));


            var headerAddress = document.querySelector('.header__address-text');

            headerAddress.innerHTML = ymaps.geocode(coords);

            addFeedback();
        });

        var clusterer = new ymaps.Clusterer({            
            preset: 'islands#invertedBlackClusterIcons',
            clusterDisableClickZoom: true,
            openBalloonOnClick: true,
            groupByCoordinates: false,
            clusterBalloonContentLayout: 'cluster#balloonCarousel'
        });

        /* console.log('1');
        placemarksArray.map(item => {
            console.log('2');
            console.log(placemark);
            let myPlaceMark = placemark(item.coords, item);// загрузка метки, на основе отзыва и координатов

            clusterer.add(myPlaceMark);
        })*/

        myMap.geoObjects.add(clusterer);
    });
}

export {
    mapInit
}