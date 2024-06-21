//Sensor Reading
#include "f_ultrasonic.h"

int slot_status[2];

// For setting TR and EC pin
int output_pin[] = {12,13,15}; //TR
int input_pin[] = {4,5,14}; //EC

void scan(){
  for (int i = 0; i < 2; i++) {
    float dis = ul_reader(output_pin[i], input_pin[i]);
    
    if (dis <= 7 && distance != 0) {
      slot_status[i] = 0;
    }else{
      slot_status[i] = 1;
    }
  }
  Serial.println();
}
