# Loading your code

## Create folder

1. In the [folder that you have expanded or cloned](test-environment.html#clone-or-download), create a folder within the `players` folder. There is no specific naming convention that need to follow.

2. Within the folder you created, create a file named `player.py`. This file will consist of the `Player` class, which should follow the template as described in the [instructions](instructions.html#player-class).

    If you need other files for your code to run, you should place them in this folder.

## Folder structure

If your player folder is named `super_player`, this should be the folder structure. 

<svg width="100%" viewBox="0 -20 1000 500">
  <svg class="mdi-folder" x="0" y="0" width="55" height="55" viewBox="0 0 24 24">
    <path fill="black" d="M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z"/>
  </svg>
  <text dominant-baseline="text-before-edge" x="70" y="5" stroke="transparent" fill="black" style="font-size:28px">water-measuring-puzzle</text>
  <svg class="mdi-folder" x="50" y="80" width="55" height="55" viewBox="0 0 24 24">
    <path fill="black" d="M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z"/>
  </svg>
  <text dominant-baseline="text-before-edge" x="120" y="85" stroke="transparent" fill="black" style="font-size:28px">frontend</text>
  <svg class="mdi-folder" x="50" y="160" width="55" height="55" viewBox="0 0 24 24">
    <path fill="black" d="M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z"/>
  </svg>
  <text dominant-baseline="text-before-edge" x="120" y="165" stroke="transparent" fill="black" style="font-size:28px">players</text>
  <svg class="mdi-folder" x="100" y="240" width="55" height="55" viewBox="0 0 24 24">
    <path fill="#4DB6AC" d="M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z"/>
  </svg>
  <text dominant-baseline="text-before-edge" x="170" y="245" stroke="transparent" fill="#4DB6AC" style="font-size:28px">super_player</text>
  <svg class="mdi-language-python" x="150" y="320" width="55" height="55" viewBox="0 0 24 24">
    <path fill="#4DB6AC" d="M19.14,7.5A2.86,2.86 0 0,1 22,10.36V14.14A2.86,2.86 0 0,1 19.14,17H12C12,17.39 12.32,17.96 12.71,17.96H17V19.64A2.86,2.86 0 0,1 14.14,22.5H9.86A2.86,2.86 0 0,1 7,19.64V15.89C7,14.31 8.28,13.04 9.86,13.04H15.11C16.69,13.04 17.96,11.76 17.96,10.18V7.5H19.14M14.86,19.29C14.46,19.29 14.14,19.59 14.14,20.18C14.14,20.77 14.46,20.89 14.86,20.89A0.71,0.71 0 0,0 15.57,20.18C15.57,19.59 15.25,19.29 14.86,19.29M4.86,17.5C3.28,17.5 2,16.22 2,14.64V10.86C2,9.28 3.28,8 4.86,8H12C12,7.61 11.68,7.04 11.29,7.04H7V5.36C7,3.78 8.28,2.5 9.86,2.5H14.14C15.72,2.5 17,3.78 17,5.36V9.11C17,10.69 15.72,11.96 14.14,11.96H8.89C7.31,11.96 6.04,13.24 6.04,14.82V17.5H4.86M9.14,5.71C9.54,5.71 9.86,5.41 9.86,4.82C9.86,4.23 9.54,4.11 9.14,4.11C8.75,4.11 8.43,4.23 8.43,4.82C8.43,5.41 8.75,5.71 9.14,5.71Z"/>
  </svg>
  <text dominant-baseline="text-before-edge" x="220" y="325" stroke="transparent" fill="#4DB6AC" style="font-size:28px">player.py</text>
  <svg class="mdi-language-python" x="50" y="400" width="55" height="55" viewBox="0 0 24 24">
    <path fill="black" d="M19.14,7.5A2.86,2.86 0 0,1 22,10.36V14.14A2.86,2.86 0 0,1 19.14,17H12C12,17.39 12.32,17.96 12.71,17.96H17V19.64A2.86,2.86 0 0,1 14.14,22.5H9.86A2.86,2.86 0 0,1 7,19.64V15.89C7,14.31 8.28,13.04 9.86,13.04H15.11C16.69,13.04 17.96,11.76 17.96,10.18V7.5H19.14M14.86,19.29C14.46,19.29 14.14,19.59 14.14,20.18C14.14,20.77 14.46,20.89 14.86,20.89A0.71,0.71 0 0,0 15.57,20.18C15.57,19.59 15.25,19.29 14.86,19.29M4.86,17.5C3.28,17.5 2,16.22 2,14.64V10.86C2,9.28 3.28,8 4.86,8H12C12,7.61 11.68,7.04 11.29,7.04H7V5.36C7,3.78 8.28,2.5 9.86,2.5H14.14C15.72,2.5 17,3.78 17,5.36V9.11C17,10.69 15.72,11.96 14.14,11.96H8.89C7.31,11.96 6.04,13.24 6.04,14.82V17.5H4.86M9.14,5.71C9.54,5.71 9.86,5.41 9.86,4.82C9.86,4.23 9.54,4.11 9.14,4.11C8.75,4.11 8.43,4.23 8.43,4.82C8.43,5.41 8.75,5.71 9.14,5.71Z"/>
  </svg>
  <text dominant-baseline="text-before-edge" x="120" y="405" stroke="transparent" fill="black" style="font-size:28px">server.py</text>
  <path d="M 25 55 v 52 h 20 m -20 0 v 80 h 20 m -20 0 v 240 h 20 m -20 0" stroke="black" fill="none" stroke-width="5"/>
  <path d="M 25 55 m 50 160 v 52 h 20" stroke="black" fill="none" stroke-width="5"/>
  <path d="M 25 55 m 100 240 v 52 h 20 m -20 0" stroke="black" fill="none" stroke-width="5"/>
</svg>