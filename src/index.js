import './style/style.scss';

import { mapInit } from './js/ymaps';
import { addFeedback } from './js/popup';

window.onload = mapInit();

addFeedback();

/* var map = new Map();

function geocode(address) {
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
}
*/
