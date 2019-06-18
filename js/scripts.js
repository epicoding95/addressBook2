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
function Contact(firstName, lastName, phoneNumber, Address) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.Address = Address
  // this.email = email
  // this.homeAddress = homeAddress
}
function Address(firstAddress, secondAddress, thirdAddress, fourthAddress){
  this.firstAddress = firstAddress,
  this.secondAddress = secondAddress,
  this.thirdAddress = thirdAddress,
  this.fourthAddress = fourthAddress
}


// puts contact info together
Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}


// User Interface Logic ---------
var addressBook = new AddressBook();
// puts contact details into list format
function displayContactDetails(addressBookToDisplay) {
//this displays the contacts name to be clicked for more info
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
  $('.address').html(contact.Address);
  // $('.email').html(contact.email);
  // $('.homeAddress').html(contact.homeAddress);
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
    // var inputtedEmail =
    // $('input#email').val();
    // var inputtedHomeAddress = $('input#homeAddress').val();
    $('input#Address').val();
    var inputtedFirstAddressType = $('input#firstAddress').val();
    var inputtedSecondAddress = $('input#secondAddress').val();
    var inputtedThirdAddress = $('input#thirdAddress').val();
    var inputtedFourthAddress = $('input#fourthAddress').val();
    //pulled class id and plugged into output
    var firstType = $('#firstType').val();
    var secondType = $('#secondType').val();
    var thirdType = $('#thirdType').val();
    var fourthType = $('#fourthType').val();


    var address= new Address(inputtedFirstAddressType, inputtedSecondAddress, inputtedThirdAddress, inputtedFourthAddress);
    console.log(address);
    $("#address").append("<li>"+ firstType +" "+ address.firstAddress+ "<br>" +secondType +" "+address.secondAddress+ "<br>" +thirdType +" "+address.thirdAddress+ "<br>" +fourthType +" "+address.fourthAddress+ "</li>")

  // clears user-input fields
  $("form")[0].reset();
   // $("input#new-first-name").val("");
   // $("input#new-last-name").val("");
   // $("input#new-phone-number").val("");
   // $('input#email').val("");
   // $('input#homeAddress').val("");
   // $('input#firstAddressn').val("");
   // $('input#secondAddressn').val("");
   // $('input#thirdAddressn').val("");
   // $('input#fourthAddressn').val("");




    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, Address);
    // var newAddress = new Address(inputtedFirstAddressType, inputtedSecondAddress, inputtedThirdAddress, inputtedFourthAddress)
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  })
})
