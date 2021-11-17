
var firebaseConfig = {
    apiKey: "AIzaSyBIZZWrBOu9gN9J-nALp-oYNje2Vs_OQmo",
    authDomain: "webbayquamon.firebaseapp.com",
    projectId: "webbayquamon",
    storageBucket: "webbayquamon.appspot.com",
    messagingSenderId: "244866381141",
    appId: "1:244866381141:web:3629f2b10451de9f6a2bdc",
    measurementId: "G-W03VC0V2DZ"
};

var uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
        signInSuccessWithAuthResult: function (authResult) {
            if (authResult.user) {
                handleSignedInUser(authResult.user);
            }
            return false;
        },
        signInFailure: function (error) {

        }
    },

    autoUpgradeAnonymousUsers: true
};
var ui
$(function () {
    firebase.initializeApp(firebaseConfig);
    ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);
    firebase.auth().onAuthStateChanged(function (user) {
        user ? handleSignedInUser(user) : handleSignedOutUser();
        $("#login-spinner").addClass("d-none")
    });
});

function handleSignedInUser(user) {
    $(".user").removeClass("d-none")
    $(".guest").addClass("d-none")
    $('#login').addClass("d-none")
    $(".modal-title").addClass("d-none")
    $(".modal-title-signed").removeClass("d-none")

    $("#name").text(user.displayName);
    $("#email").text(user.email);
    $("#phone").text(user.phoneNumber);
    if (user.photoURL) {
        $(".avatar").attr("src",user.photoURL);
    } else {
        $(".avatar").attr("src","/images/user.svg");
    }
    $('#modal-login').modal('hide');
}

function handleSignedOutUser() {
    ui.start("#firebaseui-auth-container", uiConfig);
    $(".user").addClass("d-none")
    $(".guest").removeClass("d-none")
    $('#login').removeClass("d-none")
    $(".modal-title").removeClass("d-none")
    $(".modal-title-signed").addClass("d-none")
}

