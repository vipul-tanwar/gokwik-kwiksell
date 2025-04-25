import { NextRequest, NextResponse } from 'next/server';

// Get the API key from environment variables
// Make sure to add KWIKENGAGE_API_KEY to your .env.local file
const API_KEY = process.env.KWIKENGAGE_API_KEY;

// Check if API key is available
if (!API_KEY) {
  console.warn('KWIKENGAGE_API_KEY is not defined in environment variables');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the incoming request
    if (!body.to || !body.templateId) {
      return NextResponse.json(
        { error: 'Missing required fields: to, templateId' },
        { status: 400 }
      );
    }

    // Construct the request to the external API
    const externalApiRequest = {
      to: body.to,
      channel: "whatsapp",
      content: {
        type: "template",
        template: {
          template_id: body.templateId,
          language: body.language || "en",
          components: [
            {
              type: "body",
              parameters: body.parameters || []
            }
          ]
        }
      }
    };

    // Make the request to the external API
    const response = await fetch('https://api.kwikengage.ai/send-message/v2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': API_KEY
      },
      body: JSON.stringify(externalApiRequest)
    });

    // Get the response data
    const data = await response.json();

    // Return the response to the client
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error in send-whatsapp-message API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}