#!/bin/bash
#OpenIDM Shutdown, Zip Logs, Clear Felix-Cache and then restart 

# settings
idmhost=`hostname`
idmhome="/opt/openidm"
starthome="/etc/init.d"
idmstartcmd=$starthome/openidm

cd $idmhome

# shutdown openidm 
$idmstartcmd stop


# tar logs
tar cvf /var/tmp/openidm.logs.tar $idmhome/logs/*
echo "Logs are saved to /var/tmp/openidm.logs.tar"

# clean felix-cache
cd $idmhome/felix-cache
rm -Rf bundle* cache*

# restart openidm
$idmstartcmd start
echo "OpenIDM is restarting"



