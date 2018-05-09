#!/bin/bash
echo "Delete old database and migrations. . ."
rm db.sqlite3
rm -rf dictionary/migrations
rm -rf dictionary/__pycache__
rm -rf _autofixture
echo -e "Done\n"
echo "Create migrations and database. . ."
source virtualenv/bin/activate
./manage.py makemigrations dictionary
./manage.py migrate
echo -e "Done\n"
echo "Create superuser. . ."
#./manage.py createsuperuser --username admin --email admin@dev.com
./manage.py shell -c "from django.contrib.auth.models import User; User.objects.create_superuser('admin', 'erknrio@gmail.com', '78629366w')"
echo -e "Done\n"
echo -e "Done\n"
echo "Start"
./manage.py runserver 0.0.0.0:8000
