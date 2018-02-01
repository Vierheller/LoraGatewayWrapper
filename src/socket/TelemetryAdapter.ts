/*
    {
        "class":"POSN",
        "index":0,
        "channel":1,
        "payload":"DHBW",
        "time":"00:00:00",
        "lat":0.00000,
        "lon":0.00000,
        "alt":0,
        "rate":0.0,
        "sentence":"$$DHBW,144,00:00:00,0.00000,0.00000,00000,0,0,0,21.5,0.0,11.199,21.6,1013,0.0,20.4*035F"}
*/
import {TelemetryInternal, TelemetryRaw, TelemetrySentence} from "../model/Telemetry";

export class Telemetry {
    public static parse(dataString: string): Telemetry {
        const json: TelemetryRaw = JSON.parse(dataString);
        return new Telemetry(json);
    }
    /**
     *
     * $$DHBW(payload),91(package_counter),15:42:16(time),49.51846(lat),8.50398(lon),00132(alt),1(speed),0(direction),
     * 9(satellites),29.5(temp_chip),0.0(battery_voltage),11.199(current_voltage),24.2(temp_case),
     * 1012(pressure),0.0(humidity),23.6(extern_temp)*1CA6
     * @param {string} sentence
     */
    private static convertSentence(sentence: string): TelemetrySentence {
        sentence = sentence.substr(2); // Cut $$
        const sentenceSplit = sentence.split("*"); // Separate message from checksum
        const message = sentenceSplit[0];
        const checksum = sentenceSplit[1];

        const messageSplit = message.split(",");
        const json = {} as TelemetrySentence;

        json.payload = messageSplit[0];
        json.package_counter = Number(messageSplit[1]);
        json.time = messageSplit[2];
        json.lat = Number(messageSplit[3]);
        json.lon = Number(messageSplit[4]);
        json.alt = Number(messageSplit[5]);
        json.speed = Number(messageSplit[6]);
        json.direction = Number(messageSplit[7]);
        json.satellites = Number(messageSplit[8]);
        json.temp_chip = Number(messageSplit[9]);
        json.battery_voltage = Number(messageSplit[10]);
        json.current_voltage = Number(messageSplit[11]);
        json.temp_case = Number(messageSplit[12]);
        json.pressure = Number(messageSplit[13]);
        json.humidity = Number(messageSplit[14]);
        json.temp_extern = Number(messageSplit[15]);
        json.checksum = checksum;

        return json;
    }

    // Incoming incomingData
    private incomingData: TelemetryRaw;

    private outgoingData: TelemetryInternal;

    // additional incomingData
    private timestamp: Date;

    public constructor(data: TelemetryRaw) {
        this.timestamp = new Date();
        this.incomingData = data;
        this.outgoingData = this.convertIncomingToOutgoing();
    }

    public getOutgoingJSON(): TelemetryInternal {
        return this.outgoingData;
    }

    public getIncomingJSON(): TelemetryRaw {
        return this.incomingData;
    }

    private convertIncomingToOutgoing(): TelemetryInternal {
        const sentenceData = Telemetry.convertSentence(this.incomingData.sentence);
        const json = {} as TelemetryInternal;

        json.class = this.incomingData.class;
        json.index = this.incomingData.index;
        json.channel = this.incomingData.channel;

        json.payload = sentenceData.payload;
        json.package_counter = sentenceData.package_counter;
        json.time = sentenceData.time;
        json.lat = sentenceData.lat;
        json.lon = sentenceData.lon;
        json.alt = sentenceData.alt;
        json.speed = sentenceData.speed;
        json.direction = sentenceData.direction;
        json.satellites = sentenceData.satellites;
        json.temp_chip = sentenceData.temp_chip;
        json.battery_voltage = sentenceData.battery_voltage;
        json.current_voltage = sentenceData.current_voltage;
        json.temp_case = sentenceData.temp_case;
        json.pressure = sentenceData.pressure;
        json.humidity = sentenceData.humidity;
        json.temp_extern = sentenceData.temp_extern;

        json.timestamp = this.timestamp.getTime();
        json.type = "telemetry";

        return json;
    }
}
