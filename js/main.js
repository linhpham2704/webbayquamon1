var uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        "microsoft.com",
        firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
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

function handleSignedInUser(user) {
    $(".user").removeClass("d-none")
    $(".guest").addClass("d-none")

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
}

