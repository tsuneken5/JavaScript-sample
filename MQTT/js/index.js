let client = {};

const MQTT_BROKER = 'wss://localhost:8084';
// const MQTT_BROKER = 'ws://localhost:8083';
const TOPIC = 'mytopic';

function setupMqtt() {
  client = mqtt.connect(MQTT_BROKER);

  client.on('connect', () => {
    client.subscribe(TOPIC, (error) => {
      if (!error) {
        console.log(TOPIC, 'is connected');
        client.publish(TOPIC, 'This is a test.')
      } else {
        console.log(error);
      }
    })
  });

  client.on('message', (topic, message) => {
    if (topic == TOPIC) {
      console.log('subscribe:', topic, message.toString());
    }
  });
}

$(document).ready(() => {
  setupMqtt();
  console.log('finish setup mqtt')
});