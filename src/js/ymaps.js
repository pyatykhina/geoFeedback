import { openPopup } from './../js/popup';

function mapInit() {
    ymaps.ready(() => {
        var myMap = new ymaps.Map('map', {
            center: [55.76, 37.64], // Москва
            zoom: 13,
            controls: ['zoomControl'],
            behaviors: ['drag', 'dblClickZoom'/* , 'scrollZoom'*/]
        }, { 
            searchControlProvider: 'yandex#search',
            geoObjectOpenBalloonOnClick: false
        });

        var clusterer = new ymaps.Clusterer({            
            preset: 'islands#invertedDarkOrangeClusterIcons',
            clusterDisableClickZoom: true,
            openBalloonOnClick: true,
            groupByCoordinates: false,
            clusterBalloonContentLayout: 'cluster#balloonCarousel'
        });
    
        myMap.geoObjects.add(clusterer);

        myMap.events.add('click', function(e) {
            var coords = e.get('coords');
            var geoCoords = ymaps.geocode(coords);
            var position = e.get('position');

            geoCoords.then(res => {
                var obj = {};

                obj.coords = coords;
                obj.address = res.geoObjects.get(0).properties.get('text');
                obj.comments = [];

                openPopup(obj, myMap, position, clusterer, '');
            });
        });
    });
}

export {
    mapInit
}