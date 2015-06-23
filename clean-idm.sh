#!/bin/bash
#OpenIDM Shutdown, Zip Logs, Clear Felix-Cache and then restart 

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

# restart openidm
echo "Starting OpenIDM ..."
$idmstartcmd start

# checking status
netstat -an | grep 8080

# clean up
echo "All done ... bye"


