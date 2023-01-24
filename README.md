<h1 align="center">MemoryPlus</h1>
<p align="center"><strong>School project | 2019</strong>
<br><a href="https://olwynrose.github.io/MemoryPlus/index.html">https://olwynrose.github.io/MemoryPlus</a>
<br>Online memory game - Web programming discovery</p>
<br/>

<h2>About</h2>
<img src="https://user-images.githubusercontent.com/27297965/214155688-52a26b80-7dbc-44ef-8a59-19bf87e8c3c4.PNG"/>
Studying in engineering school, one of the options in the first year was web programming.
This subject was intended to familiarize us with web languages that we did not know for the most part. The memory game project was the final exercise bringing together the majority of the skills learned during the courses.

Some HTML defines the skeleton of the page, some CSS allows to make the appearance more pleasant (while playing to the maximum with the options discovered which can give a "lack of taste" effect), and some Javascript coupled with JQuery allows to manage the course of the game.

The memory game consists of finding every pairs of identical images among a whole board of cards. To do this, click on each image to reveal it. The image of the card is then revealed with a flipping animation. If the two cards turned up are identical then they remain revealed; otherwise, they turn around again to show only the back of the card.
In order to enhance this game, I have implemented several small features such as :


- <h4> Customizable game board size </h4>
<img src="https://user-images.githubusercontent.com/27297965/214158199-bb3270e5-6d03-4b52-83ea-5048a9a330bc.png" width="300" height="auto" />
The number of cards present on the board can be configured at the start of the game: the game board can contain a minimum of 4 cards (2x2) (mainly useful for debugging) and can go up to a maximum of 40 cards (8x5) ( perfect to put a little difficulty).
<br>

- <h4> Multiple cards theme </h4>

<img src="https://user-images.githubusercontent.com/27297965/214175897-aab89b37-4544-4996-bcec-13ad08fafc8c.png" width="200" height="auto" />
It is possible to choose the theme of the cards among several choices (not all functional).
For example, the "Starter+" mode uses the images of the "Starter" mode but also offers other designs of the same Pokemon to spice things up a bit.
<br>

- <h4> Several difficulties </h4>

<img src="https://user-images.githubusercontent.com/27297965/214183973-358adb78-5314-4fda-ae5b-807e67925412.png" width="200" height="auto" />
It is also possible to choose different game modes: solo, two-player, solo against a bot of different difficulty (easy, normal and hard).
The bot in easy mode flips the cards randomly. The medium mode bot flips cards randomly most of the time and occasionally flips 2 cards that it knows to be the same. The bot in hard mode works the same way as in medium difficulty except that it has a higher probability of drawing 2 identical cards.
(Not all modes are functional)
<br>

- <h4> Cards flipping animation </h4>

<img src="https://media.giphy.com/media/6m6B69bgBGBRgTkHwq/giphy.gif" width="200" height="auto" />
The cards flip with a very satisfying animation. 

```
$("img.carte").css('transition','0.3s');
carte.css('transform','rotateY(90deg)'); 
```
- <h4> Other features </h4>

- The game can be stopped at any time using the give up button ("Abandonner").
- Once the game is won, a screen congratulating the player appears giving him information on his game such as the number of rounds used, the percentage of correct pairing as well as the time taken.
At this time, you have the option of returning to the menu or replaying a game of the same type.
<img src="https://user-images.githubusercontent.com/27297965/214190632-37db29a0-e155-4c35-9db4-fed4e7bb7f45.png" width="300" height="auto"/>

- Tabs at the top allow you to have more information (all the pages do not exist), in particular a link to the site of the engineering school.



<h2>Project status</h2>
The project took place over twenty hours in 2019 and is therefore closed. This repository is mainly used for history.
However, I had a lot of fun during its development and it is not impossible that I will resume it one day with all the additional knowledge that I will have acquired.

<h2>Credits</h2>

- Author: <a href="https://www.linkedin.com/in/lauriane-fels-289297159/" target="_blank">Lauriane Fels</a>
