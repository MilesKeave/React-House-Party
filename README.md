Welcome to House-Party!

This is a web app build using Django, React, Node and utilizes the Spotify API.

The app allows users to create or join a room with their friends and listen to music in sync via the hosts spotify account. 

When you create a room you will be directed to a spotify login page. Once you login you can start playing music! 
The host is given a room code which can be used by your friends to join your room and have partial controll over the music.
The host can update the settings to allow guests to skip, play or pause songs aswell.

To run this app on you local computer, download the repo.

When you are in the repo, go into terminal and follow these commands:

1) cd houseparty
2) then run the following command to activate the virtual environment: source yourenv/bin/activate 
3) then run the following command to start the server: python manage.py runserver
4) open a new terminal
5) cd houseparty
6) cd frontend
7) run: npm run dev

then go on your browser and open the developer server: http://127.0.0.1:8000/
