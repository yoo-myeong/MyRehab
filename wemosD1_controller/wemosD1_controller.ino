#include <Wire.h>
const int MPU_addr = 0x68;
int16_t AcX, AcY, AcZ, Tmp, GyX, GyY, GyZ;

int controlPin1[] = {D6,D7,D8,D9};

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

#define DATABASE_URL "https://devcon043-default-rtdb.firebaseio.com/"

#define DATABASE_SECRET "DATABASE_SECRET"

FirebaseData fbdo;

FirebaseAuth auth;

FirebaseConfig config;

unsigned long dataMillis = 0;
int count = 0;

void setup()
{

    Serial.begin(115200);
    

    Wire.begin();
    Wire.beginTransmission(MPU_addr);
    Wire.write(0x6B); 
    Wire.write(0); 
    Wire.endTransmission(true);

    for(int i = 0; i < 4; i++){
      pinMode(controlPin1[i], OUTPUT);
      digitalWrite(controlPin1[i], LOW);
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

    config.token_status_callback = tokenStatusCallback; 

    config.max_token_generation_retry = 5;

    Firebase.begin(&config, &auth);

    String var = "$userId";
    String val = "($userId === auth.uid && auth.token.premium_account === true && auth.token.admin === true)";
    Firebase.RTDB.setReadWriteRules(&fbdo, base_path.c_str(), var.c_str(), val.c_str(), val.c_str(), DATABASE_SECRET);


}


int channel[5][4] = {
      {1,1,0,1}, //channel 11 
      {0,0,1,1}, //channel 12 
      {1,0,1,1}, //channel 13 
      {0,1,1,1}, //channel 14 
      {1,1,1,1} //channel 15 
      };
      
int PRESS[] = {0,0,0,0,0};  

int middle =0;
bool visited = false; // visited 0 or N, N: press val

int mpu_arr[7];

void loop()
{
    Wire.beginTransmission(MPU_addr);
    Wire.write(0x3B); // starting with register 0x3B (ACCEL_XOUT_H)
    Wire.endTransmission(false);
    Wire.requestFrom(MPU_addr, 14, true); // request a total of 14 registers

    mpu_arr[0] = Wire.read() << 8 | Wire.read(); // AcX
    mpu_arr[1] = Wire.read() << 8 | Wire.read(); // AcY
    mpu_arr[2] = Wire.read() << 8 | Wire.read(); // AcZ
    mpu_arr[3] = Wire.read() << 8 | Wire.read(); // Tmp
    mpu_arr[4] = Wire.read() << 8 | Wire.read(); // GyX
    mpu_arr[5] = Wire.read() << 8 | Wire.read(); // GyY
    mpu_arr[6] = Wire.read() << 8 | Wire.read(); // GyZ
    
    String path = "/ctroller/";
    
    String controller = "[";
    for(int i = 0; i < 7; i++){
      controller += mpu_arr[i];
      controller += ",";
    }
    
    for(int i=0; i<5; i++){
      for(int j=0; j<4; j++){
        digitalWrite(controlPin1[j],channel[i][j]);
      }
      int val = analogRead(A0);
      PRESS[i] = val;
      Serial.print("Press");
      Serial.print(i);
      Serial.print("is ");
      Serial.print(PRESS[i]);
      Serial.print(", ");
    }

    for(int i = 0; i < 5; i++){
      controller += PRESS[i];
      controller += ",";
    }
    controller = controller.substring(0,controller.length()-1);
    controller += "]";
    
    Firebase.RTDB.setInt(&fbdo, (path).c_str(), controller);
    
    Serial.println();
}
