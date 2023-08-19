# Trello Clone

Clone of [trello.com](https://trello.com/)

Some bugs, inconsistencies & incompletenesses but it's functional!

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
    - [ x can give themselves a name
  - [x] add boards
    - [x] adds new object with title + unique ID
    - [x] can't add if you don't name the board
- board page
  - [x] display board title
  - [x] can rename board
  - [ ] display board creator
  - [x] board screen shows associated lists
  - [x] add list
    - [x] has button to create list
    - [x] button is functional
  - [x] list options
    - [x] rename list
  - [x] drag lists to reorder
  - [x] "add card" and "add list" cancel buttons
  - [x] can delete list
    - [ ] warn will delete all cards in the list
  - [x] can delete board
    - [ ] warn will delete all lists/cards in it
- cards
  - [x] can add a card to a list
  - [x] can't add card without specifying a title
  - [x] click card for modal/description
  - [x] can add description to card
  - [ ] can edit title
  - [x] nice UI interface editing description
  - [x] can reorder cards within list
  - [x] can move card to another list
  - [ ] can delete card
  - [x] card view
- Keyboard Accessibility
  - [x] add board form - focus moves to input
  - [x] add card form - focus moves to input
  - [x] add card form - escape to close
  - [x] add list form - focus moves to input
  - [x] add board - focus moves to new board
  - [x] add card - focus moves to new card
  - [ ] add list - focus moves to list (?)
  - [ ] can move lists with keyboard
  - [ ] can move cards with keyboard
  - [ ] edit list title via keyboard
  - [ ] edit card title via keyboard
  - [ ] arrow keys pattern
- other/possible
  - better error handling
  - database
  - login / auth
  - more users possible
  - sharing cards/lists/boards
  - comments
