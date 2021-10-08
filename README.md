# Favorite artist - The Notorious B.I.G.

## Setup for development

Make sure to have a `.env` file with the variables shown in `.env.example`. Then, just run 
`yarn run start` to start up the development build.

## Project structure

All the relevant code is in the `src` folder. Under that, `app` folder represents globally used
files such as the navigation bar, the router, etc. Then, `components` folder has smaller 
reusable components. Finally, `features` folder has the actual pages of the application and all
the components/redux related to that.