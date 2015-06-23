#!/bin/bash
#OpenIDM Shutdown, Zip Logs, Clear Felix-Cache and then restart 
#Run this script with sudo so that you have the privs to remove cache files and to start/stop openidm

# settings
idmhost=`hostname`
idmhome="/opt/openidm"
starthome="/etc/init.d"
idmstartcmd=$starthome/openidm

cd $idmhome

# shutdown openidm 
echo "Stopping OpenIDM ..."
$idmstartcmd stop

# tar logs
echo "Backing up log files ..."
tar cvf /var/tmp/openidm.logs.tar $idmhome/logs/*
echo "Logs are saved to /var/tmp/openidm.logs.tar"

# clean felix-cache
echo "Removing cache files ..."
cd $idmhome/felix-cache
rm -Rf bundle* cache*
ls -latr
echo "Look ma ... no files ..."

# restart openidm
echo "Starting OpenIDM ..."
$idmstartcmd start

# checking status
netstat -an | grep 8080

# clean up
echo "All done ... bye"
