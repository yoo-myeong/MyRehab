#if defined(ESP32)
#include <WiFi.h>
#elif defined(ESP8266)
#include <ESP8266WiFi.h>
#endif
#include <Firebase_ESP_Client.h>

//Provide the token generation process info.
#include "addons/TokenHelper.h"
//Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

/* 1. Define the WiFi credentials */
#define WIFI_SSID "AndroidHotspot5782"
#define WIFI_PASSWORD "123456780"

#define API_KEY "AIzaSyC6i4-cibiWIss4e6arom0gkyE5SCHjnpk"

/* 3. Define the user Email and password that already registerd or added in your project */
#define USER_EMAIL "yoou201@gmail.com"
#define USER_PASSWORD "firebase123"

/* 4. If work with RTDB, define the RTDB URL */
#define DATABASE_URL "https://devcon043-default-rtdb.firebaseio.com/" //<databaseName>.firebaseio.com or <databaseName>.<region>.firebasedatabase.app

/** 5. Define the database secret (optional)
 * 
 * This database secret needed only for this example to modify the database rules
 * 
 * If you edit the database rules yourself, this is not required.
*/
#define DATABASE_SECRET "DATABASE_SECRET"

/* 6. Define the Firebase Data object */
FirebaseData fbdo;

/* 7. Define the FirebaseAuth data for authentication data */
FirebaseAuth auth;

/* 8. Define the FirebaseConfig data for config data */
FirebaseConfig config;

unsigned long dataMillis = 0;
int count = 0;

int relay[] = {D2,D3,D4,D5};
int controlPin1[] = {D6,D7,D8,D9};


void setup()
{

    Serial.begin(115200);

    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print("Connecting to Wi-Fi");
    while (WiFi.status() != WL_CONNECTED)
    {
        Serial.print(".");
        delay(300);
    }
    Serial.println();
    Serial.print("Connected with IP: ");
    Serial.println(WiFi.localIP());
    Serial.println();

    Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);

    config.api_key = API_KEY;

    auth.user.email = USER_EMAIL;
    auth.user.password = USER_PASSWORD;

    config.database_url = DATABASE_URL;

    Firebase.reconnectWiFi(true);
    fbdo.setResponseSize(12288);
    fbdo.setBSSLBufferSize(4096, 4096); //minimum size is 512 bytes, maximum size is 16384 bytes

    String base_path = "/UsersData/";
    
    config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h

    config.max_token_generation_retry = 5;

    Firebase.begin(&config, &auth);

  
  for(int i = 0; i<4; i++){
    pinMode(relay[i], OUTPUT);
    digitalWrite(relay[i], HIGH);
  }
  for(int i = 0; i < 4; i++){
    pinMode(controlPin1[i], OUTPUT);
    digitalWrite(controlPin1[i], LOW);
  }
  
}


String get_LED;
String LED_path = "/LED/LED16_19/";

int channel[12][4] = {
    {1,1,0,1}, //channel 0 
    {0,1,0,1}, //channel 1
    {1,0,0,1}, //channel 2
    {0,0,0,1}, //channel 3 
    {1,1,1,0}, //channel 4
    {0,1,1,0}, //channel 5
    {1,0,1,0}, //channel 6
    {0,0,1,0}, //channel 7 
    {1,1,0,0}, //channel 8 
    {0,1,0,0}, //channel 9 
    {1,0,0,0}, //channel 10 
    {0,0,0,0}, //channel 11
    };
int PRESS[] = {0,0,0,0,0,0,0,0,0,0,0,0};
String PRESS_path = "/PRESS/PRESS0_11/";


void loop()
{  
  // LED code
  
  Firebase.RTDB.getString(&fbdo, LED_path.c_str(), &get_LED);
//  Serial.printf("", Firebase.RTDB.getString(&fbdo, LED_path.c_str(), &get_LED));
  for(int i=0; i<4; i++) {
    if (get_LED[i] == '0'){
        digitalWrite(relay[i],HIGH);
      }
    else if (get_LED[i] == '1'){
        digitalWrite(relay[i],LOW);
      }
  }
  Serial.println(get_LED);


  //  PRESS code

  for(int i=0; i<12; i++){
    for(int j=0; j<4; j++){
        digitalWrite(controlPin1[j],channel[i][j]);
      }
      int val = analogRead(A0);
      PRESS[i] = val;
  }
  
  String press_string = "[";
  for(int i = 0; i < 12; i++){
    press_string += PRESS[i];
    press_string += ",";
  }
  press_string = press_string.substring(0,press_string.length()-1);
  press_string += "]";
  
  Firebase.RTDB.setString(&fbdo, PRESS_path.c_str(), press_string);
//  Serial.printf("", Firebase.RTDB.setAsync(&fbdo, PRESS_path.c_str(), press_string));   

  Serial.println(press_string);
  Serial.println();

}
