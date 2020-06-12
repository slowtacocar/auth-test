var db = firebase.firestore();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var dataRef = db.collection("users").doc(user.uid);

    dataRef.get().then(function(doc) {
      var data = doc.data();
      for (row in data) {
        $("#tbody").append("<tr><td>" + row + "</td><td>" + data[row] + "</td><td><button id='" + row + "' class='btn btn-danger delete'>Delete</button></td></tr>");
      }
      $(".delete").click(function() {
        var id = $(this).attr("id");
        var object = {};
        object[id] = firebase.firestore.FieldValue.delete();
        dataRef.update(object).then(function() {
          location.reload();
        });
      });
    });

    $("#add").click(function() {
      var key = $("#key").val();
      var value = $("#value").val();
      var object = {};
      object[key] = value;
      dataRef.set(object, {merge: true}).then(function() {
        location.reload();
      });
    });
  } else {
    $("#table").prop("hidden", true);
  }
});

$("#sign-out").click(function() {
  firebase.auth().signOut();
  location.reload();
});
