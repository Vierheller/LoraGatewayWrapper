// <reference path="./TelemetryAdapter.ts"/>
import {createConnection, Socket} from "net";
import {PhotoHelper} from "../photo/PhotoHelper";
import {Logging} from "../util/Logging";
import {Telemetry} from "./TelemetryAdapter";

export class GatewayClient {
    public static bufferToTelemetry(buffer: Buffer): Telemetry {
        const data = buffer.toString("utf8");
        // GatewayClient.Log.log("Received incomingData: " + data);
        if (data.indexOf("\n") > -1) {
            // GatewayClient.Log.log("New client incomingData has multiple lines");

            const split = data.split("\n");
            // for (let i = 0; i < split.length; i++) {
                // GatewayClient.Log.log("New client incomingData fraction [" + i + "]: START " + split[i] + " END");
            // }
            return Telemetry.parse(split[0]);
        } else {
            // GatewayClient.Log.log("New client incomingData: START " + data + " END");
            return Telemetry.parse(data);
        }
    }

    private static Log: Logging = Logging.getInstance(GatewayClient.toString());

    private clientSocket: Socket;
    private port: number;

    private host: string;

    private connected: boolean = false;

    private dataListener: (data: Telemetry) => void;

    constructor(host: string, port: number) {
        this.host = host;
        this.port = port;
    }

    /**
     * Method to connect to a linux socket and bind listeners to it
     * @param {(err: Error) => void} connectCallback
     */
    public connect(connectCallback: (err: Error) => void) {
        this.clientSocket = createConnection(this.port, this.host, () => {
            this.connected = true;
            GatewayClient.Log.log("Connected to Gateway");

            this.clientSocket.addListener("data", (data: Buffer) => {
                const telemetry = GatewayClient.bufferToTelemetry(data);
                GatewayClient.Log.log("Got direct:" + telemetry.getOutgoingJSON().package_counter);
                if (this.dataListener) {
                    this.dataListener(telemetry);
                }
            });

            this.clientSocket.addListener("close", (hadError: boolean) => {
                // Analyse
                GatewayClient.Log.log("Connection was closed with " + hadError ? "an" : "no" + "errors");
            });

            this.clientSocket.addListener("end", () => {
                // cleanup
                GatewayClient.Log.log("Connection ended!");
            });

            connectCallback(null);
        });

        // Outside connect, since connect could throw an error
        this.clientSocket.addListener("error", (err: Error) => {
            connectCallback(err);
        });
    }

    // Set internal incomingData listener for event chain
    public setDataListener(listener: (data: Telemetry) => void) {
        this.dataListener = listener;
    }

}
