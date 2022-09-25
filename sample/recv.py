import asyncio
import websockets
import json

message = '{"action": "sendmessage", "content": "hey there."}'

uri = "wss://mstm9456rl.execute-api.us-west-1.amazonaws.com/production"



async def hello():
    print("connecting to server...", end='')
    async with websockets.connect(uri) as websocket:
        print("done.\n")
        print('receive> ', end='')
        async for message in websocket:
            print(message + '\nreceive> ', end='')

asyncio.run(hello())



