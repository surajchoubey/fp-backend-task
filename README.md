# FP BACKEND TASK

### How to use the application?

1. Clone the repository and install required node package modules

```
https://github.com/surajchoubey/fp-backend-task/
cd fp-backend-task/
npm install
```

2. To run database have MongoDB installed. I have made the set of commands simpler so all you need to do is. (from project root dir)

```
chmod +x ./rundb.sh
./rundb.sh
```

### Storing into Database from Query

For a certain **query** and **delay** it uses YouTube API v3 to fetch latest videos and store them into the database.
The above operation is executed with the same **query** after a fixed **delay** and it is store in the database.

![fetchyt](images/1.png)

### Searching from Database while querying

For queries, **q** (a query provided by user), **page** (default = 1) and **limit** (default = 5) it will provide results in reverse chronological order

![fetchdb](images/2.png)

### FileSystem

![filesystem](images/3.png)

