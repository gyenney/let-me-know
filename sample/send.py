import asyncio
import websockets
import json

uri = "wss://mstm9456rl.execute-api.us-west-1.amazonaws.com/production"

async def sender():
    print("connecting to server...", end='')
    async with websockets.connect(uri) as websocket:
        print("done.\n")
        while True:
            message = input("send> ")
            my_json = {"action": "sendmessage", "content": message}
            await websocket.send(json.dumps(my_json))

asyncio.run(sender())



