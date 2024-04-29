# ACA_Capstone

SQL DATA MODEL

Tables

    Users - Table that has the basic user info, such as names.

    userContacts - This table is to keep track of emails, and phonenumbers for the app.
        *This is connected to the user table for completed info on the user.

    characterCreation - Table for all the generated characters stats and info.
        -Definitely going to have to keep restructuring it as I develop the app.

        *This table is connected to users and the class table (if I keep it.)

    class - This table is to keep track of the class options the user can pick depending on their stats.
        -May drop this table since I don't know how to connect it to the rest of the tables yet.

        *This table should be connected to the characterCreation table.


Very basic right now. Mainly an organizing issue, I think. But this should at least have the tables and EER.

*As for the routes and controllers, I am somehow locked out of my mysql server for some reason? It says I don't have permission to access it even though it recognizes my password. I have to get a tutor to help but I suspect is because I have to change/update module versions. But I have my layout at least. 

-This may be solved by the time you see this.

