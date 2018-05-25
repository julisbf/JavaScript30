const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('list')) || [];
const deleteBtn = document.querySelector('#delete-btn');
const selectBtn = document.querySelector('#select-btn');
let selectedAll = false;

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleList);
deleteBtn.addEventListener('click', deleteList);
selectBtn.addEventListener('click', selectAllItems);
insertItemsToList(items, itemsList);
checkSelectedItems(items);

function addItem(evt) {
  evt.preventDefault(); // Prevents page to reload, since it's a form
  const item = {
    text: (this.querySelector('[name=item]')).value,
    done: false
  };

  items.push(item);
  insertItemsToList(items, itemsList);
  localStorage.setItem('list', JSON.stringify(items));
  this.reset(); //Clear the form
}

/*Receives params so can be use in different places*/
function insertItemsToList(list = [], listSelector) {
  listSelector.innerHTML = list.map((item, index) => {
    return `
        <li>
          <input type="checkbox" data-index=${index} id="item${index}" ${item.done ? 'checked' : ''}/>
          <label for="item${index}">${item.text}</label>
        </li>
    `;
  }).join('');
}

/*When toggle an item, it updates the localStorage*/
function toggleList(evt) {
  if (!evt.target.matches('input')) return;
  const elem = evt.target;
  const index = elem.dataset.index;

  items[index].done = !items[index].done;
  checkSelectedItems(items);
  localStorage.setItem('list', JSON.stringify(items));
}

/*Clear all the list and reset the localStorage*/
function deleteList() {

  items.length = 0;
  localStorage.removeItem('list');
  insertItemsToList(items, itemsList);
}
/*Allows check or uncheck all items in the list*/
function selectAllItems() {
  if (items.length === 0) return;

  selectedAll = !selectedAll;
  this.innerHTML = selectedAll ? 'Unselect All' : 'Select All';

  items.map(item => item.done = selectedAll);
  insertItemsToList(items, itemsList);

}

/*Checks if all elements have been checked, change the button text and selectedAll value */
function checkSelectedItems(list) {
  if (list.every(item => item.done === true)) {
    selectedAll = true;
    selectBtn.innerHTML = 'Unselect All';
  } else {
    selectedAll = false;
    selectBtn.innerHTML = 'Select All';
  }
}