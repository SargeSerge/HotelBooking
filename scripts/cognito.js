const config = {
    cognito: {
        userPoolId: "us-east-2_9ULxJWBoV", // Corrected key name
        cognitoDomain: "us-east-29ulxjwbov.auth.us-east-2.amazoncognito.com", // Removed https://, AWS SDK adds it internally
        appClientId: "3fvims8d0amdc5rmjcmbju9u6p" // Corrected key name for clarity
    }
};

var cognitoApp = {
    auth: {},
    
    Init: function() {
        var authData = {
            ClientId: config.cognito.appClientId,
            AppWebDomain: config.cognito.cognitoDomain,
            TokenScopesArray: ['email', 'openid'],
            RedirectUriSignIn: 'http://localhost:8000/',
            RedirectUriSignOut: 'http://localhost:8000/',
            UserPoolId: config.cognito.userPoolId,
            AdvancedSecurityDataCollectionFlag: false,
            Storage: window.localStorage // set a valid storage (null causes issues)
        };

        cognitoApp.auth = new AmazonCognitoIdentity.CognitoAuth(authData);

        cognitoApp.auth.userhandler = {
            onSuccess: function(result) {
                console.log("Sign-in successful:", result);
            },
            onFailure: function(err) {
                console.error("Sign-in failed:", err);
            }
        };

        // Initialize the auth flow
        cognitoApp.auth.useCodeGrantFlow(); // Optional: depending on your setup
        cognitoApp.auth.parseCognitoWebResponse(window.location.href);
    }
};