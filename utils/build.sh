#!/usr/bin/env bash

echo "Configuring database"

export 
#
# Should grab your username
#
dropdb -U $USER sneakerttsdb;
createdb -U $USER sneakerttsdb;
psql -U $USER sneakerttsdb < ./database/db.sql

echo "sneakerttsdb was configured";

psql -U $USER sneakerttsdb < ./database/mockDB.sql

echo "I am done.";


