import {GatewayClient} from "./GatewayClient";

export class GatewayWrapper{
    gatewaySocket : GatewayClient;

    public static main(){
        const myWrapper = new GatewayWrapper();
        myWrapper.init()
    }

    private init(){
        this.gatewaySocket = new GatewayClient("localhost", 6004)
    }
}