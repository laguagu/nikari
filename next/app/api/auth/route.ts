import { NextRequest, NextResponse } from 'next/server'

export async function GET(res: NextRequest) {
    return new Response("Authentication required.", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
  }