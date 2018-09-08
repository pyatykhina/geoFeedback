import render from './../templates/popup.hbs';

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

            popup.innerHTML = render();
            popup.style.position = 'absolute';
            popup.style.top = '50px';
            popup.style.left = '100px';
            /* console.log(popup.style.top);
            console.log(popup.style.left);*/

            document.querySelector('.container').appendChild(popup);

            /* var placemark;
            var coords = e.get('coords');

            placemark = new ymaps.Placemark(coords, {
                hintContent: 'адрес',
                balloonContent: 'baloon'
            });
            myMap.geoObjects.add(placemark);
            placemarksArray.push(placemark);
            clusterer.add(placemark);*/
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