#include <Wire.h>
/* Gyro */
const int MPU_addr = 0x68; // I2C address of the MPU-6050
int16_t AcX, AcY, AcZ, Tmp, GyX, GyY, GyZ;

int controlPin1[] = {D6,D7,D8,D9};

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
    Wire.write(0x6B); // PWR_MGMT_1 register
    Wire.write(0); // set to zero (wakes up the MPU-6050)
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

    /* Assign the api key (required) */
    config.api_key = API_KEY;

    /* Assign the user sign in credentials */
    auth.user.email = USER_EMAIL;
    auth.user.password = USER_PASSWORD;

    /* Assign the RTDB URL */
    config.database_url = DATABASE_URL;

    Firebase.reconnectWiFi(true);
    fbdo.setResponseSize(12288);

    String base_path = "/UsersData/";

    /* Assign the callback function for the long running token generation task */
    config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h

    /** Assign the maximum retry of token generation */
    config.max_token_generation_retry = 5;

    /* Initialize the library with the Firebase authen and config */
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
void loop()
{
    Wire.beginTransmission(MPU_addr);
    Wire.write(0x3B); // starting with register 0x3B (ACCEL_XOUT_H)
    Wire.endTransmission(false);
    Wire.requestFrom(MPU_addr, 14, true); // request a total of 14 registers

    AcX = Wire.read() << 8 | Wire.read(); // 0x3B (ACCEL_XOUT_H) & 0x3C (ACCEL_XOUT_L)
    AcY = Wire.read() << 8 | Wire.read(); // 0x3D (ACCEL_YOUT_H) & 0x3E (ACCEL_YOUT_L)
    AcZ = Wire.read() << 8 | Wire.read(); // 0x3F (ACCEL_ZOUT_H) & 0x40 (ACCEL_ZOUT_L)
    Tmp = Wire.read() << 8 | Wire.read(); // 0x41 (TEMP_OUT_H) & 0x42 (TEMP_OUT_L)
    GyX = Wire.read() << 8 | Wire.read(); // 0x43 (GYRO_XOUT_H) & 0x44 (GYRO_XOUT_L)
    GyY = Wire.read() << 8 | Wire.read(); // 0x45 (GYRO_YOUT_H) & 0x46 (GYRO_YOUT_L)
    GyZ = Wire.read() << 8 | Wire.read(); // 0x47 (GYRO_ZOUT_H) & 0x48 (GYRO_ZOUT_L)
    

    
    String path = "/mpu/";
    String press[] = {"/press1/","/press2/","/press3/","/press4/","/press5/"};  
    Firebase.RTDB.setInt(&fbdo, (path+"/Acz/").c_str(), AcZ);
//    Serial.printf("Set int... %s\n", Firebase.RTDB.setInt(&fbdo, (path+"/Acz/").c_str(), AcZ) ? "ok" : fbdo.errorReason().c_str());
   
    for(int i=0; i<5; i++){
      for(int j=0; j<4; j++){
        digitalWrite(controlPin1[j],channel[i][j]);
      }
      int val = analogRead(A0);
      PRESS[i] = val;
      Serial.print("Press");
      Serial.print(i);
      Serial.print(PRESS[i]);
    }

    for(int i=0; i<5; i++){
      if(PRESS[i] > 30 && visited == false){
        Firebase.RTDB.setInt(&fbdo, (path+press[i]).c_str(), PRESS[i]);
//        Serial.printf("Press int... %s\n", Firebase.RTDB.setInt(&fbdo, (path+press[i]).c_str(), PRESS[i]) ? "ok" : fbdo.errorReason().c_str());
          visited = true;
        }
      else if(PRESS[i]<=30 && visited == true){
          Firebase.RTDB.setInt(&fbdo, (path+press[i]).c_str(), middle); //middle : 0
          visited = false;
        }
        
    }
    Serial.println();
}
