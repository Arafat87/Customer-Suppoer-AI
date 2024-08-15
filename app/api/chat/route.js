import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `generate a system prompt for a customer support bot for Custom Feedback Collection and Analysis Bot to collect user feedback in a more engaging and interactive way. Instead of traditional survey forms, the bot conducts a conversational feedback session, making it easier for customers to provide their insights. The bot then analyzes the feedback in real-time to generate actionable insights for your business.

1. I’m your Custom Feedback Collection and Analysis Bot, designed to engage customers in a conversational way.
2. Instead of traditional surveys, I conduct an interactive chat to gather valuable feedback.
3. I’ll ask questions to guide the conversation and understand your experience.
4. The conversation is designed to be smooth and effortless for the customer.
5. I analyze feedback in real-time, processing insights as the conversation unfolds.
6. My goal is to capture honest and detailed feedback without making it feel like a survey.
7. The insights I generate will help the business make informed decisions.
8. Let’s work together to gather meaningful feedback that can drive improvements.`

//This code snippet is importing two modules: NextResponse from the next/server package and OpenAI from the openai package.

//The systemPrompt variable is assigned a string that describes the functionality of a customer support bot. 
//It provides a system prompt for the bot, outlining its purpose and features. 
//The prompt explains that the bot is designed to engage customers in a conversational way, 
//collect feedback without making it feel like a survey, and provide real-time insights for businesses. 
//It also includes a numbered list of key points that highlight the bot's functionality.

//Overall, this code snippet is setting up the foundation for a customer support bot that uses conversational prompts to gather feedback and provide insights in real-time.


export async function POST(req) {
    const openai = new OpenAI()
    const data = await req.json()

//This code snippet is defining an asynchronous function named POST that takes a req parameter. 
//Inside the function, it creates a new instance of the OpenAI class and assigns it to the openai variable. 
//Then, it awaits the json() method of the req object to retrieve the request data and assigns it to the data variable.

//The purpose and functionality of the POST function would depend on the context in which it is used.
//It appears to be part of an API endpoint that handles HTTP POST requests. 
//The openai instance and the data variable could be used to interact with the OpenAI API or perform other operations related to the request data.

const completion = await openai.chat.completions.create({
    messages: [
    {
        role: 'system',
        content: systemPrompt,
    },
       ...data.filter((item) => typeof item === 'object'), // Add this line to filter out non-object elements
    ],
    model: 'gpt-4o-mini',
    stream: true,
})

//This code snippet is using the openai instance to create a chat completion using the chat.completions.create() method. 
//The method takes an options object with the following properties:messages: an array of message objects that represent the conversation history. The array contains two types of messages:
//A system message with the role set to 'system' and the content set to the systemPrompt variable, which was defined earlier.
//An array of messages that are filtered from the data variable using the filter() method. The filter ensures that only objects are included in the array, ignoring any non-object elements.
//model: the AI model to use for the completion, which is set to 'gpt-4o-mini'.
//stream: a boolean flag that enables streaming of the completion results, which is set to true.
//The create() method returns a promise that resolves to a completion object, which is assigned to the completion variable. 
//The completion object likely contains the generated response from the AI model, which can be used to continue the conversation.

//By using the stream option, the completion results will be streamed back to the client as they are generated, allowing for a more interactive and real-time conversation experience.

    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder()
            try{
                for await (const chunk of completion){
                    const content = chunk.choices[0].delta.content
                    if(content){
                        const text = encoder.encode(content)
                        controller.enqueue(text)
                    }
                }
            } catch (err) {
            controller.error(err);
            } finally {
            controller.close();
            }
        },
    })
    return new NextResponse(stream)
}


//This code snippet is creating a new ReadableStream instance and returning it as a response using the NextResponse class.

//Here's what's happening:

//1.A new ReadableStream instance is created, passing an options object with a start method.
//2.The start method is an async function that takes a controller object as an argument. The controller object is used to control the stream.
//3.Inside the start method, a TextEncoder instance is created to encode text data.
//4.The code then enters a try-catch-finally block.
//5.In the try block, the code uses a for-await loop to iterate over the completion object, which is a stream of chunks.
//6.For each chunk, the code extracts the content property from the first choice in the chunk (chunk.choices[0].delta.content).
//7.If the content property is truthy, the code encodes it using the TextEncoder instance and enqueues the encoded text using the controller.enqueue method.
//8.If an error occurs during the iteration, the catch block is executed, and the error is passed to the controller.error method.
//9.Finally, the finally block is executed, and the controller.close method is called to close the stream.

//The ReadableStream instance is then returned as a response using the NextResponse class.
//By returning a ReadableStream instance, the code allows the client to receive the response as a stream of data, rather than waiting for the entire response to be generated. 
//This can be useful for real-time applications, such as live updates or streaming data.






