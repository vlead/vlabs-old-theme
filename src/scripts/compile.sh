#!/bin/sh

# This script will set all the features on VLABS Open edX.
# Features included contact us, analytics, announcements, college cloud info, search feature,
# FAQ



# Copy all folders having custom html to serve
sudo cp -r /edx/app/edxapp/themes/edx-bootstrap-theme/search_feature /usr/share/nginx/html/
sudo cp -r /edx/app/edxapp/themes/edx-bootstrap-theme/workshops /usr/share/nginx/html/
sudo cp -r /edx/app/edxapp/themes/edx-bootstrap-theme/college-cloud-edition /usr/share/nginx/html/
sudo cp -r /edx/app/edxapp/themes/edx-bootstrap-theme/analytics /usr/share/nginx/html/
sudo cp -r /edx/app/edxapp/themes/edx-bootstrap-theme/contactus /usr/share/nginx/html/
sudo cp -r /edx/app/edxapp/themes/edx-bootstrap-theme/faq /usr/share/nginx/html/
sudo cp -r /edx/app/edxapp/themes/edx-bootstrap-theme/licensing /usr/share/nginx/html/
sudo cp -r /edx/app/edxapp/themes/edx-bootstrap-theme/common /usr/share/nginx/html/
sudo cp -r /edx/app/edxapp/themes/edx-bootstrap-theme/announcements /usr/share/nginx/html/


# Copy Feedback util file 
sudo cp -r /edx/app/edxapp/themes/edx-bootstrap-theme/feedback/feedback_utils.js /usr/share/nginx/html


# update assets as edxapp user and compile assets 
sudo -H -u edxapp bash << EOF
source /edx/app/edxapp/edxapp_env
cd /edx/app/edxapp/edx-platform
paver update_assets lms --settings=aws 
EOF

# restart lms instance
sudo /edx/bin/supervisorctl restart all
