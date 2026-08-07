function convertTemperature() {
  let temp = document.getElementById("temperature").value;

  let unit = document.getElementById("unit").value;

  let error = document.getElementById("error");

  let celsius = document.getElementById("celsiusResult");

  let fahrenheit = document.getElementById("fahrenheitResult");

  let kelvin = document.getElementById("kelvinResult");

  error.innerHTML = "";

  celsius.innerHTML = "";
  fahrenheit.innerHTML = "";
  kelvin.innerHTML = "";

  if (temp === "") {
    error.innerHTML = "Please enter a temperature.";

    return;
  }

  if (isNaN(temp)) {
    error.innerHTML = "Please enter a valid numeric value.";

    return;
  }

  temp = parseFloat(temp);

  let C, F, K;

  if (unit === "celsius") {
    if (temp < -273.15) {
      error.innerHTML =
        "Temperature cannot be below absolute zero (-273.15°C).";

      return;
    }

    C = temp;
    F = (C * 9) / 5 + 32;
    K = C + 273.15;
  } else if (unit === "fahrenheit") {
    if (temp < -459.67) {
      error.innerHTML =
        "Temperature cannot be below absolute zero (-459.67°F).";

      return;
    }

    F = temp;
    C = ((F - 32) * 5) / 9;
    K = C + 273.15;
  } else {
    if (temp < 0) {
      error.innerHTML = "Temperature cannot be below absolute zero (0 K).";

      return;
    }

    K = temp;
    C = K - 273.15;
    F = (C * 9) / 5 + 32;
  }

  celsius.innerHTML = "Celsius : " + C.toFixed(2) + " °C";

  fahrenheit.innerHTML = "Fahrenheit : " + F.toFixed(2) + " °F";

  kelvin.innerHTML = "Kelvin : " + K.toFixed(2) + " K";
}
