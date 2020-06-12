var db = firebase.firestore();

db.collection("test-data").doc("data").get().then(function(doc) {
  var data = doc.data();
  for (row in data) {
    $("#table").append("<tr><td>" + row + "</td><td>" + data[row] + "</td></tr>");
  }
});

$("#sign-out").click(function() {
  firebase.auth().signOut();
  location.reload();
});
