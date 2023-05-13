# Запуск
docker compose build
docker compose up -d --force-recreate

# Миграции
npm run migration:generate -- src/migrations/event_view

docker login nexus.caaat.pro
docker build . -t nexus.caaat.pro/repository/docker-projects/company-api:latest
docker push nexus.caaat.pro/repository/docker-projects/company-api:latest

авторизация

Основное
поиск по сотрудникам
просмотр сотрудника

Админка
Создание сотрудника
Более подробное просматривание сотрудника
Обновление информации о сотруднике
Загрузка фото

Начисление монеток сотруднику
Списание монеток у сотрудника

Выдача медальки сотруднику
Удаление медальки у сотрудника

Создание списка медалек

Создание списка медалек
Удаление/Редактирование/Обновление
