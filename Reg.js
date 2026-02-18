
 const firebaseConfig = {
    apiKey: "AIzaSyAIKx0nNnEifhymjk3WY8TSaxRkXvx4tlo",
    authDomain: "bmi-monitor-6f925.firebaseapp.com",
    databaseURL: "https://bmi-monitor-6f925-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "bmi-monitor-6f925",
    storageBucket: "bmi-monitor-6f925.firebasestorage.app",
    messagingSenderId: "917071409011",
    appId: "1:917071409011:web:54ec41753374a7debd5f06",
    measurementId: "G-F4LNNBQYW8"
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  console.log(app);

firebase.database().ref('sensor/height').on('value', (snapshot) => {
  const data = snapshot.val();
  document.getElementById("height").value = data;
  console.log(data);
  calcBMI();
});

firebase.database().ref('sensor/weight').on('value', (snapshot) => {
  const data = snapshot.val();
  document.getElementById("weight").value = data;
  console.log(data);
  calcBMI();
});


function createUser(){

password = document.getElementById("password").value;
emailInput = document.getElementById("email").value;
nameX = document.getElementById("nameX").value;
birthYear = document.getElementById("birthYear").value;
genderr = document.querySelector('input[name="gender"]:checked')?.value || "";
diseasesArr = [];
  document.querySelectorAll('.condition:checked').forEach(cb => {
    diseasesArr.push(cb.value);
  });
diseasesText = diseasesArr.length > 0 ? diseasesArr.join(', ') : 'ללא';


 firebase.auth().createUserWithEmailAndPassword(emailInput, password)
    .then(function (userCredential) {
      var user = userCredential.user;

      // 🔥 מבנה תואם לעמוד האישי
      return firebase.database().ref("users/" + user.uid).set({
        name: nameX,
        birthYear: birthYear,
        email: emailInput,
        gender: genderr,
        diseases: diseasesArr   
      });
    })
    .then(function () {
      alert("✅ משתמש נוצר בהצלחה");
      window.location.href = "personalBMI.html";
    })
    .catch(function (error) {
      console.error(error.message);
      alert(error.message);
    });
}

function login(){

password = document.getElementById("loginPassword").value;
email = document.getElementById("loginEmail").value;


firebase.auth().signInWithEmailAndPassword(email, password)
 .then(function () {
      window.location.href = "personalBMI.html";
    })
    .catch(function (error) {
      console.error(error.message);
      alert(error.message);
    });
}







