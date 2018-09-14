# Другофильтр

Приложение представляет из себя Яндекс карту. На карте можно выбирать объекты и оставлять свои отзывы о них. 
Для того, чтобы выбрать объект, необходимо кликнуть по нему. 
При клике на объект открывается всплывающее окно, в заголовке окна отображен адрес выбранного объекта. 
Окно позволяет добавить новый отзыв о данном объекте и посмотреть уже имеющиеся отзывы. 
На карту по адресу, для которого был создан отзыв, добавляется метка. Созданный отзыв отображается в списке отзывов данного объекта.
Вид меток зависит от количества отзывов по данному объекту. Отзывы поблизости или по одному адресу группируются в одну метку. У сгруппированных меток выводится их количество.
Если кликнуть на одиночную метку, открывается окно отзывов по данному адресу.
Если кликнуть на сгруппированную метку, откроется карусель с отзывами.
При масштабировании карты происходит группировка меток.



## Доступные команды
* `npm install` - установить зависимости
* `npm run prepare` - запустить тесты и проверить стиль кода
* `npm run test` - запустить тесты
* `npm run codestyle` - проверить стиль кода
* `npm run start` - запустить встроенный сервер и следить за изменениями файлов
* `npm run build` - собрать проект в папку `build`
