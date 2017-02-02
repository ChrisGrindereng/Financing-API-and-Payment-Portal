# Financing-API-and-Payment-Portal
 
###Technologies, Frameworks and Programming Languages:
ASP.NET 4.6, C#, Bootstrap, HTML, CSS, JavaScript, jQuery, SQLite, Web API, SOAP XML, WCF connected services

###Overview of Project:
Solar Payment Portal was created for a startup company here in Houston to add additional functionality to their website. The company’s vision is to create a solar energy market place where customers may select a custom solar system, find an installer, and get approved for financing with their lending partner.  With this vision in mind, Solar Payment Portal was built handle the financing portion, allowing users to select financing options and receive an approval status and PDF documentation directly from the lender. 
Dashboard screenshot

###Challenges faced & Solutions used:
1.The major challenge I was faced with in creating this web application was working the lending partner’s API. The API used the SOAP protocol with an XML data structure. I was provided with 2 WSDL files and excel spreadsheets outlining the fields I would need to successfully request a response from the lenders API. 

//WSDL file

2.Having no prior experience with SOAP XML my first task was to learn about the structure of soap envelopes and how to interpret the WSDL file. After some research, I discovered how the WSDL file explains binding the message, port, and services within a XML structure defining the end points for each message and the communication method to be used. 

//XML

3.From here I needed to decide how I would handle the XML data and send it up to the API, as well receive my response. My research first showed some examples of pushing the XML as a single string, manually creating the envelopes and interpolating the data to concatenate together a very large string. However, as I dug deeper I discovered that with ASP.NET WCF connected services could be used to generate a code base for both a data structure and functions for serializing my XML request. This was ultimately the solution which I settled on, though its implementation was not as smooth as I had hoped. This solution still required manually binding all my models to service reference models.  It also required a little adaptation of the async methods from service reference to use in my controllers for the post request and response. 

###Error handling/Troubleshooting:
- When working with backend APIs trouble shooting can always be a difficult task. As such there are some useful tools and techniques I was able to use to shine a light on some of the sensitive trouble areas. 
- PostMan- PostMan is a great application for working with APIs. It allows you to simply test the structure of the information your sending up and how you implement any security keys needed to hit the API. From there you can see what your response looks like so you know what to expect and can plan how you will deal with that data structure. For me this was invaluable. It allowed me to test the example XML structure I was given and play around with certain data fields, as changing these could give me different types of response data. 
- WCF connected Services- Working with WCF was very helpful as I could upload the WSDL file directly into Visual Studio and have it generate a code base of models, interfaces and methods. It also handled the model binding, though I did have to take some extra steps based on the model structure I was confined to working within. 
- One of the most time-consuming steps of the project was actually figuring out how to use the WCF connected Services and the code the it generated. To this end, I created a WSDL test application to play with the code I had generated and with the response I got back after pining the API. To Set this up I used a basic windows form application so I had limited front end to set up and could display the data easily. Ultimately experimenting in this way allowed me to discover how to invoke the generated code properly. 

###MVP(Minimum Viable Product) and Stretch Goals:
###MVP
- Build a web application that allows a user to receive financing pre- approval after imputing information and choosing from the available financing options. 
- Be able to aggregate data about the user from the database and the user selected fields to build the API request.
- Display the request response to the user. 
- Incorporate a functional dashboard design that is easy to navigate and fits with the solar company’s aesthetic.

###Stretch

- Add additional functionality for handling final approvals using a 3 step process of connecting to 2 separate APIs from the lender. 


###Contribution we'd like to be added:

- The last step of the financing process is currently sending back PDF documentation the user will have to fill out sign and provide to the lender. I would like to be able to parse out the PDF and allow any impute fields that can to be auto-filled from the database. 

- The rest of the info could be presented to the user to provide additional inputs and parsed back into a PDF when done. 

- Implementing some sort of Docu-sign type procedure would then allow that PDF to be signed electronically and sent back up to the Lender. (This would of course require approval by the Lender)
