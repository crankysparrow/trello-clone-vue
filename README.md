# Trello Clone

A [trello.com](https://trello.com/) clone built in Vue.

In a real/bigger project, I might opt for a more robust library to handle the drag & drop functionality. But I wanted to learn a bit about the native HTML drag-and-drop API, so that's what is used here. It's a bit strange, but it's

## ✨ Features ✨

- Info is saved in browser LocalStorage with [`useStorage`](https://vueuse.org/core/useStorage/)
- State management with [Pinia](https://pinia.vuejs.org/)
- Routing between cards/boards/home
- Drag to reorder lists
- Drag to reorder cards within or between lists
- Click titles/descriptions to edit text
- Create/delete/modify lists, boards, cards, and user

## To do

- setup
  - [x] create client
  - [x] add store
  - [x] basic styles
- store
  - [x] can delete board
  - [x] can delete card
  - [x] can delete list
    - [x] and all cards within it
  - [x] can change user name
- main homepage
  - [x] user
    - [x] generate unique ID for user
    - [x] can give themselves a name
  - [x] add boards
    - [x] adds new object with title + unique ID
    - [x] can't add if you don't name the board
- board page
  - [x] display board title
  - [x] can rename board
  - [x] display board creator
  - [x] board screen shows associated lists
  - [x] add list
    - [x] has button to create list
    - [x] button is functional
  - [x] rename list
  - [x] drag lists to reorder
  - [x] "add card" and "add list" cancel buttons
  - [x] can delete list
    - [x] warn will delete all cards in the list
  - [x] can delete board
    - [x] warn will delete all lists/cards in it
- cards
  - [x] can add a card to a list
  - [x] can't add card without specifying a title
  - [x] click card for modal/description
  - [x] can add description to card
  - [x] can edit title
  - [x] nice UI interface editing description
  - [x] can reorder cards within list
  - [x] can move card to another list
  - [x] can delete card
  - [x] card view
- UI & Keyboard

  - [ ] dark/light mode
  - [x] dialog for shortcuts/instructions?
  - [ ] switch to native HTML dialogs for the actual dialog things
    - [ ] (related) better focus trap
  - [x] add board form - focus moves to input
  - [x] add card form - focus moves to input
  - [x] add card form - escape to close
  - [x] add list form - focus moves to input
  - [x] add board - focus moves to new board button
  - [x] ~~add card - focus moves to new card~~ (decided against this)
  - [ ] ~~add list - focus moves to list (?)~~ (this too)
  - [ ] can move lists with keyboard
  - [ ] can move cards with keyboard
  - [ ] edit list title via keyboard
  - [ ] edit card title via keyboard
  - [ ] arrow keys pattern

- beyond
  - better error handling
  - database
  - login / auth
  - more users possible
  - sharing cards/lists/boards
  - comments
