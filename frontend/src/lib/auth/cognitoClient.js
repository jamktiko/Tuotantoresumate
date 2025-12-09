import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
} from '@aws-sdk/client-cognito-identity-provider';

const client = new CognitoIdentityProviderClient({
  region: 'us-east-1',
});

const ClientId = '2q7o2spb22vuo66ui4rnbqtsde';

// SIGNUP ------------------------------------------------------------
export async function signUpUser(email, password) {
  const command = new SignUpCommand({
    ClientId,
    Username: email,
    Password: password,
  });

  return client.send(command);
}

// CONFIRM EMAIL -----------------------------------------------------
export async function confirmUser(email, code) {
  const command = new ConfirmSignUpCommand({
    ClientId,
    Username: email,
    ConfirmationCode: code,
  });

  return client.send(command);
}

// LOGIN -------------------------------------------------------------
export async function loginUser(email, password) {
  const command = new InitiateAuthCommand({
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  });

  const res = await client.send(command);

  return {
    idToken: res.AuthenticationResult.IdToken,
    accessToken: res.AuthenticationResult.AccessToken,
    refreshToken: res.AuthenticationResult.RefreshToken,
  };
}

// LOGOUT ------------------------------------------------------------
export function logoutUser() {
  localStorage.clear();
}
