# Courses App

Simple site for searching courses 

## Screenshots

![image](https://github.com/sukhanova1/courses-app/assets/102801240/1207563f-9cc0-4bb6-87b1-7011f6a0d7e7)
![image](https://github.com/sukhanova1/courses-app/assets/102801240/4f1e607a-fe4f-44aa-91f0-b7cdca2ae4db)
![image](https://github.com/sukhanova1/courses-app/assets/102801240/b8abe166-a81f-4562-bc37-4f16f26ed793)
![image](https://github.com/sukhanova1/courses-app/assets/102801240/6017105e-e144-466f-899e-30768faeaeff)
![image](https://github.com/sukhanova1/courses-app/assets/102801240/d595784f-605c-49d4-bc00-4b457fcdb3d1)
![image](https://github.com/sukhanova1/courses-app/assets/102801240/e73b4375-8575-4ff6-9342-a22f09a13b03)

## About

Courses app is a frontend part (desctop only) for course-searching website with a role-based access control. Application covered with unit tests. Used technologies: React, Redux, Redux Thunk, React Router, CSS, React Teating Library, Jest.

## Key Features

User can:

- login/register in the system;
- search courses by name or id;
- add/update/delete courses (available only for admin role);
- add authors to the sysytem (available only for admin role);
- navigate between pages;

To login as admin use: 
```shell
email: admin@email.com
password: admin123
```

## Running Application

To run server clone [courses-app-backend](https://github.com/sukhanova1/courses-app-backend) repository, then install all dependencies with `npm intall` and run `npm start`.

After cloning courses-app run `npm install`. To start the development server run `npm start` and navigate to `http://localhost:3000/` to view it in your browser. 
To build the app for production run `npm run build`.

To launch the test runner run `npm test`.
