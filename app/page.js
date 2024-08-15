'use client'
import {Box, Stack, TextField, Button} from '@mui/material'
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    {
    role: 'assistant',
    content: `Hi, I am your personal assistant. How can I help you today?`,
    },
  ])

  const [message, setMessage] = useState('')

//This is a React functional component named Home. It's a stateful component, meaning it uses the useState hook to manage its state.

//Here's what's happening:

//1.const [messages, setMessages] = useState([...]): This line creates a state variable messages and a 
//function setMessages to update it. The initial value of messages is an array with a single object, 
//which represents a message from the assistant.

//2.const [message, setMessage] = useState(''): This line creates another state variable message and a 
//function setMessage to update it. The initial value of message is an empty string.

//The state variables are used to store the conversation history (messages) and 
//the current message being typed by the user (message).

//The messages state variable is initialized with a single message from the assistant, 
// which is displayed to the user when the component is rendered.

//The message state variable is initialized as an empty string, which will be updated as 
//the user types their response to the assistant.

//This component is likely part of a chatbot or conversational interface, where the user can interact with 
//the assistant by typing messages. The messages state variable will store the entire conversation history, 
//and the message state variable will store the current message being typed by the user.

const sendMessage = async () => {
  setMessage('')
  setMessages((messages) => [
    ...messages, 
    {role: 'user', content: message},
    {role: 'assistant', content: ''},
  ])
  const response = fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([...message, {role: 'user', content: message}]),
  }).then( async (res) => {
    const reader = res.body.getReader()
    const decoder = new TextDecoder()

//This code snippet defines an async function named sendMessage that handles sending a 
//message to the chatbot API and updating the conversation history.

//Here's what's happening:

//1.setMessage(''): This line clears the current message by setting the message state variable to an empty string.

//2.setMessages((messages) => [...messages, {role: 'user', content: message}, {role: 'assistant', content: ''}]): 
//This line updates the messages state variable by appending a new message object to the existing array. 
//The new message object represents the user's message, with the role set to 'user' and
// the content set to the message state variable. It also adds an empty message object for the assistant's response.

//3.const response = fetch('/api/chat', { ... }): This line sends a POST request to the /api/chat endpoint of the chatbot API. 
//The request includes the user's message in the request body, serialized as JSON.

//4.The then method is used to handle the response from the API. 
//It retrieves the response body using the res.body.getReader() method and creates a 
//TextDecoder instance to decode the response data.

//5.The code snippet is incomplete, so it's unclear what happens next. 
//It appears that the response data is being read and processed using the reader and decoder objects.
//Overall, this code snippet is handling the logic for sending a message to the chatbot API 
//and updating the conversation history on the client side. 
//It's likely part of a chatbot application that allows the user to interact with the assistant by sending messages.

//Overall, this code snippet is handling the logic for sending a message to the chatbot API and 
//updating the conversation history on the client side. 
//It's likely part of a chatbot application that allows the user to interact with the assistant by sending messages.

    let result = ''
    return reader.read().then(function proccessText({done, value}){
      if (done) {
        return result
      }
      const text = decoder.decode(value || new Int8Array(), {stream: true})
      setMessages((messages) => {
        let lastMessage = messages[messages.length - 1]
        let otherMessages = messages.slice(0, messages.length - 1)
        return [
          ...otherMessages,
          {
            ...lastMessage,
            content: lastMessage.content + text,
          },
        ]
      })
      return reader.read().then(proccessText)
    })
  })
}

//This code snippet is a continuation of the previous one, and it's handling the response from the chatbot API.

//Here's what's happening:

//1.let result = '': This line initializes an empty string variable result.

//2.return reader.read().then(function proccessText({done, value}) { ... }): 
//This line reads the response body from the API using the reader.read() method, and 
//then processes the response data using the proccessText function.

//3.if (done) { return result }: This line checks if the response body has been fully read. 
//If it has, the function returns the result variable.

//4.const text = decoder.decode(value || new Int8Array(), {stream: true}): 
//This line decodes the response data using the TextDecoder instance. 
//The stream option is set to true to indicate that the data is being streamed.

//5.setMessages((messages) => { ... }): This line updates the messages state variable by modifying the last message in the array. 
//The content property of the last message is updated by appending the decoded text.

//6.return reader.read().then(proccessText): This line recursively calls the proccessText function to process 
//the next chunk of response data.

//The proccessText function is a recursive function that continues to read and process 
//the response data from the API until the entire response body has been read. 
//The function updates the messages state variable by appending the decoded text to the last message in the array.

//Overall, this code snippet is handling the logic for processing the response from the chatbot API 
//and updating the conversation history on the client side. 
//It's likely part of a chatbot application that allows the user to interact with the assistant by sending messages.


  return (
  <Box
  width='100vw'
  height='100vh'
  display='flex'
  flexDirection='column'
  justifyContent='center'
  alignItems='center'
  >
    <Stack
    direction='column'
    width='600px'
    height='700px'
    border='1px solid blue'
    p={2}
    spacing={3}
    >
      <Stack 
      direction='column'
      spacing={2}
      flexGrow={1}
      overflow='auto'
      maxHeight='100%'
      >
        {
          messages.map((message, index) => (
            <Box
            key={index}
            display='flex'
            justifyContent={
              message.role === 'assistant' ? 'flex-start' : 'flex-end'
            }
            >
              <Box 
              bgcolor = {
                message.role === 'assistant' 
                ? 'primary.main' 
                : 'secondary.main'
              }
              color='white'
              borderRadius={16}
              p={3}
              >
                {message.content}
              </Box>
            </Box>
        ))}
      </Stack>
      <Stack
      direction='row' spacing={2}>
        <TextField
        label='Type a message'
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant= 'contained'onClick={sendMessage}>Send</Button>
    </Stack>
    </Stack>
  </Box>
  )
}

//This is a JSX code snippet that defines a chat interface using the Material-UI library. 
//Here's a breakdown of the code:

//Outer Box

//The outermost element is a Box component that takes up the full width and height of the viewport 
//(width='100vw' and height='100vh').
//The display property is set to 'flex', and the flexDirection is set to 'column' to stack the child elements vertically.
//The justifyContent and alignItems properties are set to 'center' to center the child elements both horizontally and vertically.

//Inner Stack

//The inner Stack component has a width of 600px and a height of 700px, and is centered within the outer box.
//The border property is set to '1px solid blue' to add a blue border around the stack.
//The p property is set to {2} to add some padding around the stack.
//The spacing property is set to {3} to add some space between the child elements.

//Message List

//The first child element of the inner stack is another Stack component that displays the list of messages.
//The direction property is set to 'column' to stack the messages vertically.
//The spacing property is set to {2} to add some space between the messages.
//The flexGrow property is set to {1} to make the message list take up the full height of the inner stack.
//The overflow property is set to 'auto' to add a scrollbar if the message list exceeds the height of the inner stack.
////The maxHeight property is set to '100%' to limit the height of the message list to the height of the inner stack.

//Message Items

//The message list is populated by mapping over the messages array and rendering a Box component for each message.
//The key property is set to the index of the message to help React keep track of the message items.
//The display property is set to 'flex', and the justifyContent property is set to either 'flex-start' or 'flex-end' depending on the role of the message (assistant or user).
//The message content is rendered inside a Box component with a blue or gray background color depending on the role of the message.

//Input Field and Send Button

//The second child element of the inner stack is another Stack component that contains the input field and send button.
//The direction property is set to 'row' to arrange the input field and send button horizontally.
//The spacing property is set to {2} to add some space between the input field and send button.
//The input field is a TextField component with a label and a value that is bound to the message state variable.
//The send button is a Button component with a variant of 'contained' and an onClick event handler that calls the sendMessage function.





