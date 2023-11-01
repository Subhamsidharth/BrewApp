# BrewApp

According to requirement I created a bookManagement in which i created the fully backend part using es6 module and latest code structure. And after deploy this code in a Vitual Machine which is based on linux macine .

As per requirement A user can add a book , he can update the book data and can see all the books details which is present in the data base and get the specfic book details.

For this I created some API and going to add each API documentation bellow

# step for run this Node server

1. first need to clone from github "https://github.com/Subhamsidharth/BrewApp.git"
2. Need to do "npm i" command for install dependencies which is creating package-lock.json and node_modules.
3. Then need to go config file using "cd config" command for adding privateKey.key, which we can get by using "openssl genpkey -algorithm RSA -out privateKey.key" command in git bash.
4. Need to create a .env folder which is containing this following keys.
   PORT = 4000
   SMTP_PORT = 587
   SMTP_USER = postbox.scsvmv.00@gmail.com
   SMTP_PASS = krzmwaxjmldwsbmo
   Note: for now this .env file is in git-hub for easy access for you.
5. Then Node server is ready for run now we can use this following commands for run our application.
   i. node app
   ii. npm start
   iii. npm run dev (can run using nodemon)

# imp :before running server need to do this above things.

# API Documentation:

# /check : (GET)

     This is a checking API after deployment API running correct or not for this reason, after server started we can use this.

# user

    first need to create a user who can verifie himself using OTP then he can able to login using email and password.

# /user/register (POST)

A user can register himself by giving the required field eg: {
"username":"subham",
"password":"Subham@50001",
"email":"subham123@gmail.com",
"age":22,
"street":"abc",
"city":"chennai",
"pincode":600021
}
register time he got a mail in his respective email Id which contain OTP and link for verification.
Note : Email should be unique, a user can not use this email again after register.

# /user/verifyOtp/:id (POST)

    In his mail he got a link which is containg the objectId of this respective user like ; "/user/verifyOtp/6540d57e3eea755f4dd5959b"
    He need to enter Otp which is contain in his mail and then he can verify him self and eligible for login.

# /user/login (POST)

     using email and password a user can login him self if he is a verifed user.
     he have to give respective field like ;
     {
    "password": "ravi",
    "email": "kanha12@gmail.com"
    }
    after login a jwt token will generate with 2hr of expairation.
    Note : i used here jwt strong algorithm that privateKey is the secret key here.

    response looks like ;
    {
    "status": true,
    "msg": "Successfully logged In",
    "data": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTQwZDU3ZTNlZWE3NTVmNGRkNTk1OWIiLCJlbWFpbCI6ImthbmhhMTJAZ21haWwuY29tIiwiaWF0IjoxNjk4NzczMTkyLCJleHAiOjE2OTg3ODAzOTJ9.VwoUHbP-G_WlTZ1vJUejvkJ6nA5kqEJw3rrZ7aRn2Wi-LShGi5ZzlIWgxAaXb4vCbK447WKZ_0ZxHLCpSOdHY_j5RcLVUEJ4RDMjvYYqNwfKFUqJlQgTB1eCOugRQs2_tyD8foLzeuaS4uvELB4Rfh1MYFj0pWOKnP6T4KzhQ2Y_99vSrgQZ7-O8c_jo0Pys42J29EiZAglInZbvQYC2i2W4UANkEAqZMNJtUkdw2p7t_F4LkzmCGkENzLKZe00Povwi4iQaYKIwOmYEkI3HOe6_ROur3kX6hMadC-hLdS53IBQId1YSIMNeEMxbnW5C4nypZ-jBMu2wv-NlwW8nEg"
    }

# /book/addBook (POST)

     As per mention above a login user can only add books for this he need to give title, summenry and author field .
     ie: {
    "title":"the perfect",
    "author":"stef jobs",
    "summary":"this is a book which is based on a perfect personalities"
    }
     here we took the user Id from the token and accoding to userId we store the book in book collections.

# /book/updateBook/:id (PUT)

    User can update his own posted book only using book ID
    user need to pass his Id in params like "/book/updateBook/6540e779ab929adf66ad7dfa"

        And he need to pass which field he going to update he have to give this field in body.
        ie like ; {
        "title":"the perfect",
        "author":"stef jobs",
        "summary":"this is a book which is based on a perfect personalities"
        }
    after that he can update his book existing fields

# /book/getBookById/:id (GET)

    accoding to book ID he can fetch the all data regarding this book, he need to pass this Id in params like :"/book/getBookById/6540e779ab929adf66ad7dfa"
     After that he can get the Data.

# /book/getAllBooks (GET)

     user can see all the existing book details using this API

# /book/deleteBook/:id (DELETE)

    if a user posted a book he can delete his own posted book only. he can not delete other posted  book, thats why he need to pass the bookId in params like ; "/book/deleteBook/653fe5bc2498220f00e05a0e"
     After that he can delete the  book .

# Deployement :

i deploye this in a ubantu Virtual macine which i am taken from Azure, in here i create a image in docker and an the running a container using this image and then i giving some inbound rule using this port after that i can use this outsite also. now it is deployed and this is the url : "http://98.70.27.101:4000/check"
