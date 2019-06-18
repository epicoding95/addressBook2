// Business Logic for AddressBook ---------
//main constructor
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}
//pushes contacts with id to the addressBook
AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}
//assigns id to each contact
AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}
//finds the contact by ID within
AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}
// deletes contacts because fukem the first if allows the input to keep going with removing the contact as well.
AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
     // (move past empty arrays)
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, email, homeAddress) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber
  this.email = email
  this.homeAddress = homeAddress
  
}
// puts contact info together
Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}


// User Interface Logic ---------
var addressBook = new AddressBook();
// puts contact details into list format
function displayContactDetails(addressBookToDisplay) {

  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
}
// shows contact info  and adds button for delete
function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $('#show-contact').show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $('.email').html(contact.email);
  $('.homeAddress').html(contact.homeAddress);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class ='deleteButton' id =" + + contact.id + ">Delete</button>");
}
// listens for action taken
function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
  showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function(){
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedEmail = $('input#email').val();
    var inputtedHomeAddress = $('input#homeAddress').val();

  // clears user-input fields
   $("input#new-first-name").val("");
   $("input#new-last-name").val("");
   $("input#new-phone-number").val("");
   $('input#email').val("");
   $('input#homeAddress').val("");

    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail, inputtedHomeAddress);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  })
})
