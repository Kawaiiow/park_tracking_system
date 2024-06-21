//Controller Library
#include <ESP8266WiFi.h>

// !--- Add on ---!
//Firebase management
#include "fb_management.h"

//Scan method
#include "f_scaning.h"

unsigned long sendDataPrevMillis = 0;
int num = 0;

int test[] = {1,2,3};

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);

  pinMode(BUILTIN_LED, OUTPUT);
  digitalWrite(BUILTIN_LED, LOW);

  // attempt to connect to WiFi network and start Firebase:
  WifiStart();
  FBStart();

  //<!-----------------TEST BED FOR TESTING FUNCTION------------------------>

  
  
  //<!-----------------END----  -------------------->
}

void loop() {
  // put your main code here, to run repeatedly:
  CheckWifiStatus();

  

  if (Firebase.ready() && (millis() - sendDataPrevMillis > 2000 || sendDataPrevMillis == 0)){
    sendDataPrevMillis = millis();

    scan();

    for (int i = 0; i < 2; i++) {
      Serial.println(slot_status[i]);
    }
    // bool bVal;
    // Serial.printf("Get bool ref... %s\n", Firebase.RTDB.getBool(&fbdo, F("/Test/LED"), &bVal) ? bVal ? "true" : "false" : fbdo.errorReason().c_str());
    // int iVal = 0;
    // Serial.printf("Get int ref... %s\n", Firebase.RTDB.getInt(&fbdo, F("/Test/Num"), &iVal) ? String(iVal).c_str() : fbdo.errorReason().c_str());
    // Serial.println(num);

    if(Firebase.RTDB.setBool(&fbdo, F("/BK000/A1"), slot_status[0])){ //(slot_status[0] == 0) ? "false" : "true")
      Serial.print("A1 Success Save");
      Serial.println(" (" + fbdo.dataType() + ")");
    }else{
      Serial.println("A1 FAILED : " + fbdo.errorReason());
    }

    if(Firebase.RTDB.setBool(&fbdo, F("/BK000/A2"), slot_status[1])){ //(slot_status[1] == 0) ? "false" : "true")
      Serial.print("A2 Success Save");
      Serial.println(" (" + fbdo.dataType() + ")");
    }else{
      Serial.println("A2 FAILED : " + fbdo.errorReason());
    }

    //<!-----------------TEST BED FOR TESTING FUNCTION------------------------>

    // bool LED = Firebase.RTDB.getBool(&fbdo, F("/Test/LED"));
    // if (bVal == true) {
    //   digitalWrite(BUILTIN_LED, LOW);
    //   // Serial.printf("true");
    // }else if(bVal == false){
    //   digitalWrite(BUILTIN_LED, HIGH);
    //   // Serial.printf("false");
    // }

    // <!-----------------END------------------------>
  }
}

