import * as netModule from 'net';


function connect(port:number){
    const clientSocket = netModule.createConnection(port);

    clientSocket.addListener("connect", ()=>{
        //Do something
    });

    clientSocket.addListener("data", ()=>{
        //Data
    });

    clientSocket.addListener("error", ()=>{
        //Throw error
    });

    clientSocket.addListener("close", ()=>{
        //Analyse
    });

    clientSocket.addListener("end", ()=>{
        //cleanup
    })
}

