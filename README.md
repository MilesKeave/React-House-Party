Welcome to House-Party!

This is a web app built using Django, React, Node and utilizes the Spotify API.

Demo videos:

https://github.com/MilesKeave/React-House-Party/assets/97613883/2bf52d2b-badd-487e-bf8a-20a7160ea2c2

https://github.com/MilesKeave/React-House-Party/assets/97613883/f0450df1-580d-4bb7-8287-8fbb7edb7750

The app allows users to create or join a room with their friends and listen to music in sync via the host's Spotify account. 

When you create a room you will be directed to a Spotify login page. Once you log in you can start playing music! 
The host is given a room code which can be used by your friends to join your room and have partial control over the music.
The host can update the settings to allow guests to skip, play, or pause songs as well.

To run this app on your local computer, download the repo.

When you are in the repo, go into the terminal and follow these commands:

1) cd houseparty
2) then run the following command to activate the virtual environment: source yourenv/bin/activate 
3) then run the following command to start the server: python manage.py runserver
4) open a new terminal
5) cd houseparty
6) cd frontend
7) run: npm run dev

then go on your browser and open the developer server: http://127.0.0.1:8000/
