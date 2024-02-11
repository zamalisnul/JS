//multipage by zamalisnul
//<![CDATA[
document.addEventListener('DOMContentLoaded', function() {
  // Function to retrieve an element by its ID, including nested elements
  function getElementByIdRecursive(parent, id) {
    if (parent.id === id) {
      return parent;
    }
    for (var i = 0; i < parent.children.length; i++) {
      var foundElement = getElementByIdRecursive(parent.children[i], id);
      if (foundElement) {
        return foundElement;
      }
    }
    return null;
  }

  // Function to check if a value is numeric
  function isNumeric(value) {
    return (typeof value === 'number' || typeof value === 'string') && !Number.isNaN(Number(value));
  }

  var postBody = document.querySelector('div.post-body');
  var splitdongElement = getElementByIdRecursive(postBody, 'postsplit');
  var splitdongContent = splitdongElement.innerHTML.split('<!--nextpage-->');
  var urlParams = new URLSearchParams(window.location.search);
  var currentPageNumber = parseInt(urlParams.get('page')) || 1;

  if (currentPageNumber < 1 || currentPageNumber > splitdongContent.length) {
    currentPageNumber = 1;
  }

  splitdongElement.innerHTML = splitdongContent[currentPageNumber - 1];

  if (splitdongContent.length > 1) {
    var postPager = document.createElement('div');       
    postPager.id = 'post-pager';
    postPager.innerHTML = "<span class='round-button current'>Pg</span>";

    for (var i = 1; i <= splitdongContent.length; i++) {
      if (i === currentPageNumber) {
        postPager.innerHTML += "<span class='round-button current'>" + i + "</span>";
      } else {
        postPager.innerHTML += "<a href='?page=" + i + "' class='round-button' rel='nofollow' title='Page " + i + "'>" + i + "</a>";
      }
    }
    splitdongElement.parentNode.insertBefore(postPager, splitdongElement.nextSibling);
  }
});

    //]]>
  
