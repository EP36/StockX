#!/usr/bin/env bash

echo "Configuring database"

export 
#
# Should grab your username
#
dropdb -U $USER stockxtts;
createdb -U $USER stockxtts;
psql -U $USER stockxtts < ./database/db.sql

echo "stockxtts was configured";

psql -U $USER stockxtts < ./database/mockDB.sql

echo "I am done.";


