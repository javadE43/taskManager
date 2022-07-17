# Register
Step 1
Email and password are required to register


# Login
Step 2
You must enter the correct email address and password to log in

# create Token
Step 3
To generate a token, you need to provide the ID provided to you at login and the x-refresh-token in the login header.
Add in the create token header



# Note 1
This token is valid for 15 minutes and after 15 minutes, you need to request a new token again.


# Note 2
Tokens are exclusive and you will receive a special token each time you register


# Note 3
Each user can only access the tasks related to her


Step 4
# create List
To create a task, you must first create the task category, which has two data (title-username).
In the header field, you must enter the received token


Step 5
# create task
To create a task, you must enter the ID of the category you created for the tasks in the URL
You must set the token in the header


Step 6
# delete category
To delete a workgroup, you must include the workgroup ID in the URL
Set the token in the header

# Note 4
By deleting the task category, all tasks defined in this category will be deleted



Step 7
# delete & patch
To delete and update a task, you must enter the following URL

http://localhost:4000/api/lists/task/listId/task/taskid


