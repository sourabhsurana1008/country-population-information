# country-population-information

# Api - api branch
  
  # git clone https://github.com/sourabhsurana1008/country-population-information.git -b api api
  
  # npm i (only if want to run without docker)
  
  # create .env file for database 
      * HOST="Host"
      * USER="user name"
      * PASSWORD="password"
      * DB="db name"
      * PORT="api port"
  # Run command 
      * npm start
      
  # Docker Command
      * docker build -t service:v1 .
      * docker run -p 100:100 -d service:v1
      * access - localhost:100

# Frontend - app

 # git clone https://github.com/sourabhsurana1008/country-population-information.git -b app app
 
 # npm i (only if want to run without docker)
 
 # create .env file for database
    * REACT_APP_API="node api host default it will run on port 8080 and docker 100" - http://[host]:[port]/api/
 
 # Run command
    * npm start
    
 # Docker command 
  * docker build -t application:v1 . 
  * docker run -d -p 80:80 application:v1
  * access - http://localhost

    
    
