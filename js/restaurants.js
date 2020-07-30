require.config({
  baseUrl: '../js/restaurants'
});

requirejs(['nodes', 'addnewrestaurant', 'displaycontainer', 'validation'],
          (nodes, addNewRestaurant, containerDisplayManager, validation) => {
  nodes['add'].addEventListener('click', containerDisplayManager.showContainer);
  nodes['submit'].addEventListener('click', addNewRestaurant);
  nodes['cancel'].addEventListener('click', containerDisplayManager.hideContainer);
  nodes['name'].addEventListener('input', () => validation.manageValidation('name', 'name-pristine', validation.nameValid));
  nodes['url'].addEventListener('input', () => validation.manageValidation('url', 'url-pristine', validation.urlValid));
});
