# Langi Django App

Langi is an application designed to help its users develop their language skills in a fun and convenient way. It uses one of the most popular SRS (Spaced Repetition System) algorithms for learning the previously created flashcards. Apart from adding new flashcards, users can import files to automatically create entire sets of words. The application supports both text document files and image files such as PNG and JPG. Featured mini-games, make learning new words and expressions entertaining. Langi’s interface is available in 16 languages and 2 color modes - the default "light" mode, and the optional "dark" mode, which is particularly useful when using the application at night. Other functionalities include the system of virtual keyboards, the audio recording option (used to save the pronunciation of a new word), the auto-translation with Google Translate API and learning statistics. The application was created with Django technology, Django REST framework, and OpenCV-Python library. 

![Registration Panel](Screenshots/registration_panel.png)

![Login Panel](Screenshots/login_panel.png)

## App's features:
*  Creating a user account, logging in to the application and resetting the password by sending the appropriate link to the e-mail address provided during registration;
* Changing a user interface language (the available languages are **English**, **German**, **Polish**, **Czech**, **Spanish**, **French**, **Italian**, **Lithuanian**, **Dutch**, **Portuguese**, **Turkish**, **Russian**, **Traditional chinese**, **Japanese**, **Korean**, **Greek**);
* Changing an application theme between light and dark;
* Adding new decks by specifying the deck name and optional tags;
* Editing name and tags, delete and preview basic deck informations;
* Adding new flashcards to the selected deck. As part of the flashcard, we have the option of adding text to be on both sides of the card (front / back), adding up to three example sentences, adding an image and recording a sound using the user's microphone;
* Removing cards and viewing them within a specific deck, eg as a function available from the "Dictionary" level;
* Searching a deck by name or tag, or searching for a given word in the currently viewed deck;
* Translating entered text using the Google Translate API;
* Virtual keyboards, available for 47 languages;
* System (algorithm) that allows you to properly combine Korean letters, the so-called Jamo, into syllables that are part of the Hangul alphabet;
* Importing word sets from text document files;
* Automatic creation of flashcards from imported image files by using image processing algorithms;
* Learning words and phrases using two mini-games, ie Snake (a modified version that includes words) and Drag\&Drop;
* Standard method of learning words and phrases using the SRS algorithm;
* The ability to track the learning statistics created in the form of bar charts and tables.



## Some extra screenshots:

![Home light](Screenshots/home_light.png)
![Home dark](Screenshots/home_dark.png)
![Add card light](Screenshots/add_card_2.png)
![Add card dark](Screenshots/add_card_4.png)
![Learn](Screenshots/learn.png)