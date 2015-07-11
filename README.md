# openidm-scripts
Scripts for interacting with OpenIDM

*clean-idm.sh*
Script to quickly shutdown, backup log files, clean cache and restart openidm

*changepass.js*
Custom endpoint that supports changing a single users password or bulk user changes
eg.:
POST {{idmhost}}/openidm/endpoint/changepass?_action=changepass
[
    
    {
       "username" : "btumy",
       "password" : "my_password"
    },
    {
       "username" : "juser",
       "password" : "yourpass"
    }
]
