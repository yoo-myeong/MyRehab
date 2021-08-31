#if defined(ESP32)
#include <WiFi.h>
#elif defined(ESP8266)
#include <ESP8266WiFi.h>
#endif
#include <Firebase_ESP_Client.h>

#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"

#define WIFI_SSID "AndroidHotspot5782"
#define WIFI_PASSWORD "123456780"

#define API_KEY "AIzaSyC6i4-cibiWIss4e6arom0gkyE5SCHjnpk"

#define USER_EMAIL "yoou201@gmail.com"
#define USER_PASSWORD "firebase123"

#define DATABASE_URL "https://devcon043-default-rtdb.firebaseio.com/" //<databaseName>.firebaseio.com or <databaseName>.<region>.firebasedatabase.app

#define DATABASE_SECRET "DATABASE_SECRET"

FirebaseData fbdo;

FirebaseAuth auth;

FirebaseConfig config;

unsigned long dataMillis = 0;

int count = 0;
int relay[] = {D2,D3,D4,D5,D6,D7,D8,D9};
void setup()
{

    Serial.begin(115200);

    for(int i = 0; i < 8; i++){
    pinMode(relay[i], OUTPUT);
    digitalWrite(relay[i], HIGH);
  }

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

    String base_path = "/UsersData/";

    config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h

    config.max_token_generation_retry = 5;

    Firebase.begin(&config, &auth);

}

void loop()
{
    String get_Led;// "00100100"
    String Led_path = "/LED/LED0_7/";

    Firebase.RTDB.getString(&fbdo, Led_path.c_str(),&get_Led);
    
    for(int i=0; i<8; i++) {
      if (get_Led[i] == '0'){
          digitalWrite(relay[i],HIGH);
        }
      else if (get_Led[i] == '1'){
          digitalWrite(relay[i],LOW);
        }
    }
    
    

}
