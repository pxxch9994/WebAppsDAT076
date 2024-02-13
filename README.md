# WebAppsDAT076

This application is part of the course Web Applications DAT076.



### Running application
To run this application use the following command.


**Frontend**:

In the *client* directory
```
npm start
```

**Backend**:

In the *server* directory:
```
npm run dev
```


Add a user:
```
curl -X POST -H "Content-Type: application/json" -d "{ \"username\" : \"myUsername\",  \"password\" : \"myPassword\"}" -i localhost:8080/users
```


Add a pet:
```
curl -X POST -H "Content-Type: application/json" -d "{ \"petName\": \"myPetName\", \"username\": \"myUsername\", \"image\": \"myImage\", \"kind\": \"myPetKind\", \"breed\": \"myPetBreed\", \"birthday\": 123456 }" -i http://localhost:8080/pets
```
