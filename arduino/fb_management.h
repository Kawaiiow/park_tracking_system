#include <FB_Const.h>
#include <FB_Error.h>
#include <FB_Network.h>
#include <FB_Utils.h>
#include <Firebase.h>
#include <FirebaseFS.h>
#include <Firebase_ESP_Client.h>
//Firebase Library

#include <ESP8266WiFi.h>

//Key
#include "secrets.h"

// Provide the token generation process info.
#include <addons/TokenHelper.h>

// Provide the RTDB payload printing info and other helper functions.
#include <addons/RTDBHelper.h>

/* 1. Define the WiFi credentials */ // WIFI U AND P
char WIFI_SSID[] = SECRET_SSID;
char WIFI_PASSWORD[] = SECRET_PASS;

/* 2. Define the API Key */
#define API_KEY KEY

/* 3. Define the RTDB URL */
#define DATABASE_URL PROJECT_ID

/* 4. Define the user Email and password that alreadey registerd or added in your project */
// #define USER_EMAIL EMAIL
// #define USER_PASSWORD PASS

FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;

unsigned long dataMillis = 0;
int count = 0;
bool signupOK = false;

void WifiStart(){
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(WIFI_SSID);
    // wait 10 seconds for connection:
    delay(1000);
  }

  // you're connected now, so print out the status:
  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print your ESP8266 IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);

  // print the received signal strength:
  long rssi = WiFi.RSSI();
  Serial.print("Signal strength (RSSI): ");
  Serial.print(rssi);
  Serial.println(" dBm");

  for (int i = 0; i < 2; i++) {
    digitalWrite(BUILTIN_LED, LOW);
    delay(25);
    digitalWrite(BUILTIN_LED, HIGH);
    delay(25);
  }

  digitalWrite(BUILTIN_LED, HIGH);
}

void CheckWifiStatus(){
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println(WiFi.status());
    Serial.println("Conn lost");
    WiFi.disconnect();
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.println("Tried restart");
    delay(2500);
  }
}

void FBStart(){
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);

  /* Assign the api key (required) */
  config.api_key = API_KEY;

  /* Assign the RTDB URL (required) */
  config.database_url = DATABASE_URL;

  /* Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; // see addons/TokenHelper.h

  fbdo.setBSSLBufferSize(4096 /* Rx buffer size in bytes from 512 - 16384 */, 1024 /* Tx buffer size in bytes from 512 - 16384 */);

  // Limit the size of response payload to be collected in FirebaseData
  fbdo.setResponseSize(2048);

  config.timeout.serverResponse = 10 * 1000;

  if (Firebase.signUp(&config, &auth, "", "")){
    Serial.println("ok");
    signupOK = true;
  }
  else{
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }

  Firebase.begin(&config, &auth);
}
