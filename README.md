# Locate Me

Locate Me is a simple project that does one of two things:

* Displays a current location marker on a map
* Allows for the update of said location

After deploying the project (insert one click Heroku deploy here), just visit the homepage to view the current location

To update the location, visit the following URL:

HOSTED_URL_LOCATION?loc=GEO_COORDINATES&pass=PASSWORD

  * HOSTED_URL_LOCATION: the base URL of the hosted application
  * GEO_COORDINATES: latitude/longitude in the format of LONGITUDE,LATITUDE
  * PASSWORD: the same value of the environment variable set up on the application
  
# TODO

Update instructions on easily updating location from mobile device with one tap.