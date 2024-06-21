long ul_reader(int tr, int ec) {
  int filterArray[20];  // array to store data samples from sensor
  float distance, duration;
  pinMode(tr, OUTPUT);
  pinMode(ec, INPUT);

  digitalWrite(tr, LOW);
  delayMicroseconds(5);

  digitalWrite(tr, HIGH);
  delayMicroseconds(5);
  
  digitalWrite(tr, LOW);

  duration = pulseIn(ec, HIGH);
  distance = (duration / 2) / 29.1;

  // 1. TAKING MULTIPLE MEASUREMENTS AND STORE IN AN ARRAY
  for (int sample = 0; sample < 20; sample++) {
    filterArray[sample] = distance;
    delayMicroseconds(5);
  }

  // 2. SORTING THE ARRAY IN ASCENDING ORDER
  for (int i = 0; i < 19; i++) {
    for (int j = i + 1; j < 20; j++) {
      if (filterArray[i] > filterArray[j]) {
        int swap = filterArray[i];
        filterArray[i] = filterArray[j];
        filterArray[j] = swap;
      }
    }
  }

  // 3. FILTERING NOISE
  // + the five smallest samples are considered as noise -> ignore it
  // + the five biggest  samples are considered as noise -> ignore it
  // ----------------------------------------------------------------
  // => get average of the 10 middle samples (from 5th to 14th)
  long sum = 0;
  for (int sample = 5; sample < 15; sample++) {
    sum += filterArray[sample];
  }

  int avg_value = sum / 10;

  return avg_value;
}
