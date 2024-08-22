'use client'
import React, {useState} from 'react'

export default function Chat() {
    const [messages, setMessages] = useState([
        { 
            role: "assistant", 
            content: "Hi! I'm the Rate My Professor support assistant. How can I help you today?"
        }
    ])

    const [message, setMessage] = useState("")
    const sendMessage = async () => {
        setMessages((messages) => [
            ...messages, 
            { role: "user", content: message } ,
            { role: "assistant", content: "" } 
        ])

        const response = fetch("api/chat", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json'
                
            }, 
            body: JSON.stringify([...messages, { role: "user", content: message }])
        }).then(async(res) => {
            const reader = res.body.getReader() 
            const decoder = new TextDecoder() 

            let result = ""
            return reader.read().then(function processText({ done, value}) {
                if(done){
                    return result
                }
                const text = decoder.decode(value || new Uint8Array, { stream: true }) 
                setMessages((messages) => {
                    let lastMessage = messages[messages.length - 1] 
                    let otherMessages = messages.slice(0, messages.length - 1) 
                    return [ 
                        ...otherMessages, 
                        { ...lastMessage, content: lastMessage.content + text }
                    ]
                })
                return reader.read().then(processText)
            })
        })
        setMessage("")   
}


  return (
    <div
        style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
        }}
    >
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                overflow: "auto",
                padding: "10px",
            }}
        >
            {messages.map((message, index) => (
                <div
                    key={index}
                    style={{
                        display: "flex",
                        flexDirection: message.role === "assistant" ? "row-reverse" : "row",
                        marginBottom: "10px",
                    }}
                >
                    <div
                        style={{
                            backgroundColor: message.role === "assistant" ? "#2d2d2d" : "#007bff",
                            color: "white",
                            padding: "10px",
                            borderRadius: "10px",
                        }}
                    >
                        {message.content}
                    </div>
                </div>
            ))}
        </div>
        <div
            style={{
                display: "flex",
                padding: "10px",
            }}
        >
            <input
                style={{
                    flex: 1,
                    padding: "10px",
                    fontSize: "16px",
                }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button
                style={{
                    padding: "10px",
                    fontSize: "16px",
                    marginLeft: "10px",
                }}
                onClick={sendMessage}
            >
                Send
            </button>
        </div>
    </div>
  )
}
