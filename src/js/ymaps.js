import render from './../templates/popup.hbs';

import { addFeedback, closePopup } from './../js/popup';

function mapInit() {
    ymaps.ready(() => {
        var myMap = new ymaps.Map('map', {
            center: [55.76, 37.64], // Москва
            zoom: 13,
            controls: ['zoomControl'],
            behaviors: ['drag', 'dblClickZoom', 'scrollZoom']
        }, { 
            searchControlProvider: 'yandex#search',
            geoObjectOpenBalloonOnClick: false
        });

        var placemarksArray = [];

        myMap.events.add('click', e => {
            var popup = document.createElement('div');
            
            popup.innerHTML = render();
            popup.style.position = 'absolute';
            popup.style.top = '50px';
            popup.style.left = '100px';

            document.querySelector('.container').appendChild(popup);

            var coords = e.get('coords');

            addFeedback('')
                .then(function() {
                    var placemark = new ymaps.Placemark(coords, {
                        hintContent: ymaps.geocode(coords),
                        balloonContent: popup.children[0].children[1].innerHTML
                    });

                    placemark.events.add('click', () => {
                        addFeedback(placemark.balloonContent);
                    })

                    myMap.geoObjects.add(placemark);
                    placemarksArray.push(placemark);
                    clusterer.add(placemark);
                })

            var headerAddress = document.querySelector('.header__address-text');

            headerAddress.innerHTML = ymaps.geocode(coords);

            if (document.querySelector('.popup')) {
                closePopup();
            }
        });

        var clusterer = new ymaps.Clusterer({            
            preset: 'islands#invertedBlackClusterIcons',
            clusterDisableClickZoom: true,
            openBalloonOnClick: true,
            groupByCoordinates: false,
            clusterBalloonContentLayout: 'cluster#balloonCarousel'
        });

        myMap.geoObjects.add(clusterer);
    });
}

export {
    mapInit
}