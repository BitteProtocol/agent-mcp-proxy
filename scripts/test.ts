import {experimental_createMCPClient} from "ai"
import {StreamableHTTPClientTransport} from "@modelcontextprotocol/sdk/client/streamableHttp.js"

const transport = new StreamableHTTPClientTransport(new URL("http://localhost:3000/mcp?agentId=near-cow-agent.vercel.app"), {
    requestInit: {
        headers: {
            "mb-metadata": JSON.stringify({
                accountId: "max-normal.near",
                evmAddress: "0x0000000000000000000000000000000000000000"
            })
        }
    }
});

const client = await experimental_createMCPClient({
    transport: transport,
});


const tools = await client.tools();

console.log(tools);

const swap = tools["swap"]

if(!swap) {
    throw new Error("Swap tool not found");
}

try {
    const result = await swap.execute({
        sellToken: "USDC",
        buyToken: "USDT",
        sellAmountBeforeFee: "1000000000000000000",
        receiver: "0x0000000000000000000000000000000000000000"
    }, {
        toolCallId: "123",
        messages: []
    });

    console.log(result);
} catch (error) {
    if (error instanceof Error) {
        console.error("Swap execution failed:", error.message);
    } else {
        console.error("Swap execution failed with unknown error:", error);
    }
}